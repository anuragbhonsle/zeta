import { motion, type Variants } from "framer-motion";
import { HiCpuChip, HiChartBarSquare, HiShieldCheck } from "react-icons/hi2";

// Stagger parent container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Smooth reveal item variant
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0,
    },
  },
};

export default function About() {
  const highlights = [
    {
      icon: HiCpuChip,
      title: "Natural Language Interface",
      description:
        "Describe a trading idea in plain English. Zeta converts it into structured, executable parameters ready for rigorous testing.",
    },
    {
      icon: HiChartBarSquare,
      title: "Historical Backtesting",
      description:
        "Run experiments against deep historical market data to instantly evaluate returns, win rate, expectancy, and maximum drawdown.",
    },
    {
      icon: HiShieldCheck,
      title: "Clarification Engine",
      description:
        "When a trading query is incomplete or ambiguous, Zeta asks targeted follow-up questions instead of making unsafe assumptions.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden  px-6 py-28 text-zinc-900">
      {/* Decorative Ambient Background Blur */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-125 w-150 -translate-x-1/2 rounded-full" />

      <motion.div
        className="mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Section Heading */}
        <motion.div variants={itemVariants} className="max-w-3xl">
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-5xl">
            Turning raw market intuition into{" "}
            <span className="text-emerald-500">reproducible experiments.</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            Zeta is a next-generation research interface built to bridge the gap
            between financial ideas and quantitative validation. Instead of
            writing custom scripts for every single hypothesis, state your
            objective in plain English and let Zeta handle the structuring.
          </p>
        </motion.div>

        {/* Core Capabilities Cards */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
              Core Capabilities
            </h3>
          </div>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-8 shadow-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5"
                >
                  <div>
                    {/* Icon Container */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-500 shadow-sm ring-1 ring-zinc-200/60 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:ring-emerald-500">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h4 className="mt-6 text-lg font-bold text-zinc-900">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Philosophy / Approach Banner */}
        <motion.div
          variants={itemVariants}
          className="mt-16 rounded-3xl border border-zinc-900/10 bg-black p-8 text-white sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Pattern Background */}
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-black blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Our Methodology
            </span>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Precision over assumptions.
            </h3>

            <p className="mt-4 text-base leading-relaxed text-zinc-300">
              The goal is not to replace quantitative research, but to
              accelerate the path to conviction. Every Zeta experiment specifies
              explicit parameters, constraints, and statistical metrics,
              ensuring every result can be verified and audited.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
