import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { api, HydrateClient } from "~/trpc/server";
import DateSelector from "./_components/date-selector";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Placeholder data - replace this with your actual data fetching logic
  const transitData = [
    { routeShortName: "A1", tripCount: 50, serviceHours: 18.5 },
    { routeShortName: "B2", tripCount: 40, serviceHours: 15.0 },
    { routeShortName: "C3", tripCount: 30, serviceHours: 12.5 },
  ];
  const date = searchParams.date ?? new Date().toISOString();

  return (
    <HydrateClient>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Transit Data Dashboard</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-center">
            <DateSelector title="First Date" paramName="firstDate" />
            <DateSelector title="Second Date" paramName="secondDate" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                Transit Data for {new Date(date).toDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </HydrateClient>
  );
}
