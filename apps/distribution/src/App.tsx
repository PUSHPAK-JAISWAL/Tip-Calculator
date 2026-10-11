import {
  AndroidLogo,
  AppleLogo,
  ArrowUpRight,
  ForkKnife,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { ReleaseDownloads } from "./ReleaseDownloads";

const ease = [0.32, 0.72, 0, 1] as const;

export default function App() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-cream text-espresso">
      <div className="grain" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
        style={{
          background:
            "radial-gradient(ellipse at 80% -10%, rgba(184,92,56,0.18), transparent 46%), radial-gradient(ellipse at 0% 20%, rgba(92,107,82,0.12), transparent 40%)",
        }}
      />

      <header className="relative mx-auto mt-6 flex w-max items-center gap-3 rounded-full border border-espresso/10 bg-foam/80 px-3 py-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso text-foam">
          <ForkKnife size={18} weight="light" />
        </span>
        <span className="pr-3 text-[11px] font-medium uppercase tracking-[0.22em]">
          Tableside
        </span>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <p className="mb-5 inline-flex rounded-full border border-espresso/10 bg-paper px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-rust">
            Product story
          </p>
          <h1 className="font-display text-[clamp(3.2rem,9vw,6.4rem)] leading-[0.9] tracking-[-0.045em]">
            Built for the last
            <span className="block italic text-copper">ten minutes of dinner.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso/75">
            Tableside is a tip calculator with one job: get out of the way. The
            same cream-and-copper surface lives on the web and in the Expo app,
            so the check looks familiar whether you open a browser or a phone.
          </p>
          <a
            href={`${import.meta.env.BASE_URL}app/`}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-espresso px-5 py-3 text-foam transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            Open the calculator
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px">
              <ArrowUpRight size={16} weight="light" />
            </span>
          </a>
        </motion.section>

        <section className="mt-20 grid gap-4 md:grid-cols-12">
          <article className="rounded-[2rem] border border-espresso/10 bg-espresso/[0.04] p-1.5 md:col-span-7">
            <div className="h-full rounded-[calc(2rem-0.375rem)] bg-foam p-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-espresso/45">
                Why it exists
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.03em]">
                No dashboards. No accounts.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-espresso/70">
                Most tip apps dress up a three-line formula like a fintech
                product. Tableside keeps the math on the tablecloth: bill,
                gratuity, guests. Sideload Android builds come from this repo’s
                GitHub Releases — our own app, delivered over the air, not a
                store bypass for anyone else’s software.
              </p>
            </div>
          </article>
          <article className="rounded-[2rem] border border-espresso/10 bg-espresso p-8 text-foam md:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-foam/50">
              Surfaces
            </p>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-3">
                <AndroidLogo size={22} weight="light" />
                <span>Android APK from the latest GitHub Release, with in-app updates.</span>
              </li>
              <li className="flex gap-3">
                <AppleLogo size={22} weight="light" />
                <span>iOS TestFlight or App Store when signing secrets exist; no sideload install path.</span>
              </li>
            </ul>
          </article>
        </section>

        <ReleaseDownloads />
      </main>
    </div>
  );
}
