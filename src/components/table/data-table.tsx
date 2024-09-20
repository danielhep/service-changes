import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { type CombinedTransitData } from "~/data/processing";
import { Badge } from "../ui/badge";
import { addHours, format, parse } from "date-fns";

export const routeAddedRemovedBadge = (route: CombinedTransitData) => {
  if (!route.trip_count_before && route.trip_count_after) {
    return (
      <Badge className="ml-2" variant="confirm">
        New
      </Badge>
    );
  } else if (route.trip_count_before && !route.trip_count_after) {
    return (
      <Badge className="ml-2" variant="destructive">
        Deleted
      </Badge>
    );
  } else {
    return "";
  }
};

const FormattedTime = ({ time }: { time?: number }) => {
  if (!time) return <>-</>;
  const date = addHours(new Date(0, 0, 0, 0, 0, 0, 0), time);
  return <div className="flex items-center gap-2">{format(date, "K:mm")}</div>;
};

export default function DataTable({ data }: { data: CombinedTransitData[] }) {
  return (
    <Table className="m-auto max-w-4xl whitespace-nowrap">
      <TableHeader>
        <TableRow>
          <TableHead>Route Short Name</TableHead>
          <TableHead>Service Hours</TableHead>
          <TableHead>Trips</TableHead>
          <TableHead>Avg Trip Dur</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((route) => (
          <TableRow key={route.route_id}>
            <TableCell>
              {route.route_short_name}
              {routeAddedRemovedBadge(route)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {route.total_duration_before
                  ? Math.round(route.total_duration_before * 100) / 100
                  : "-"}{" "}
                h
                <ArrowRight size={16} />
                {route.total_duration_after
                  ? Math.round(route.total_duration_after * 100) / 100
                  : "-"}{" "}
                h
                <p
                  className={cn(
                    (route.percent_change_hours ?? 0) > 0 && "text-green-500",
                    (route.percent_change_hours ?? 0) < 0 && "text-red-500",
                    (route.percent_change_hours ?? 0) === 0 && "text-gray-500",
                  )}
                >
                  (
                  {route.percent_change_hours !== undefined
                    ? `${route.percent_change_hours}%`
                    : "-"}
                  )
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {route.trip_count_before
                  ? Math.round(route.trip_count_before * 100) / 100
                  : "-"}{" "}
                <ArrowRight size={16} />
                {route.trip_count_after
                  ? Math.round(route.trip_count_after * 100) / 100
                  : "-"}{" "}
                trips
                <p
                  className={cn(
                    (route.percent_change_trips ?? 0) > 0 && "text-green-500",
                    (route.percent_change_trips ?? 0) < 0 && "text-red-500",
                    (route.percent_change_trips ?? 0) === 0 && "text-gray-500",
                  )}
                >
                  (
                  {route.percent_change_trips !== undefined
                    ? `${route.percent_change_trips}%`
                    : "-"}
                  )
                </p>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <FormattedTime time={route.avg_duration_before} />
                <ArrowRight size={16} />
                <FormattedTime time={route.avg_duration_after} />
                <p
                  className={cn(
                    (route.percent_change_avg ?? 0) > 0 && "text-green-500",
                    (route.percent_change_avg ?? 0) < 0 && "text-red-500",
                    (route.percent_change_avg ?? 0) === 0 && "text-gray-500",
                  )}
                >
                  (
                  {route.percent_change_avg !== undefined
                    ? `${route.percent_change_avg}%`
                    : "-"}
                  )
                </p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
