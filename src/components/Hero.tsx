import { GooeyInput } from "./ui/gooey-input";
import { useExperiment } from "../context/ExperimentContext";
import ClarificationForm from "./ClarificationForm";
import ExperimentResult from "./ExperimentResult";
import { BackgroundLines } from "./ui/background-lines";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.1,
    },
  },
};

const dynamicSectionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function Hero() {
  const { prompt, experiment, isBuilding, setPrompt, submitPrompt } =
    useExperiment();

  return (
    <>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 overflow-hidden">
        <section
          className="
            relative
            w-full
            min-h-screen
            lg:min-h-135
            mt-4 mb-20
            flex
            flex-col
            items-center
            justify-start
            pt-20 sm:pt-32
            px-2 sm:px-4
            text-zinc-900
            selection:bg-black
            selection:text-white
          "
        >
          {/* Animated Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              relative
              z-10
              flex
              flex-col
              items-center
              mx-auto
              gap-8 sm:gap-10
              max-w-xl
              text-center
              w-full
            "
          >
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="
                font-bold
                text-4xl
                sm:text-5xl
                lg:text-7xl
                tracking-tight
                text-black
                w-full
              "
            >
              Ask the{" "}
              <span
                className="
                  text-emerald-500
                  tracking-wide
                  inline-block
                "
              >
                Market
              </span>
              <br />a Question.
            </motion.h1>

            {/* Input */}
            <motion.div
              variants={itemVariants}
              className="w-full flex justify-center items-start min-h-15"
            >
              <GooeyInput
                value={prompt}
                onValueChange={setPrompt}
                onSubmit={submitPrompt}
              />
            </motion.div>

            {/* Smooth Layout Height Adjuster */}
            <motion.div
              layout
              transition={{
                layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              className="w-full relative flex flex-col items-center"
            >
              <AnimatePresence mode="wait">
                {/* Skeleton Loader */}
                {isBuilding && !experiment?.status && (
                  <motion.div
                    key="skeleton"
                    layout
                    variants={dynamicSectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-md mx-auto p-6 bg-zinc-50/50 border border-zinc-200/80 rounded-2xl space-y-4 animate-pulse shadow-sm"
                  >
                    <div className="h-5 bg-zinc-200 rounded-md w-1/3 mx-auto"></div>
                    <div className="space-y-2 pt-2">
                      <div className="h-4 bg-zinc-200 rounded w-full"></div>
                      <div className="h-4 bg-zinc-200 rounded w-4/5 mx-auto"></div>
                    </div>
                  </motion.div>
                )}

                {/* Clarifications */}
                {experiment?.status === "needs_clarification" && (
                  <motion.div
                    key="clarification"
                    layout
                    variants={dynamicSectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <ClarificationForm />
                  </motion.div>
                )}

                {/* Completed experiment */}
                {experiment?.status === "complete" && (
                  <motion.div
                    key="complete"
                    layout
                    variants={dynamicSectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <ExperimentResult />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>
      </BackgroundLines>
    </>
  );
}
