import { parse } from "date-fns";

export type Preset = {
  beforeDate: Date;
  afterDate: Date;
  beforeFeed: string;
  afterFeed: string;
  id: string;
  name: string;
};

export type Feed = {
  id: string;
  path: string;
  dates: Record<string, Date>;
};

export type FeedGroup = {
  id: string;
  name: string;
  feeds: Feed[];
};

export type FeedAndDate = {
  date: Date;
  feed: Feed;
  feedGroup: FeedGroup;
}

const parseDate = (date: string) => parse(date, "yyyy-MM-dd", new Date());

const getDateMap = (dateStrs: Record<string, string>): Record<string, Date> => {
  const dateMap: Record<string, Date> = {};
  Object.entries(dateStrs).forEach(([key, value]) => {
    dateMap[key] = parseDate(value);
  });
  return dateMap;
};

// Feed Identifiers are in the following format: feedGroupId:feedId:dateId
// For example: kcm:sept-2024:beforeSat
export const identifierToFeedAndDate = (identifier: string): FeedAndDate => {
  const [feedGroupId, feedId, dateId] = identifier.split(":");
  if (!feedGroupId || !feedId || !dateId) {
    throw new Error(`Invalid identifier: ${identifier}`);
  }
  const feedGroup = feedGroups.find((feedGroup) => feedGroup.id === feedGroupId);
  if (!feedGroup) {
    throw new Error(`Feed group not found: ${feedGroupId}`);
  }
  const feed = feedGroup.feeds.find((feed) => feed.id === feedId);
  if (!feed) {
    throw new Error(`Feed not found: ${feedGroupId}:${feedId}`);
  }
  const date = feed.dates[dateId];
  if (!date) {
    throw new Error(`Date not found: ${feedGroupId}:${feedId}:${dateId}`);
  }
  return {
    date,
    feed,
    feedGroup,
  };
};



export const feedGroups: FeedGroup[] = [
  {
    id: "kcm",
    name: "King County Metro",
    feeds: [
      {
        id: "sept-2024",
        path: "./gtfs/kcm",
        dates: getDateMap({
          beforeWeekday: "2024-09-13",
          afterWeekday: "2024-09-16",
          beforeSat: "2024-09-07",
          afterSat: "2024-09-21",
          beforeSun: "2024-09-08",
          afterSun: "2024-09-22",
        }),
      },
    ],
  },
  {
    id: "st",
    name: "Sound Transit",
    feeds: [
      {
        id: "sept-2024",
        path: "./gtfs/st",
        dates: getDateMap({
          beforeWeekday: "2024-09-13",
          afterWeekday: "2024-09-16",
          beforeSat: "2024-09-07",
          afterSat: "2024-09-21",
          beforeSun: "2024-09-08",
          afterSun: "2024-09-22",
        }),
      },
    ],
  },
  {
    id: "ct",
    name: "Community Transit",
    feeds: [
      {
        id: "sept-2024",
        path: "./gtfs/ct",
        dates: getDateMap({
          beforeWeekday: "2024-09-13",
          afterWeekday: "2024-09-16",
          beforeSat: "2024-09-07",
          afterSat: "2024-09-21",
          beforeSun: "2024-09-08",
          afterSun: "2024-09-22",
        }),
      },
    ],
  },
];
