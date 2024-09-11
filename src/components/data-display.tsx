import { loadTransitData } from "~/data/data";
import DataTable from "./data-table";
import { type Feed } from "~/data/feeds";
import DashboardRow from "./dashboard-row";
import { processData } from "~/data/processing";

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
  const combinedData = processData(beforeData, afterData);
  return (
    <div>
      <DashboardRow summaryData={combinedData.summary} />
      <DataTable data={combinedData.perRoute} />
    </div>
  );
}
