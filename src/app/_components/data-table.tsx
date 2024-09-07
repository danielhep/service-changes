import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type TransitData } from "../types";

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
  transitData2.reduce((acc, data2) => {
    const existing = acc.find((item) => item.route_id === data2.route_id);
    if (existing) {
      existing.trip_count_2 = Number(data2.trip_count);
      existing.total_duration_2 = data2.total_duration;
      existing.percent_change_hours =
        existing.total_duration_1 &&
        Math.round(
          ((existing.total_duration_2 - existing.total_duration_1) * 100) /
            existing.total_duration_1,
        );
      existing.percent_change_trips =
        existing.trip_count_1 &&
        Math.round(
          ((existing.trip_count_2 - existing.trip_count_1) * 100) /
            existing.trip_count_1,
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
  console.log(combinedData);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Route Short Name</TableHead>
          <TableHead>Service Hours 1</TableHead>
          <TableHead>Service Hours 2</TableHead>
          <TableHead>Percent Change Hours</TableHead>
          <TableHead>Percent Change Trips</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {combinedData.map((route) => (
          <TableRow key={route.route_id}>
            <TableCell>{route.route_short_name}</TableCell>
            <TableCell>
              {route.total_duration_1
                ? Math.round(route.total_duration_1 * 100) / 100
                : "-"}{" "}
              h
            </TableCell>
            <TableCell>
              {route.total_duration_2
                ? Math.round(route.total_duration_2 * 100) / 100
                : "-"}{" "}
              h
            </TableCell>
            <TableCell
              className={
                route.percent_change_hours ? `text-green-500` : `text-red-500`
              }
            >
              {route.percent_change_hours !== undefined
                ? `${route.percent_change_hours}%`
                : "-"}
            </TableCell>
            <TableCell
              className={
                route.percent_change_trips ? `text-green-500` : `text-red-500`
              }
            >
              {route.percent_change_trips !== undefined
                ? `${route.percent_change_trips}%`
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
