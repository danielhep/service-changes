export type Preset = {
  beforeIdentifier: string;
  afterIdentifier: string;
  id: string;
  name: string;
  region: string;
};

export const presets: Preset[] = [
  {
    id: "kcm-sept-2024-service-changes-weekday",
    name: "KCM Sept 2024 Service Changes Weekday",
    region: "Puget Sound",
    beforeIdentifier: "kcm:sept-2024:beforeWeekday",
    afterIdentifier: "kcm:sept-2024:afterWeekday",
  },
  {
    id: "kcm-sept-2024-service-changes-saturday",
    name: "KCM Sept 2024 Service Changes Saturday",
    region: "Puget Sound",
    beforeIdentifier: "kcm:sept-2024:beforeSat",
    afterIdentifier: "kcm:sept-2024:afterSat",
  },
  {
    id: "kcm-sept-2024-service-changes-sunday",
    name: "KCM Sept 2024 Service Changes Sunday",
    region: "Puget Sound",
    beforeIdentifier: "kcm:sept-2024:beforeSun",
    afterIdentifier: "kcm:sept-2024:afterSun",
  },
  {
    id: "kcm-mar-2025-service-changes-weekday",
    name: "KCM Mar 2025 Service Changes Weekday",
    region: "Puget Sound",
    beforeIdentifier: "kcm:sept-2024:afterWeekday",
    afterIdentifier: "kcm:mar-2025:afterWeekday",
  },
  {
    id: "ct-weekday",
    name: "CT Weekday",
    region: "Puget Sound",
    beforeIdentifier: "ct:sept-2024:beforeWeekday",
    afterIdentifier: "ct:sept-2024:afterWeekday",
  },
  {
    id: "ct-saturday",
    name: "CT Saturday",
    region: "Puget Sound",
    beforeIdentifier: "ct:sept-2024:beforeSat",
    afterIdentifier: "ct:sept-2024:afterSat",
  },
  {
    id: "ct-sunday",
    name: "CT Sunday",
    region: "Puget Sound",
    beforeIdentifier: "ct:sept-2024:beforeSun",
    afterIdentifier: "ct:sept-2024:afterSun",
  },
  {
    id: "st-weekday",
    name: "Sound Transit Weekday",
    region: "Puget Sound",
    beforeIdentifier: "st:sept-2024:beforeWeekday",
    afterIdentifier: "st:sept-2024:afterWeekday",
  },
  {
    id: "st-saturday",
    name: "Sound Transit Saturday",
    region: "Puget Sound",
    beforeIdentifier: "st:sept-2024:beforeSat",
    afterIdentifier: "st:sept-2024:afterSat",
  },
  {
    id: "st-sunday",
    name: "Sound Transit Sunday",
    region: "Puget Sound",
    beforeIdentifier: "st:sept-2024:beforeSun",
    afterIdentifier: "st:sept-2024:afterSun",
  },
  {
    id: "caltrain-weekday",
    name: "Caltrain Weekday",
    region: "San Francisco",
    beforeIdentifier: "caltrain:pre-calmod:weekday",
    afterIdentifier: "caltrain:post-calmod:weekday",
  },
  {
    id: "caltrain-weekend",
    name: "Caltrain Weekend",
    region: "San Francisco",
    beforeIdentifier: "caltrain:pre-calmod:weekend",
    afterIdentifier: "caltrain:post-calmod:weekend",
  },
];