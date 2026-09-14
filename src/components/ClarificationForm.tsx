import { useExperiment } from "../context/ExperimentContext";
import { HiSparkles } from "react-icons/hi2";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && allAnswered && !isBuilding) {
      e.preventDefault();
      buildExperiment();
    }
  };

  return (
    <div className="w-full text-left rounded-2xl sm:rounded-3xl border border-zinc-800 bg-black/95 p-4 sm:p-8 shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="mb-5 sm:mb-6 border-b border-zinc-800/80 pb-4 sm:pb-5">
        <h2 className="text-lg font-bold tracking-tight text-zinc-100 sm:text-2xl">
          Almost there.
        </h2>

        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-400">
          We need a few details before we can build this experiment.
        </p>
      </div>

      {/* Questions Form */}
      <div className="space-y-5 sm:space-y-6">
        {experiment.missingInformation.map((question) => {
          const fieldId = `clarification-${question.replace(/\s+/g, "-").toLowerCase()}`;

          return (
            <div key={question} className="group relative space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <label
                  htmlFor={fieldId}
                  className="text-xs sm:text-sm font-medium text-zinc-200 transition-colors group-focus-within:text-white cursor-pointer"
                >
                  {question}
                </label>
              </div>

              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                {getExample(question)}
              </p>

              <input
                id={fieldId}
                type="text"
                value={clarifications[question] || ""}
                onChange={(e) => setClarification(question, e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your answer..."
                autoCapitalize="none"
                autoCorrect="off"
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/60
                  px-3.5
                  py-2.5
                  sm:px-4
                  sm:py-3
                  text-base
                  sm:text-sm
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
        type="button"
        onClick={buildExperiment}
        disabled={!allAnswered || isBuilding}
        className="
          mt-6
          sm:mt-7
          relative
          w-full
          overflow-hidden
          rounded-xl
          bg-zinc-100
          text-zinc-900
          py-3
          sm:py-3.5
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
