import { parse } from "date-fns";

export type Preset = {
  beforeDate: Date;
  afterDate: Date;
  beforeFeed: string;
  afterFeed: string;
  id: string;
  name: string;
};

export const presets: Preset[] = [
  {
    beforeDate: parse("2024-09-13", "yyyy-MM-dd", new Date()),
    afterDate: parse("2024-09-16", "yyyy-MM-dd", new Date()),
    beforeFeed: "kcm",
    afterFeed: "kcm",
    id: "metro-weekday",
    name: "Metro Weekday",
  },
  {
    beforeDate: parse("2024-09-13", "yyyy-MM-dd", new Date()),
    afterDate: parse("2024-09-16", "yyyy-MM-dd", new Date()),
    beforeFeed: "ct",
    afterFeed: "ct",
    id: "community-weekday",
    name: "Community Transit Weekday",
  },
];
