import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type TransitData } from "../app/types";
import { ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";

type CombinedDataType = {
  route_id: string;
  route_short_name: string;
  trip_count_1?: number;
  trip_count_2?: number;
  total_duration_1?: number;
  total_duration_2?: number;
  percent_change_hours?: number;
  percent_change_trips?: number;
};

export default function DataTable({
  transitData1,
  transitData2,
}: {
  transitData1: TransitData[];
  transitData2: TransitData[];
}) {
  const combinedData: CombinedDataType[] = transitData1.map((data1) => ({
    route_id: data1.route_id,
    trip_count_1: Number(data1.trip_count),
    total_duration_1: data1.total_duration,
    route_short_name: data1.route_short_name,
  }));
  console.log(transitData1);
  transitData2.reduce((acc, data2) => {
    const existing = acc.find(
      (item) => item.route_short_name === data2.route_short_name,
    );
    if (existing) {
      existing.trip_count_2 = Number(data2.trip_count);
      existing.total_duration_2 = data2.total_duration;
      existing.percent_change_hours = Math.round(
        ((existing.total_duration_2 - (existing.total_duration_1 ?? 0)) * 100) /
          (existing.total_duration_1 ?? 0),
      );
      existing.percent_change_trips = Math.round(
        ((existing.trip_count_2 - (existing.trip_count_1 ?? 0)) * 100) /
          (existing.trip_count_1 ?? 0),
      );
    } else {
      acc.push({
        route_id: data2.route_id,
        trip_count_2: Number(data2.trip_count),
        total_duration_2: data2.total_duration,
        route_short_name: data2.route_short_name,
      });
    }
    return acc;
  }, combinedData);

  const sortedData = combinedData.sort((a, b) =>
    a.route_short_name.localeCompare(b.route_short_name, "en", {
      numeric: true,
    }),
  );

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
        {sortedData.map((route) => (
          <TableRow key={route.route_id}>
            <TableCell>{route.route_short_name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
              {route.total_duration_1
                ? Math.round(route.total_duration_1 * 100) / 100
                : "-"}{" "}
              h
              <ArrowRight size={16} />
              {route.total_duration_2
                ? Math.round(route.total_duration_2 * 100) / 100
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
                
              {route.trip_count_1
                ? Math.round(route.trip_count_1 * 100) / 100
                : "-"}{" "}
                
              <ArrowRight size={16} />
              {route.trip_count_2
                ? Math.round(route.trip_count_2 * 100) / 100
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
