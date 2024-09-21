import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { type Preset, presets } from "~/data/presets";

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
      {Object.keys(presetsByRegion).map((region, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-sm mb-2 text-left">{region}:</h2>
          <div className="grid grid-cols-3 gap-2">
            {presetsByRegion[region]?.map((preset, presetIndex) => (
              <Link
                className={buttonVariants({ variant: "outline" })}
                key={presetIndex}
                href={`/${preset.beforeIdentifier}/compareTo/${preset.afterIdentifier}`}
              >{preset.name}</Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
