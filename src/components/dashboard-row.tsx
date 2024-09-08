import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DashboardRow({
  tripsDiff,
  hoursDiff,
  routesDiff,
  totalBeforeTrips,
  totalBeforeHours,
}: {
  tripsDiff: number;
  hoursDiff: number;
  routesDiff: number;
  totalBeforeTrips: number;
  totalBeforeHours: number;
}) {
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
            {((tripsDiff / totalBeforeTrips) * 100).toFixed(2)}% change
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
            {hoursDiff}
          </div>
          <p className="text-xs text-muted-foreground">
            {((hoursDiff / totalBeforeHours) * 100).toFixed(2)}% change
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
            {routesDiff === 0
              ? "No change"
              : `${Math.abs(routesDiff)} ${routesDiff > 0 ? "added" : "removed"}`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
