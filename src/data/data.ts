"use server";
import { format } from "date-fns";
import { fromZonedTime, getTimezoneOffset, toZonedTime } from "date-fns-tz";
import { Database } from "duckdb-async";
import sql, { type Sql } from "sql-template-tag";

async function executeQuery(query: Sql, db: Database) {
  const preparedQuery = await db.prepare(query.duckdb);
  const result = await preparedQuery.all(...query.values);
  return result;
}

export type TransitData = {
  route_id: string;
  total_duration: number;
  trip_id: string;
  route_short_name: string;
  trip_count: number;
};

export async function loadTransitData(date: Date, feedPath: string) {
  const db = await Database.create(":memory:");
  const calendarPath = `${feedPath}/calendar.txt`;
  const calendarDatesPath = `${feedPath}/calendar_dates.txt`;
  const tripsPath = `${feedPath}/trips.txt`;
  const routesPath = `${feedPath}/routes.txt`;
  const stopTimesPath = `${feedPath}/stop_times.txt`;
  const UTCDate = fromZonedTime(date, "UTC");
  const data = await executeQuery(
    sql`
    WITH regular_services AS (
        SELECT service_id,
            start_date,
            end_date,
            COLUMNS(lower(strftime(${UTCDate}, '%A'))) AS weekday
        FROM read_csv(${calendarPath},
                    dateformat = '%Y%m%d', 
                    types={'start_date': 'DATE', 'end_date': 'DATE'})
        WHERE weekday = 1
        AND start_date <= ${UTCDate} AND end_date >= ${UTCDate}
    ),
    calendar_dates AS (
        SELECT service_id,
            exception_type
        FROM read_csv(${calendarDatesPath},
                    dateformat = '%Y%m%d',
                    types={'date': 'DATE'})
        WHERE date = ${UTCDate}
    ),
    service_ids AS (
      FROM regular_services rs
      FULL OUTER JOIN calendar_dates cd ON rs.service_id = cd.service_id
      SELECT DISTINCT COALESCE(cd.service_id, rs.service_id) AS service_id
      WHERE (rs.service_id IS NOT NULL AND (cd.service_id IS NULL OR cd.exception_type != 2))
      OR (cd.service_id IS NOT NULL AND cd.exception_type = 1)
    ),
    active_trips AS (
      SELECT 
        t.route_id, 
        t.trip_id,
        t.service_id,
        r.route_short_name,
        r.route_long_name,
        r.route_type
      FROM 
          read_csv(${tripsPath}, header=True) t
      JOIN 
          read_csv(${routesPath}, header=True) r ON t.route_id = r.route_id
      JOIN 
          service_ids a ON t.service_id = a.service_id
    ),
    trips_per_route AS (
      FROM
        read_csv(${routesPath}, header=True) r
      JOIN
        active_trips tr ON r.route_id = tr.route_id
      SELECT 
        tr.route_id,
        COUNT(DISTINCT tr.trip_id) AS trip_count
      GROUP BY tr.route_id
    ),
    trip_stop_times AS (
      SELECT 
        trip_id,
        FIRST_VALUE(departure_time) OVER (
            PARTITION BY trip_id 
            ORDER BY stop_sequence
        ) AS first_stop_time,
        FIRST_VALUE(departure_time) OVER (
            PARTITION BY trip_id 
            ORDER BY stop_sequence DESC
        ) AS last_stop_time,
        FIRST_VALUE(stop_id) OVER (
            PARTITION BY trip_id 
            ORDER BY stop_sequence
        ) AS first_stop_id,
        FIRST_VALUE(stop_id) OVER (
            PARTITION BY trip_id 
            ORDER BY stop_sequence DESC
        ) AS last_stop_id
      FROM read_csv(${stopTimesPath}, types={'arrival_time': 'INTERVAL', 'departure_time': 'INTERVAL'})
    ),
    active_trips_with_stop_times AS (
      FROM 
          active_trips at
      JOIN 
          trip_stop_times tst ON at.trip_id = tst.trip_id
      SELECT 
          at.trip_id,
          at.route_id,
          tst.first_stop_time,
          tst.last_stop_time,
          at.route_short_name,
          FIRST((tst.last_stop_time - tst.first_stop_time)) AS trip_duration
      GROUP BY ALL
    )
    FROM active_trips_with_stop_times at, regular_services rs
    JOIN 
      trips_per_route tpr ON at.route_id = tpr.route_id
    SELECT 
      first(trip_id) AS trip_id,
      at.route_id,
      first(tpr.trip_count) AS trip_count,
      first(route_short_name) AS route_short_name,
      sum(epoch(trip_duration))/60/60 as total_duration,
      rs.service_id as service_id,
      rs.start_date as start_date,
      rs.end_date as end_date
    GROUP BY ALL
    ORDER BY total_duration
    `,
    db,
  );

  return data.map((val) => ({
    ...val,
    trip_count: Number(val.trip_count),
  })) as TransitData[];
}
