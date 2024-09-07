import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { HydrateClient } from "~/trpc/server";
import DateSelector from "./_components/date-selector";
import DataTable from "./_components/data-table";
import { loadTransitData } from "./data";

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
  const firstDate = searchParams.firstDate ?? new Date().toISOString();
  const secondDate = searchParams.secondDate ?? new Date().toISOString();
  const firstData = await loadTransitData(new Date(firstDate));
  const secondData = await loadTransitData(new Date(secondDate));
  return (
    <HydrateClient>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Transit Data Dashboard</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-center gap-4">
            <DateSelector title="First Date" paramName="firstDate" />
            <DateSelector title="Second Date" paramName="secondDate" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                Transit Data for {new Date(firstDate).toDateString()} to {new Date(secondDate).toDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable transitData1={firstData} transitData2={secondData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </HydrateClient>
  );
}
