import { type SummaryTransitData } from "~/data/processing";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DashboardRow({
  summaryData
}: {
  summaryData: SummaryTransitData;
}) {
  const tripsDiff = summaryData.trip_count_after - summaryData.trip_count_before;
  const hoursDiff = summaryData.total_duration_after - summaryData.total_duration_before;
  const routesDiff = summaryData.added_routes.length - summaryData.removed_routes.length;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Trips Difference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {tripsDiff > 0 ? "+" : ""}
            {tripsDiff}
          </div>
          <p className="text-xs text-muted-foreground">
            {summaryData.percent_change_trips}% change
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Service Hours Difference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {hoursDiff > 0 ? "+" : ""}
            {Math.round(hoursDiff * 100) / 100}
          </div>
          <p className="text-xs text-muted-foreground">
            {summaryData.percent_change_hours}% change
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Routes Difference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {routesDiff > 0 ? "+" : ""}
            {routesDiff}
          </div>
          <p className="text-xs text-muted-foreground">
            {summaryData.added_routes.length} added, {summaryData.removed_routes.length} removed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
