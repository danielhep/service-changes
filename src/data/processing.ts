import { type TransitData } from "~/app/types";

export type CombinedTransitData = {
  route_id: string;
  trip_id: string;
  route_short_name: string;
  trip_count_before?: number;
  trip_count_after?: number;
  total_duration_before?: number;
  total_duration_after?: number;
  percent_change_hours?: number;
  percent_change_trips?: number;
};

export type SummaryTransitData = {
  trip_count_before: number;
  trip_count_after: number;
  total_duration_before: number;
  total_duration_after: number;
  removed_routes: string[];
  added_routes: string[];
  percent_change_hours: number;
  percent_change_trips: number;
};

export type CombinedDataType = {
  perRoute: CombinedTransitData[];
  summary: SummaryTransitData;
};

function calculateSummary(data: CombinedTransitData[]): SummaryTransitData {
  const summary = data.reduce<
    Omit<SummaryTransitData, "percent_change_trips" | "percent_change_hours">
  >(
    (acc, item) => {
      acc.total_duration_before += item.total_duration_before ?? 0;
      acc.total_duration_after += item.total_duration_after ?? 0;
      acc.trip_count_before += item.trip_count_before ?? 0;
      acc.trip_count_after += item.trip_count_after ?? 0;
      if (!item.trip_count_before && item.trip_count_after) {
        acc.added_routes.push(item.route_short_name);
      } else if (item.trip_count_before && !item.trip_count_after) {
        acc.removed_routes.push(item.route_short_name);
      }
      return acc;
    },
    {
      added_routes: [],
      removed_routes: [],
      trip_count_after: 0,
      trip_count_before: 0,
      total_duration_after: 0,
      total_duration_before: 0,
    },
  );

  return {
    ...summary,
    percent_change_trips: Math.round(
      ((summary.trip_count_after - summary.trip_count_before) * 100) /
        summary.trip_count_before,
    ),
    percent_change_hours: Math.round(
      ((summary.total_duration_after - summary.total_duration_before) * 100) /
        summary.total_duration_before,
    ),
  };
}

function combineTransitFeeds(
  array1: TransitData[],
  array2: TransitData[],
): CombinedDataType {
  const combinedMap = new Map<string, CombinedTransitData>();

  function updateMap(item: TransitData, isBeforeArray: boolean) {
    const existing = combinedMap.get(item.route_short_name)!;
    if (existing) {
      const updatedItem: CombinedTransitData = {
        ...existing,
        route_id: item.route_id,
        trip_id: item.trip_id,
      };

      if (isBeforeArray) {
        updatedItem.total_duration_before = item.total_duration;
        updatedItem.trip_count_before = item.trip_count;
      } else {
        updatedItem.total_duration_after = item.total_duration;
        updatedItem.trip_count_after = item.trip_count;
        if (
          updatedItem.trip_count_before &&
          updatedItem.total_duration_before
        ) {
          updatedItem.percent_change_hours = Math.round(
            ((updatedItem.total_duration_after -
              updatedItem.total_duration_before) *
              100) /
              updatedItem.total_duration_before,
          );
          updatedItem.percent_change_trips = Math.round(
            ((updatedItem.trip_count_after - updatedItem.trip_count_before) *
              100) /
              updatedItem.trip_count_before,
          );
        }
      }

      combinedMap.set(item.route_short_name, updatedItem);
    } else {
      const newItem: CombinedTransitData = {
        route_id: item.route_id,
        total_duration_before: isBeforeArray ? item.total_duration : undefined,
        total_duration_after: isBeforeArray ? undefined : item.total_duration,
        trip_id: item.trip_id,
        route_short_name: item.route_short_name,
        trip_count_before: isBeforeArray ? item.trip_count : undefined,
        trip_count_after: isBeforeArray ? undefined : item.trip_count,
      };
      combinedMap.set(item.route_short_name, newItem);
    }
  }

  // Process both arrays
  array1.forEach((item) => updateMap(item, true));
  array2.forEach((item) => updateMap(item, false));

  const combinedArray = [...combinedMap.values()];
  return {
    perRoute: combinedArray,
    summary: calculateSummary(combinedArray),
  };
}

export function processData(
  beforeData: TransitData[],
  afterData: TransitData[],
) {
  const combinedData = combineTransitFeeds(beforeData, afterData);

  return combinedData;
}
