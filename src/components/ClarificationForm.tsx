import { useExperiment } from "../context/ExperimentContext";
import { HiSparkles, HiCheck } from "react-icons/hi2";

export default function ClarificationForm() {
  const {
    experiment,
    clarifications,
    isBuilding,
    setClarification,
    buildExperiment,
  } = useExperiment();

  if (
    !experiment ||
    experiment.status !== "needs_clarification" ||
    experiment.missingInformation.length === 0
  ) {
    return null;
  }

  const allAnswered = experiment.missingInformation.every((question) =>
    clarifications[question]?.trim(),
  );

  const getExample = (question: string) => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("volatility")) {
      return "e.g. VIX above 25, ATR above its 20-day average";
    }

    if (
      lowerQuestion.includes("exit") ||
      lowerQuestion.includes("holding period")
    ) {
      return "e.g. exit when VIX falls below 20, or hold for 5 trading days";
    }

    if (lowerQuestion.includes("entry")) {
      return "e.g. enter when the 20-day moving average crosses above the 50-day moving average";
    }

    return "e.g. specify the value, condition, or rule you want to use";
  };

  return (
    <div className="w-full text-left rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="mb-6 border-b border-zinc-800/80 pb-5">
        <h2 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
          Almost there.
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-zinc-400">
          We need a few details before we can build this experiment.
        </p>
      </div>

      {/* Questions Form */}
      <div className="space-y-6">
        {experiment.missingInformation.map((question, index) => {
          const isFilled = Boolean(clarifications[question]?.trim());

          return (
            <div key={index} className="group relative space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-200 transition-colors group-focus-within:text-white">
                  {question}
                </label>

                {isFilled && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/50">
                    <HiCheck className="h-3 w-3 text-emerald-400" />
                    Completed
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                {getExample(question)}
              </p>

              <input
                type="text"
                value={clarifications[question] || ""}
                onChange={(e) => setClarification(question, e.target.value)}
                placeholder="Enter your answer..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/60
                  px-4
                  py-3
                  text-sm
                  text-zinc-100
                  placeholder:text-zinc-500
                  outline-none
                  transition-all
                  duration-150
                  hover:border-zinc-700
                  focus:bg-zinc-900
                  focus:border-zinc-100
                  focus:ring-4
                  focus:ring-zinc-100/10
                "
              />
            </div>
          );
        })}
      </div>

      {/* Build Button */}
      <button
        onClick={buildExperiment}
        disabled={!allAnswered || isBuilding}
        className="
          mt-7
          relative
          w-full
          overflow-hidden
          rounded-xl
          bg-zinc-100
          text-zinc-900
          py-3.5
          text-sm
          font-semibold
          shadow-md
          transition-all
          duration-150
          hover:bg-white
          hover:shadow-lg
          active:scale-[0.99]
          disabled:opacity-30
          disabled:cursor-not-allowed
          disabled:hover:bg-zinc-100
          disabled:active:scale-100
        "
      >
        <span className="flex items-center justify-center gap-2">
          {isBuilding ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-zinc-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Building...</span>
            </>
          ) : (
            <>
              <HiSparkles className="h-4 w-4 text-emerald-600" />
              <span>Build experiment</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
