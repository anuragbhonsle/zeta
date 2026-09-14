import { useExperiment } from "../context/ExperimentContext";
import { HiFunnel, HiSparkles, HiBeaker } from "react-icons/hi2";

export default function ExperimentResult() {
  const { experiment } = useExperiment();

  if (!experiment || experiment.status !== "complete") {
    return null;
  }

  return (
    <div className="w-full text-left rounded-2xl sm:rounded-3xl border border-zinc-800 bg-black p-4 sm:p-8 shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="mb-5 sm:mb-6 border-b border-zinc-800/80 pb-4 sm:pb-5">
        <h2 className="text-lg font-bold tracking-tight text-zinc-100 sm:text-2xl">
          Structured Experiment
        </h2>

        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-400">
          Your natural language hypothesis has been parsed into an executable
          quantitative experiment.
        </p>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="mb-4 sm:mb-6 grid grid-cols-2 gap-2.5 sm:gap-4">
        <div className="rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-black/95 p-3.5 sm:p-4 transition-colors hover:bg-zinc-900">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Instrument
          </p>
          <p className="mt-1 text-sm sm:text-base font-bold text-zinc-100 truncate">
            {experiment.instrument || "Not specified"}
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3.5 sm:p-4 transition-colors hover:bg-zinc-900">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Timeframe
          </p>
          <p className="mt-1 text-sm sm:text-base font-bold text-zinc-100 truncate">
            {experiment.timeframe || "Not specified"}
          </p>
        </div>
      </div>

      {/* Rules Breakdown */}
      <div className="space-y-3.5 sm:space-y-4">
        {/* Entry Condition */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5 sm:p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <HiSparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            Entry Condition
          </div>
          <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-zinc-200 break-words">
            {experiment.entryCondition || "Not specified"}
          </p>
        </div>

        {/* Exit Condition & Holding Period Grid */}
        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2">
          <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5 sm:p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Exit Condition
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-zinc-300 break-words">
              {experiment.exitCondition || "Not specified"}
            </p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5 sm:p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Holding Period
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-zinc-300 break-words">
              {experiment.holdingPeriod || "Not specified"}
            </p>
          </div>
        </div>

        {/* Filters */}
        {experiment.filters && experiment.filters.length > 0 && (
          <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5 sm:p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <HiFunnel className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              Regime Filters
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
              {experiment.filters.map((filter) => (
                <span
                  key={filter}
                  className="
                    inline-flex
                    items-center
                    rounded-lg
                    bg-zinc-800/80
                    px-2.5
                    py-1
                    text-[11px]
                    sm:text-xs
                    font-medium
                    text-zinc-200
                    ring-1
                    ring-zinc-700/60
                    break-all
                  "
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Objective */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-3.5 sm:p-4 text-white shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <HiBeaker className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            Research Objective
          </div>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-200 break-words">
            {experiment.objective}
          </p>
        </div>
      </div>
    </div>
  );
}
