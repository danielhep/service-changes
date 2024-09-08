"use client";
import { useCallback, useState } from "react";
import { type Preset, presets } from "~/data/presets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { feeds } from "~/data/feeds";
import { Label } from "./ui/label";
import { DatePicker } from "./ui/datepicker";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAppState } from "~/lib/utils";
import { formatISO9075 } from "date-fns";

export default function Controls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { beforeDate, afterDate, beforeFeed, afterFeed } =
    getAppState(searchParams);
  // A lot of messy code to handle the search params
  // Because the value from searchParams only updates on render
  // And we need to call it multiple times in a row
  const createQS = useCallback(
    (
      paramName: string,
      value: string | undefined,
      sp = new URLSearchParams(searchParams.toString()),
    ) => {
      if (value) {
        sp.set(paramName, value);
      } else {
        sp.delete(paramName);
      }
      return sp.toString();
    },
    [searchParams],
  );
  const createQSDate = useCallback(
    (
      paramName: string,
      value: Date | undefined,
      sp = new URLSearchParams(searchParams.toString()),
    ) => {
      const formattedDate = value ? formatISO9075(value, { representation: "date" }) : undefined;
      return createQS(paramName, formattedDate, sp);
    },
    [createQS, searchParams],
  );

  const setBeforeDate = (value: Date | undefined) =>
    router.push(`?${createQSDate("beforeDate", value)}`);
  const setAfterDate = (value: Date | undefined) =>
    router.push(`?${createQSDate("afterDate", value)}`);
  const setBeforeFeed = (value: string) =>
    router.push(`?${createQS("beforeFeed", value)}`);
  const setAfterFeed = (value: string) =>
    router.push(`?${createQS("afterFeed", value)}`);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSetPreset = (preset: Preset) => {
    if (preset) {
      const sp = new URLSearchParams(searchParams.toString());
      createQSDate("beforeDate", preset.beforeDate, sp);
      createQSDate("afterDate", preset.afterDate, sp);
      createQS("beforeFeed", preset.beforeFeed, sp);
      createQS("afterFeed", preset.afterFeed, sp);
      router.push(`?${sp.toString()}`);
    }
  };

  console.log(beforeFeed?.id, afterFeed?.id, beforeDate, afterDate);
  const selectedPreset = presets.find(
    (preset) =>
      preset.beforeDate === beforeDate &&
      preset.afterDate === afterDate &&
      preset.beforeFeed === beforeFeed?.id &&
      preset.afterFeed === afterFeed?.id,
  );

  return (
    <div className="m-auto flex flex-col gap-4">
      {/* Presets */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">Presets</h2>
        <div className="grid grid-cols-2 gap-2 md:w-[480px] md:grid-cols-3">
          {presets.map((preset) => (
            <Button
              key={preset.id}
              className="w-full"
              onClick={() => handleSetPreset(preset)}
              variant={selectedPreset?.id === preset.id ? "default" : "outline"}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <div>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full justify-between"
        >
          Advanced Options
          {showAdvanced ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Date and Feed Selection */}
      {showAdvanced && (
        <div className="space-y-4 rounded-md border p-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Advanced Options</h2>
            <div className="space-y-2">
              <Label htmlFor="after-date">Before Date</Label>
              <div className="flex flex-col gap-2">
                <Select onValueChange={setBeforeFeed} value={beforeFeed?.id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feed" />
                  </SelectTrigger>
                  <SelectContent>
                    {feeds.map((feed) => (
                      <SelectItem key={feed.id} value={feed.id}>
                        {feed.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DatePicker
                  value={beforeDate}
                  onChange={(date) => setBeforeDate(date)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="after-date">After Date</Label>
              <div className="flex flex-col gap-2">
                <Select onValueChange={setAfterFeed} value={afterFeed?.id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feed" />
                  </SelectTrigger>
                  <SelectContent>
                    {feeds.map((feed) => (
                      <SelectItem key={feed.id} value={feed.id}>
                        {feed.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DatePicker
                  value={afterDate}
                  onChange={(date) => setAfterDate(date)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
