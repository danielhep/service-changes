"use client";

import React, { useState, useCallback } from "react";
import { ChevronDown, Calendar, CheckIcon } from "lucide-react";
import { format } from "date-fns";
import { type Feed, type FeedGroup, feedGroups } from "~/data/feeds";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

export default function FeedSelector() {
  const [feedGroupOpen, setFeedGroupOpen] = useState(false);
  const [feedOpen, setFeedOpen] = useState(false);
  const [datePresetOpen, setDatePresetOpen] = useState(false);
  const [customDateOpen, setCustomDateOpen] = useState(false);
  const [selectedFeedGroup, setSelectedFeedGroup] = useState<FeedGroup | null>(
    null,
  );
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [selectedDatePreset, setSelectedDatePreset] = useState<string | null>(
    null,
  );
  const [customDate, setCustomDate] = useState<string>("");

  const handleFeedGroupChange = useCallback((value: string) => {
    const newFeedGroup = feedGroups.find((fg) => fg.id === value) ?? null;
    setSelectedFeedGroup(newFeedGroup);
    setSelectedFeed(null);
    setSelectedDatePreset(null);
    setCustomDate("");
  }, []);

  const handleFeedChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newFeed =
        selectedFeedGroup?.feeds.find((f) => f.id === e.target.value) ?? null;
      setSelectedFeed(newFeed);
      setSelectedDatePreset(null);
      setCustomDate("");
    },
    [selectedFeedGroup],
  );

  const handleDatePresetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDatePreset(e.target.value);
      if (e.target.value !== "custom") {
        setCustomDate("");
      }
    },
    [],
  );

  const selectStyles =
    "block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none";

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/* FeedGroup Selector */}
        <Popover open={feedGroupOpen} onOpenChange={setFeedGroupOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={feedGroupOpen}
              className="w-[200px] justify-between"
            >
              {selectedFeedGroup
                ? feedGroups.find((fg) => fg.id === selectedFeedGroup.id)?.name
                : "Select feed group..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search feed group..."
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No feed group found.</CommandEmpty>
                <CommandGroup>
                  {feedGroups.map((fg) => (
                    <CommandItem
                      key={fg.id}
                      keywords={[fg.id, fg.name]}
                      value={fg.id}
                      onSelect={(currentValue) => {
                        handleFeedGroupChange(currentValue);
                        setFeedGroupOpen(false);
                      }}
                    >
                      {fg?.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedFeedGroup?.id === fg.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Feed Selector */}
        <div className="flex-1">
          <label
            htmlFor="feed"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Feed
          </label>
          <div className="relative">
            <select
              id="feed"
              className={selectStyles}
              value={selectedFeed?.id ?? ""}
              onChange={handleFeedChange}
              disabled={!selectedFeedGroup}
            >
              <option value="">Select Feed</option>
              {selectedFeedGroup?.feeds.map((feed) => (
                <option key={feed.id} value={feed.id}>
                  {feed.id}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* DatePreset Selector */}
        <div className="flex-1">
          <label
            htmlFor="datePreset"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date Preset
          </label>
          <div className="relative">
            <select
              id="datePreset"
              className={selectStyles}
              value={selectedDatePreset ?? ""}
              onChange={handleDatePresetChange}
              disabled={!selectedFeed}
            >
              <option value="">Select Date Preset</option>
              {selectedFeed &&
                Object.keys(selectedFeed.dates).map((preset) => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
              <option value="custom">Custom Date</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Date Selector */}
      {selectedDatePreset === "custom" && (
        <div className="mt-4">
          <label
            htmlFor="customDate"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Custom Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="customDate"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
        </div>
      )}

      {/* Display selected values */}
      <div className="mt-8 rounded-md bg-gray-100 p-4">
        <h3 className="mb-2 text-lg font-semibold">Selected Values:</h3>
        <p>
          <strong>Feed Group:</strong>{" "}
          {selectedFeedGroup?.name ?? "Not selected"}
        </p>
        <p>
          <strong>Feed:</strong> {selectedFeed?.id ?? "Not selected"}
        </p>
        <p>
          <strong>Date Preset:</strong> {selectedDatePreset ?? "Not selected"}
        </p>
        {selectedDatePreset === "custom" && (
          <p>
            <strong>Custom Date:</strong>{" "}
            {customDate
              ? format(new Date(customDate), "MMMM d, yyyy")
              : "Not selected"}
          </p>
        )}
        {selectedFeed &&
          selectedDatePreset &&
          selectedDatePreset !== "custom" && (
            <p>
              <strong>Selected Date:</strong>{" "}
              {format(selectedFeed.dates[selectedDatePreset], "MMMM d, yyyy")}
            </p>
          )}
      </div>
    </div>
  );
}