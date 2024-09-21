import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import DataDisplay from "~/components/data-display";
import { Suspense } from "react";
import { FeedAndDate } from "~/data/feeds";

export default async function Compare({
  params,
}: {
  params: { feedIdentifier: string; feedIdentifier2: string };
}) {
  const feedIdentifier = params.feedIdentifier;
  const feedIdentifier2 = params.feedIdentifier2;
  if (!feedIdentifier || !feedIdentifier2) {
    return <div>No feeds selected</div>;
  }
  const beforeFeedAndDate = FeedAndDate.fromIdentifier(feedIdentifier);
  const afterFeedAndDate = FeedAndDate.fromIdentifier(feedIdentifier2);

  const sameFeed = beforeFeedAndDate.hasSameFeed(afterFeedAndDate);

  const title = sameFeed
    ? `Transit data for ${beforeFeedAndDate.feedGroup.name}: ${beforeFeedAndDate.feed.name} from ${beforeFeedAndDate.date.toDateString()} to ${afterFeedAndDate.date.toDateString()}`
    : `Transit data for ${beforeFeedAndDate.feedGroup.name}: ${beforeFeedAndDate.feed.name} on ${beforeFeedAndDate.date.toDateString()} to ${beforeFeedAndDate.feedGroup.name}: ${afterFeedAndDate.feed.name} on ${afterFeedAndDate.date.toDateString()}`;
  return (
    <div className="mx-4">
      <div className="flex flex-col gap-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle className="leading-5">{title}</CardTitle>
            <CardDescription>
              The data shown here is a comparison of transit service schedules
              between two dates, broken down by route. The data from every trip
              on the given service date is aggregated. More information about
              each column is available by hovering over the icons by the
              headers.
            </CardDescription>
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
