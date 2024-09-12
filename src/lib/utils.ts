import { clsx, type ClassValue } from "clsx";
import { parse, setHours } from "date-fns";
import { twMerge } from "tailwind-merge";
import { type Feed, feeds } from "~/data/feeds";
import { utcToZonedTime } from 'date-fns-tz'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AppState = {
  beforeDate?: Date;
  afterDate?: Date;
  beforeFeed?: Feed;
  afterFeed?: Feed;
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
  const beforeFeed = feeds.find((feed) => feed.id === sp.beforeFeed);
  const afterFeed = feeds.find((feed) => feed.id === sp.afterFeed);
  return {
    beforeDate: beforeDate ? setHours(beforeDate, 0) : undefined,
    afterDate: afterDate ? setHours(afterDate, 0) : undefined,
    beforeFeed: beforeFeed ? beforeFeed : undefined,
    afterFeed: afterFeed ? afterFeed : undefined,
  };
}
