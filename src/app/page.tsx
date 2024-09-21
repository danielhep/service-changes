"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import FeedSelector from "./feed-selector";
import { PresetSelector } from "./preset-selector";
import { Button } from "~/components/ui/button";
import { type FeedAndDate } from "~/data/feeds";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [firstFeed, setFirstFeed] = useState<FeedAndDate | null>(null);
  const [secondFeed, setSecondFeed] = useState<FeedAndDate | null>(null);
  return (
    <div className="m-auto my-4 mt-4 grid max-w-3xl grid-cols-1 space-y-4">
      {/* <h1 className="text-4xl font-bold">
        What is <span className="text-purple-500">What the Bus?</span>
      </h1> */}
      <p>
        Compare two transit feeds or different dates in the same feed to see how
        service has changed across a service change.
      </p>
      <p>
        Use a helpful preset to quickly see current service changes for various
        agencies, or manually select your inputs below.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Comparison Presets</CardTitle>
          <CardDescription>
            These presets are based on the most recent/upcoming service change
            for the given agency. They will select service dates before and
            after the change from the corresponding feed, and enter compare
            mode.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PresetSelector />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Manual Feed Selection</CardTitle>
          <CardDescription>
            Select two feeds and dates to compare.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <FeedSelector onSelectionChange={setFirstFeed} />
          <h4 className="text-sm text-muted-foreground">compare with:</h4>
          <FeedSelector onSelectionChange={setSecondFeed} />
          <Button
            disabled={!firstFeed || !secondFeed}
            aria-disabled={!firstFeed || !secondFeed}
            asChild
          >
            <Link
              href={`/${firstFeed?.identifier}/compareTo/${secondFeed?.identifier}`}
            >
              Compare these feeds
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
