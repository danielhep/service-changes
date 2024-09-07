import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { type TransitData } from "../types";

export default function DataTable({transitData}: {transitData: TransitData[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Route Short Name</TableHead>
          <TableHead>Trip Count</TableHead>
          <TableHead>Service Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transitData.map((route) => (
          <TableRow key={route.routeShortName}>
            <TableCell>{route.routeShortName}</TableCell>
            <TableCell>{route.tripCount}</TableCell>
            <TableCell>{route.serviceHours}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
