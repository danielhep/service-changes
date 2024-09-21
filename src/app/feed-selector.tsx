"use client";

import React, { useState, useCallback } from "react";
import { CheckIcon } from "lucide-react";
import {
  type Feed,
  type FeedGroup,
  feedGroups,
  FeedAndDate,
} from "~/data/feeds";
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

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
  placeholder: string;
  label: string;
  disabled?: boolean;
}

const Select = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled = false,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-w-[200px] flex-1">
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            <span className="truncate">
              {value
                ? options.find((option) => option.id === value)?.name
                : placeholder}
            </span>
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <span className="truncate">{option.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 flex-shrink-0",
                        value === option.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface FeedSelectorProps {
  onSelectionChange: (selection: FeedAndDate | null) => void;
}

const getFeedAndDate = (
  selectedFeedGroup: FeedGroup | null,
  selectedFeed: Feed | null,
  selectedDatePreset: string | null,
): FeedAndDate | null => {
  if (!selectedFeedGroup || !selectedFeed || !selectedDatePreset) {
    return null;
  }
  return new FeedAndDate(selectedFeedGroup, selectedFeed.id, selectedDatePreset);
};

export default function FeedSelector({ onSelectionChange }: FeedSelectorProps) {
  const [selectedFeedGroup, setSelectedFeedGroup] = useState<FeedGroup | null>(
    null,
  );
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [selectedDatePreset, setSelectedDatePreset] = useState<string | null>(
    null,
  );

  const handleFeedGroupChange = useCallback((value: string) => {
    const newFeedGroup = feedGroups.find((fg) => fg.id === value) ?? null;
    setSelectedFeedGroup(newFeedGroup);
    setSelectedFeed(null);
    setSelectedDatePreset(null);
  }, []);

  const handleFeedChange = useCallback(
    (value: string) => {
      const newFeed =
        selectedFeedGroup?.feeds.find((f) => f.id === value) ?? null;
      setSelectedFeed(newFeed);
      setSelectedDatePreset(null);
    },
    [selectedFeedGroup],
  );

  const handleDatePresetChange = useCallback(
    (value: string) => {
      setSelectedDatePreset(value);
      onSelectionChange(getFeedAndDate(selectedFeedGroup, selectedFeed, value));
    },
    [onSelectionChange, selectedFeed, selectedFeedGroup],
  );

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Select
          value={selectedFeedGroup?.id ?? ""}
          onChange={handleFeedGroupChange}
          options={feedGroups.map((fg) => ({ id: fg.id, name: fg.name }))}
          placeholder="Select feed group..."
          label="Feed Group"
        />

        <Select
          value={selectedFeed?.id ?? ""}
          onChange={handleFeedChange}
          options={
            selectedFeedGroup?.feeds.map((f) => ({ id: f.id, name: f.id })) ??
            []
          }
          placeholder="Select Feed"
          label="Feed"
          disabled={!selectedFeedGroup}
        />

        <Select
          value={selectedDatePreset ?? ""}
          onChange={handleDatePresetChange}
          options={[
            ...(selectedFeed
              ? Object.keys(selectedFeed.dates).map((preset) => ({
                  id: preset,
                  name: preset,
                }))
              : []),
          ]}
          placeholder="Select Date Preset"
          label="Date Preset"
          disabled={!selectedFeed}
        />
      </div>
    </div>
  );
}
