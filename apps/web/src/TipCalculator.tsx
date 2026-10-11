import { Minus, Plus, Users } from "@phosphor-icons/react";
import {
  calculateTip,
  formatMoney,
  parseAmount,
  TIP_PRESETS,
} from "@tip/core";
import { useMemo, useState } from "react";

export function TipCalculator() {
  const [billRaw, setBillRaw] = useState("86.00");
  const [tipPercent, setTipPercent] = useState(20);
  const [customTip, setCustomTip] = useState(false);
  const [people, setPeople] = useState(2);

  const result = useMemo(
    () =>
      calculateTip({
        bill: parseAmount(billRaw),
        tipPercent,
        people,
      }),
    [billRaw, people, tipPercent],
  );

  return (
    <div className="rounded-[2rem] border border-espresso/10 bg-espresso/[0.04] p-1.5">
      <div className="rounded-[calc(2rem-0.375rem)] bg-foam p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-espresso/50">
              Check total
            </p>
            <label className="sr-only" htmlFor="bill">
              Bill amount
            </label>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl text-copper">$</span>
              <input
                id="bill"
                inputMode="decimal"
                value={billRaw}
                onChange={(event) => setBillRaw(event.target.value)}
                className="w-full bg-transparent font-display text-5xl tracking-[-0.04em] outline-none md:text-6xl"
              />
            </div>
          </div>
          <div className="hidden rounded-full border border-espresso/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-espresso/55 sm:block">
            USD
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-espresso/50">
              Gratuity
            </p>
            <p className="font-display text-2xl italic text-copper">{tipPercent}%</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIP_PRESETS.map((preset) => {
              const active = !customTip && tipPercent === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setCustomTip(false);
                    setTipPercent(preset);
                  }}
                  className={`rounded-full px-4 py-2 text-sm transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                    active
                      ? "bg-espresso text-foam"
                      : "border border-espresso/10 bg-paper text-espresso"
                  }`}
                >
                  {preset}%
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setCustomTip(true)}
              className={`rounded-full px-4 py-2 text-sm ${
                customTip
                  ? "bg-copper text-foam"
                  : "border border-espresso/10 bg-paper"
              }`}
            >
              Custom
            </button>
          </div>
          {customTip ? (
            <input
              aria-label="Custom tip percent"
              type="range"
              min={0}
              max={40}
              value={tipPercent}
              onChange={(event) => setTipPercent(Number(event.target.value))}
              className="mt-4 w-full accent-copper"
            />
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between rounded-[1.4rem] border border-espresso/10 bg-paper p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso/90 text-foam">
              <Users size={18} weight="light" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-espresso/50">
                Guests
              </p>
              <p className="font-display text-xl">{people}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Fewer guests"
              onClick={() => setPeople((value) => Math.max(1, value - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-foam transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              <Minus size={16} weight="light" />
            </button>
            <button
              type="button"
              aria-label="More guests"
              onClick={() => setPeople((value) => Math.min(20, value + 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-foam transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              <Plus size={16} weight="light" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="Tip" value={formatMoney(result.tip)} />
          <Stat label="Total" value={formatMoney(result.total)} accent />
          <Stat label="Each" value={formatMoney(result.perPerson)} />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.4rem] p-4 ${
        accent ? "bg-espresso text-foam" : "bg-paper text-espresso"
      }`}
    >
      <p
        className={`text-[10px] uppercase tracking-[0.2em] ${
          accent ? "text-foam/55" : "text-espresso/50"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 font-display text-2xl tracking-[-0.03em]">{value}</p>
    </div>
  );
}
