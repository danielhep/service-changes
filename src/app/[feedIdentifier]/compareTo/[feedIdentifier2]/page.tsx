import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import DataDisplay from "~/components/data-display";
import { Suspense } from "react";
import { identifierToFeedAndDate } from "~/data/feeds";

export default async function Compare({
  params,
}: {
  params: { feedIdentifier: string, feedIdentifier2: string };
}) {
  const feedIdentifier = params.feedIdentifier;
  const feedIdentifier2 = params.feedIdentifier2;
  if(!feedIdentifier || !feedIdentifier2) {
    return <div>No feeds selected</div>;
  }
  const beforeFeedAndDate = identifierToFeedAndDate(
    decodeURIComponent(feedIdentifier),
  );
  const afterFeedAndDate = identifierToFeedAndDate(
    decodeURIComponent(feedIdentifier2),
  );

  return (
    <div className="mx-4">
      <div className="flex flex-col gap-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Transit Data for {beforeFeedAndDate.date.toDateString()} to{" "}
              {afterFeedAndDate.date.toDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <DataDisplay
                before={beforeFeedAndDate}
                after={afterFeedAndDate}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
