import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { type Preset, presets } from "~/data/presets";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
// Helper function to group presets
const groupPresets = (presets: Preset[]) => {
  return presets.reduce(
    (acc, preset) => {
      // Group by region
      if (!acc[preset.region]) {
        acc[preset.region] = {};
      }
      const regionGroup = acc[preset.region]!;

      // Group by agency within region
      if (!regionGroup[preset.agency]) {
        regionGroup[preset.agency] = {};
      }
      const agencyGroup = regionGroup[preset.agency]!;

      // Group by service change date within agency (using local date format as key)
      const serviceChangeKey = format(preset.serviceChange, 'yyyy-MM-dd');
      if (!agencyGroup[serviceChangeKey]) {
        agencyGroup[serviceChangeKey] = [];
      }
      agencyGroup[serviceChangeKey]!.push(preset);

      // Sort presets within the service change group by dayOfWeek
      agencyGroup[serviceChangeKey]!.sort((a, b) => {
        const order = { weekday: 1, saturday: 2, sunday: 3 };
        return (order[a.dayOfWeek] ?? 99) - (order[b.dayOfWeek] ?? 99);
      });


      return acc;
    },
    {} as Record<string, Record<string, Record<string, Preset[]>>>,
  );
};

export const PresetSelector = () => {
  const groupedPresets = groupPresets(presets);

  return (
    <div className="mx-auto w-full">
      <TooltipProvider>
        {Object.entries(groupedPresets).map(([region, agencies]) => (
          <div key={region} className="mb-6">
            <h2 className="mb-4 border-b pb-1 text-left text-lg font-semibold">{region}</h2>
            {Object.entries(agencies).map(([agency, serviceChanges]) => (
              <div key={agency} className="mb-4 ml-2">
                <h3 className="mb-2 text-left text-base font-medium">{agency}</h3>
                {Object.entries(serviceChanges).map(([serviceChangeKey, dayPresets]) => dayPresets[0] && (
                  <div key={serviceChangeKey} className="mb-3 ml-4">
                    <h4 className="mb-2 text-left text-sm text-muted-foreground">
                      Service Change: {formatInTimeZone(dayPresets[0].serviceChange, "UTC", "MMM yyyy")}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {dayPresets.map((preset, presetIndex) => (
                        <Tooltip key={presetIndex}>
                          <TooltipTrigger asChild>
                            <Link
                              className={cn(buttonVariants({ variant: "outline" }), 'text-wrap')}
                              key={preset.id} // Use preset.id for a more stable key
                              href={`/${preset.beforeIdentifier}/compareTo/${preset.afterIdentifier}`}
                            >
                              {preset.dayOfWeek}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            Compare {preset.agency} {formatInTimeZone(preset.serviceChange, "UTC", "MMM yyyy")} {preset.dayOfWeek} ({preset.beforeIdentifier} vs {preset.afterIdentifier})
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
};
