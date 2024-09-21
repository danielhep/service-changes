import { parse } from "date-fns";

export type Feed = {
  id: string;
  path: string;
  name: string;
  dates: Record<string, Date>;
};

export type FeedGroup = {
  id: string;
  name: string;
  feeds: Feed[];
};

export class FeedAndDate {
  #dateId: string;
  #feedId: string;
  #feedGroup: FeedGroup;

  constructor(feedGroup: FeedGroup, feedId: string, dateId: string) {
    if (feedGroup.feeds.find((feed) => feed.id === feedId) === undefined) {
      throw new Error(`Feed not found: ${feedGroup.id}:${feedId}`);
    }
    if (feedGroup.feeds.find((feed) => feed.dates[dateId] === undefined)) {
      throw new Error(`Date not found: ${feedGroup.id}:${feedId}:${dateId}`);
    }
    this.#dateId = dateId;
    this.#feedId = feedId;
    this.#feedGroup = feedGroup;
  }

  // Feed Identifiers are in the following format: feedGroupId:feedId:dateId
  // For example: kcm:sept-2024:beforeSat
  static fromIdentifier(identifier: string): FeedAndDate {
    const decodedIdentifier = decodeURIComponent(identifier);
    const [feedGroupId, feedId, dateId] = decodedIdentifier.split(":");
    if (!feedGroupId || !feedId || !dateId) {
      throw new Error(`Invalid identifier: ${identifier}`);
    }
    const feedGroup = feedGroups.find(
      (feedGroup) => feedGroup.id === feedGroupId,
    );
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
    return new FeedAndDate(feedGroup, feedId, dateId);
  }

  // Feed Identifiers are in the following format: feedGroupId:feedId:dateId
  // For example: kcm:sept-2024:beforeSat
  get identifier(): string {
    return `${this.feedGroup.id}:${this.#feedId}:${this.#dateId}`;
  }

  get feed(): Feed {
    // This is guaranteed to be defined because we check for it in the constructor
    // and the properties are private
    return this.feedGroup.feeds.find((feed) => feed.id === this.#feedId)!;
  }

  get feedGroup(): FeedGroup {
    return this.#feedGroup;
  }

  get date(): Date {
    // This is guaranteed to be defined because we check for it in the constructor
    // and the properties are private
    return this.feed.dates[this.#dateId]!;
  }

  hasSameFeed(other: FeedAndDate): boolean {
    return this.feedGroup.id === other.feedGroup.id && this.#feedId === other.#feedId;
  }

  hasSameFeedGroup(other: FeedAndDate): boolean {
    return this.feedGroup.id === other.feedGroup.id;
  }
}

const parseDate = (date: string) => parse(date, "yyyy-MM-dd", new Date());

const getDateMap = (dateStrs: Record<string, string>): Record<string, Date> => {
  const dateMap: Record<string, Date> = {};
  Object.entries(dateStrs).forEach(([key, value]) => {
    dateMap[key] = parseDate(value);
  });
  return dateMap;
};

export const feedGroups: FeedGroup[] = [
  {
    id: "kcm",
    name: "King County Metro",
    feeds: [
      {
        id: "sept-2024",
        path: "./gtfs/kcm",
        name: "Sept 2024 Service Changes",
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
        name: "Sept 2024 Service Changes",
        dates: getDateMap({
          beforeWeekday: "2024-08-23",
          afterWeekday: "2024-09-16",
          beforeSat: "2024-08-24",
          afterSat: "2024-09-21",
          beforeSun: "2024-08-25",
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
        name: "Sept 2024 Service Changes",
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
    id: "caltrain",
    name: "Caltrain",
    feeds: [
      {
        id: "post-calmod",
        name: "Post-Electrification",
        path: "./gtfs/caltrain-calmod",
        dates: getDateMap({
          weekday: "2024-09-27",
          weekend: "2024-09-28",
        }),
      },
      {
        id: "pre-calmod",
        name: "Pre-Electrification",
        path: "./gtfs/caltrain-diesel",
        dates: getDateMap({
          weekday: "2024-09-19",
          weekend: "2024-09-15",
        }),
      }
    ],
  },
];
