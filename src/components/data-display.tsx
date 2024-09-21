import { loadTransitData } from "~/data/data";
import DataTable from "./table/data-table";
import { type FeedAndDate } from "~/data/feeds";
import DashboardRow from "./dashboard-row";
import { processData } from "~/data/processing";

export default async function DataDisplay({
  before,
  after,
}: {
  before: FeedAndDate;
  after: FeedAndDate;
}) {
  const [beforeData, afterData] = await Promise.all([
    loadTransitData(before),
    loadTransitData(after),
  ]);
  const combinedData = processData(beforeData, afterData);
  return (
    <div>
      <DashboardRow summaryData={combinedData.summary} />
      <DataTable data={combinedData.perRoute} />
    </div>
  );
}
