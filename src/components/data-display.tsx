import { loadTransitData } from "~/app/data";
import DataTable from "./data-table";
import { Feed } from "~/data/feeds";

export default async function DataDisplay({
  beforeDate,
  afterDate,
  beforeFeed,
  afterFeed,
}: {
  beforeDate: Date;
  afterDate: Date;
  beforeFeed: Feed;
  afterFeed: Feed;
}) {
  const beforeData = await loadTransitData(beforeDate, beforeFeed.path);
  const afterData = await loadTransitData(afterDate, afterFeed.path);
  const routesBefore = beforeData.length;
  const routesAfter = afterData.length;
  const tripsBefore = beforeData.reduce((sum, data) => sum + data.trip_count, 0);
  const tripsAfter = afterData.reduce((sum, data) => sum + data.trip_count, 0);
  const hoursBefore = beforeData.reduce((sum, data) => sum + data.total_duration, 0);
  const hoursAfter = afterData.reduce((sum, data) => sum + data.total_duration, 0);     
  return (
    <div>
      <DataTable transitData1={beforeData} transitData2={afterData} />   
    </div>
  );
}