export type TipInput = {
  bill: number;
  tipPercent: number;
  people: number;
};

export type TipBreakdown = {
  bill: number;
  tipPercent: number;
  people: number;
  tip: number;
  total: number;
  perPerson: number;
  tipPerPerson: number;
  billPerPerson: number;
};

export const TIP_PRESETS = [10, 12, 15, 18, 20, 25] as const;

export function parseAmount(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return 0;
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

export function calculateTip(input: TipInput): TipBreakdown {
  const bill = Number.isFinite(input.bill) ? Math.max(0, input.bill) : 0;
  const tipPercent = Number.isFinite(input.tipPercent)
    ? Math.min(100, Math.max(0, input.tipPercent))
    : 0;
  const people = Number.isFinite(input.people)
    ? Math.max(1, Math.floor(input.people))
    : 1;
  const tip = roundMoney(bill * (tipPercent / 100));
  const total = roundMoney(bill + tip);
  return {
    bill: roundMoney(bill),
    tipPercent,
    people,
    tip,
    total,
    perPerson: roundMoney(total / people),
    tipPerPerson: roundMoney(tip / people),
    billPerPerson: roundMoney(bill / people),
  };
}

export function formatMoney(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
