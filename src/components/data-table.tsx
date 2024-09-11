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

export default function DataTable({
  data,
}: {
  data: CombinedTransitData[];
}) {

  return (
    <Table className="max-w-2xl m-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Route Short Name</TableHead>
          <TableHead>Service Hours</TableHead>
          <TableHead>Trips</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((route) => (
          <TableRow key={route.route_id}>
            <TableCell>{route.route_short_name}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
