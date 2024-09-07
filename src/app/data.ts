"use server";
import { Database } from "duckdb-async";
import sql, {Sql} from "sql-template-tag";
import { TransitData } from "./types";

async function executeQuery(query:Sql, db: Database) {
  const preparedQuery = await db.prepare(query.duckdb);
  const result = await preparedQuery.all(...query.values);
  return result;
}

export async function loadTransitData(date: Date) {
  const db = await Database.create(":memory:");
  const gtfsPath = "gtfs";
  const calendarPath = `${gtfsPath}/calendar.txt`;
  const calendarDatesPath = `${gtfsPath}/calendar_dates.txt`;
  const tripsPath = `${gtfsPath}/trips.txt`;
  const routesPath = `${gtfsPath}/routes.txt`;
  const stopTimesPath = `${gtfsPath}/stop_times.txt`;
  const data = await executeQuery(sql`
    WITH regular_services AS (
        SELECT service_id,
            COLUMNS(lower(strftime(${date}, '%A'))) AS weekday
        FROM read_csv(${calendarPath},
                    dateformat = '%Y%m%d', 
                    types={'start_date': 'DATE', 'end_date': 'DATE'})
        WHERE weekday = 1
        AND start_date <= ${date} AND end_date >= ${date}
    ),
    calendar_dates AS (
        SELECT service_id,
            exception_type
        FROM read_csv(${calendarDatesPath},
                    dateformat = '%Y%m%d',
                    types={'date': 'DATE'})
        WHERE date = ${date}
    ),
    service_ids AS (
      SELECT DISTINCT COALESCE(cd.service_id, rs.service_id) AS service_id
      FROM regular_services rs
      FULL OUTER JOIN calendar_dates cd ON rs.service_id = cd.service_id
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
    FROM active_trips_with_stop_times at
    JOIN 
      trips_per_route tpr ON at.route_id = tpr.route_id
    SELECT 
      first(trip_id) AS trip_id,
      at.route_id,
      first(tpr.trip_count) AS trip_count,
      first(route_short_name) AS route_short_name,
      sum(epoch(trip_duration))/60/60 as total_duration
    GROUP BY at.route_id,
    ORDER BY total_duration
    `, db);

    return data as TransitData[];
}
