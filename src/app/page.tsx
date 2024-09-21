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
    <div className="m-auto mt-4 grid max-w-3xl grid-cols-1 space-y-4 my-4">
      <h1 className="text-4xl font-bold">
        What is <span className="text-purple-500">What the Bus?</span>
      </h1>
      <p className="text-xl">
        Analyze transit service or compare two feeds to see how they have
        changed over time.
      </p>
      <p>
        Begin with a preset that corresponds to the most recent/upcoming service
        change or manually select your inputs below.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Comparison Presets</CardTitle>
          <CardDescription>
            These presets are based on the most recent/upcoming service change
            for the given agency. They will select service dates before and after
            the change from the corresponding feed, and enter compare mode.
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
            Manually select a feed and date to analyze or compare.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <FeedSelector onSelectionChange={setFirstFeed} />
          <h4 className="text-sm text-muted-foreground">
            Select second feed and enable comparison mode:
          </h4>
          <FeedSelector onSelectionChange={setSecondFeed} />
          {!secondFeed ? (
            <Button disabled={!firstFeed} aria-disabled={!firstFeed}>
              Analyze single feed
            </Button>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
