import { ArrowUpRight, ForkKnife } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { TipCalculator } from "./TipCalculator";

const ease = [0.32, 0.72, 0, 1] as const;

export default function App() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-cream text-espresso">
      <div className="grain" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 12% 0%, rgba(184,92,56,0.16), transparent 50%), radial-gradient(ellipse at 88% 10%, rgba(92,107,82,0.14), transparent 46%)",
        }}
      />

      <header className="relative mx-auto mt-6 flex w-max items-center gap-3 rounded-full border border-espresso/10 bg-foam/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso text-foam">
          <ForkKnife size={18} weight="light" />
        </span>
        <span className="pr-3 text-[11px] font-medium uppercase tracking-[0.22em]">
          Tableside
        </span>
      </header>

      <main className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="md:col-span-5"
        >
          <p className="mb-5 inline-flex rounded-full border border-espresso/10 bg-paper px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-rust">
            Hospitality math
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,5.6rem)] leading-[0.92] tracking-[-0.04em]">
            Split the check.
            <span className="mt-2 block italic text-copper">Keep the evening.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-espresso/75">
            A quiet calculator for noisy tables. Bill, tip, and the number of
            guests — nothing else competing for the candlelight.
          </p>
          <a
            href="../"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-espresso px-5 py-3 text-foam transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            Product story
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px">
              <ArrowUpRight size={16} weight="light" />
            </span>
          </a>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.08, ease }}
          className="md:col-span-7"
        >
          <TipCalculator />
        </motion.div>
      </main>
    </div>
  );
}
