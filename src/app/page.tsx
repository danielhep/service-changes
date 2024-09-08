import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import Controls from "~/components/controls";
import DataDisplay from "~/components/data-display";
import { getAppState } from "~/lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { beforeDate, afterDate, beforeFeed, afterFeed} =
    getAppState(searchParams);
  const allPresent = beforeDate && afterDate && beforeFeed && afterFeed;
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-4 py-4">
        <Controls />
        {!allPresent && (
          <Card>
            <CardHeader>
              <CardTitle>Please select a date range and feed.</CardTitle>
            </CardHeader>
          </Card>
        )}
        {allPresent && (
          <Card>
            <CardHeader>
              <CardTitle>
                Transit Data for {new Date(beforeDate).toDateString()} to{" "}
                {new Date(afterDate).toDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataDisplay
                beforeDate={beforeDate}
                afterDate={afterDate}
                beforeFeed={beforeFeed}
                afterFeed={afterFeed}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
