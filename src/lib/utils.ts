import { clsx, type ClassValue } from "clsx";
import { parse, setHours } from "date-fns";
import { twMerge } from "tailwind-merge";
import { type FeedGroup, feedGroups } from "~/data/feeds";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AppState = {
  beforeDate?: Date;
  afterDate?: Date;
  beforeFeed?: FeedGroup;
  afterFeed?: FeedGroup;
};

export function getAppState(
  searchParams: URLSearchParams | Record<string, string>,
): AppState {
  let sp: Record<string, string> = {};
  if (searchParams instanceof URLSearchParams) {
    sp = Object.fromEntries(searchParams);
  } else {
    sp = searchParams;
  }
  const beforeDate = sp.beforeDate
    ? parse(sp.beforeDate, "yyyy-MM-dd", new Date())
    : undefined;
  const afterDate = sp.afterDate
    ? parse(sp.afterDate, "yyyy-MM-dd", new Date())
    : undefined;
  const beforeFeed = feedGroups.find((feed) => feed.id === sp.beforeFeed);
  const afterFeed = feedGroups.find((feed) => feed.id === sp.afterFeed);
  return {
    beforeDate: beforeDate ? setHours(beforeDate, 0) : undefined,
    afterDate: afterDate ? setHours(afterDate, 0) : undefined,
    beforeFeed: beforeFeed ? beforeFeed : undefined,
    afterFeed: afterFeed ? afterFeed : undefined,
  };
}
