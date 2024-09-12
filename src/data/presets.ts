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
    id: "kcm-weekday",
    name: "Metro Weekday",
  },
  {
    beforeDate: parse("2024-09-7", "yyyy-MM-dd", new Date()),
    afterDate: parse("2024-09-21", "yyyy-MM-dd", new Date()),
    beforeFeed: "kcm",
    afterFeed: "kcm",
    id: "kcm-sat",
    name: "Metro Saturday",
  },
  {
    beforeDate: parse("2024-09-8", "yyyy-MM-dd", new Date()),
    afterDate: parse("2024-09-22", "yyyy-MM-dd", new Date()),
    beforeFeed: "kcm",
    afterFeed: "kcm",
    id: "kcm-sun",
    name: "Metro Sunday",
  },
  {
    beforeDate: parse("2024-09-13", "yyyy-MM-dd", new Date()),
    afterDate: parse("2024-09-16", "yyyy-MM-dd", new Date()),
    beforeFeed: "ct",
    afterFeed: "ct",
    id: "ct-weekday",
    name: "Community Transit Weekday",
  },
  {
    beforeDate: parse("2024-09-7", "yyyy-MM-dd", new Date()),
    afterDate: parse("2024-09-21", "yyyy-MM-dd", new Date()),
    beforeFeed: "ct",
    afterFeed: "ct",
    id: "ct-sat",
    name: "Community Transit Saturday",
  },
  {
    beforeDate: parse("2024-09-8", "yyyy-MM-dd", new Date()),
    afterDate: parse("2024-09-22", "yyyy-MM-dd", new Date()),
    beforeFeed: "ct",
    afterFeed: "ct",
    id: "ct-sun",
    name: "Community Transit Sunday",
  },

];
