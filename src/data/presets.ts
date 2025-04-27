export type Preset = {
  beforeIdentifier: string;
  afterIdentifier: string;
  id: string;
  region: string;
  agency: string;
  dayOfWeek: "weekday" | "saturday" | "sunday";
  serviceChange: Date;
};

export const presets: Preset[] = [
  {
    id: "kcm-sept-2024-service-changes-weekday",
    agency: "King County Metro",
    dayOfWeek: "weekday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "kcm:sept-2024:beforeWeekday",
    afterIdentifier: "kcm:sept-2024:afterWeekday",
  },
  {
    id: "kcm-sept-2024-service-changes-saturday",
    agency: "King County Metro",
    dayOfWeek: "saturday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "kcm:sept-2024:beforeSat",
    afterIdentifier: "kcm:sept-2024:afterSat",
  },
  {
    id: "kcm-sept-2024-service-changes-sunday",
    agency: "King County Metro",
    dayOfWeek: "sunday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "kcm:sept-2024:beforeSun",
    afterIdentifier: "kcm:sept-2024:afterSun",
  },
  {
    id: "kcm-mar-2025-service-changes-weekday",
    agency: "King County Metro",
    dayOfWeek: "weekday",
    serviceChange: new Date("2025-03-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "kcm:mar-2025:beforeWeekday",
    afterIdentifier: "kcm:mar-2025:afterWeekday",
  },
  {
    id: "ct-weekday",
    agency: "Community Transit",
    dayOfWeek: "weekday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "ct:sept-2024:beforeWeekday",
    afterIdentifier: "ct:sept-2024:afterWeekday",
  },
  {
    id: "ct-saturday",
    agency: "Community Transit",
    dayOfWeek: "saturday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "ct:sept-2024:beforeSat",
    afterIdentifier: "ct:sept-2024:afterSat",
  },
  {
    id: "ct-sunday",
    agency: "Community Transit",
    dayOfWeek: "sunday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "ct:sept-2024:beforeSun",
    afterIdentifier: "ct:sept-2024:afterSun",
  },
  {
    id: "st-weekday",
    agency: "Sound Transit",
    dayOfWeek: "weekday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "st:sept-2024:beforeWeekday",
    afterIdentifier: "st:sept-2024:afterWeekday",
  },
  {
    id: "st-saturday",
    agency: "Sound Transit",
    dayOfWeek: "saturday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "st:sept-2024:beforeSat",
    afterIdentifier: "st:sept-2024:afterSat",
  },
  {
    id: "st-sunday",
    agency: "Sound Transit",
    dayOfWeek: "sunday",
    serviceChange: new Date("2024-09-01"), // Placeholder date
    region: "Puget Sound",
    beforeIdentifier: "st:sept-2024:beforeSun",
    afterIdentifier: "st:sept-2024:afterSun",
  },
  {
    id: "caltrain-weekday",
    agency: "Caltrain",
    dayOfWeek: "weekday",
    serviceChange: new Date("2024-09-01"), // Placeholder date for CalMod electrification
    region: "San Francisco",
    beforeIdentifier: "caltrain:pre-calmod:weekday",
    afterIdentifier: "caltrain:post-calmod:weekday",
  },
  {
    // Note: Representing 'weekend' as 'saturday' for dayOfWeek consistency
    id: "caltrain-weekend",
    agency: "Caltrain",
    dayOfWeek: "saturday",
    serviceChange: new Date("2024-09-01"), // Placeholder date for CalMod electrification
    region: "San Francisco",
    beforeIdentifier: "caltrain:pre-calmod:weekend",
    afterIdentifier: "caltrain:post-calmod:weekend",
  },
];