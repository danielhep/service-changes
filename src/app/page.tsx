import FeedSelector from "./feed-selector";
import { PresetSelector } from "./preset-selector";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-4 max-w-xl m-auto">
      <h1 className="text-4xl font-bold">
        What is <span className="text-purple-500">What the Bus?</span>
      </h1>
      <p className="text-xl">
        Analyze transit service or compare two feeds to see how they have changed over time.
      </p>
      <p>Begin with a preset that corresponds to the most recent/upcoming service change or manually select your inputs below.</p>
      <div>
        <PresetSelector />
      </div>
      <div>
        <FeedSelector />
      </div>
    </div>
  );
}