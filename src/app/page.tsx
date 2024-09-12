import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import Controls from "~/components/controls";
import DataDisplay from "~/components/data-display";
import { getAppState } from "~/lib/utils";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { beforeDate, afterDate, beforeFeed, afterFeed } =
    getAppState(searchParams);
  const allPresent = beforeDate && afterDate && beforeFeed && afterFeed;
  return (
    <div className="mx-4">
      <div className="flex flex-col gap-4 py-4">
        <div className="grid md:grid-cols-3">
          <Card>
            <CardHeader>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <CardTitle>What's going on here?</CardTitle>
            </CardHeader>
            <CardContent className="grid space-y-2">
              <p>
                This is a little tool to see how transit service is changing.
                After selecting two dates, you can see the changes per route and
                overall between the two dates.
              </p>
              <p>
                Presets relating to current Seattle area service changes are
                provided. You can also select your own dates and feeds to
                compare.
              </p>
              <p>Made by <a className="underline" href="https://twitter.com/danielhep" target="_blank" rel="noreferrer">@danielhep</a>. Source code available <a className="underline" href="https://github.com/danielhep/service-changes" target="_blank" rel="noreferrer">on GitHub</a>.</p>
            </CardContent>
          </Card>
          <Controls className="col-span-2" />
        </div>
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
              <Suspense fallback={<div>Loading...</div>}>
                <DataDisplay
                  beforeDate={beforeDate}
                  afterDate={afterDate}
                  beforeFeed={beforeFeed}
                  afterFeed={afterFeed}
                />
              </Suspense>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
