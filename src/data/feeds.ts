export type Feed = {
  id: string;
  name: string;
  path: string;
};

export const feeds: Feed[] = [
  {
    id: "kcm",
    name: "King County Metro",
    path: "./gtfs/kcm",
  },
  {
    id: "st",
    name: "Sound Transit",
    path: "./gtfs/st",
  },
];