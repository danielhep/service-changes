import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { type Preset, presets } from "~/data/presets";
import { cn } from "~/lib/utils";

export const PresetSelector = () => {
  const presetsByRegion = presets.reduce(
    (acc, preset) => {
      const region = acc[preset.region];
      if (!region) {
        acc[preset.region] = [preset];
      } else {
        region.push(preset);
      }
      return acc;
    },
    {} as Record<string, Preset[]>,
  );

  return (
    <div className="mx-auto w-full">
      <TooltipProvider>
        {Object.keys(presetsByRegion).map((region, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-2 text-left text-sm">{region}:</h2>
            <div className="grid grid-cols-3 gap-2">
              {presetsByRegion[region]?.map((preset, presetIndex) => (
                <Tooltip key={presetIndex}>
                  <TooltipTrigger asChild>
                    <Link
                      className={cn(buttonVariants({ variant: "outline" }), 'text-wrap')}
                      key={presetIndex}
                      href={`/${preset.beforeIdentifier}/compareTo/${preset.afterIdentifier}`}
                    >
                      {preset.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    Comparing {preset.beforeIdentifier} to {preset.afterIdentifier}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
};
