import {
  calculateTip,
  formatMoney,
  parseAmount,
  TIP_PRESETS,
} from "@tip/core";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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
    <View className="rounded-[32px] border border-espresso/10 bg-espresso/5 p-1.5">
      <View className="rounded-[26px] bg-foam p-6">
        <Text className="text-[10px] uppercase tracking-[2.2px] text-espresso/50">
          Check total
        </Text>
        <View className="mt-2 flex-row items-baseline">
          <Text className="font-display text-3xl text-copper">$</Text>
          <TextInput
            accessibilityLabel="Bill amount"
            keyboardType="decimal-pad"
            value={billRaw}
            onChangeText={setBillRaw}
            className="ml-2 flex-1 font-display text-5xl tracking-tight text-espresso"
          />
        </View>

        <View className="mt-8 flex-row items-center justify-between">
          <Text className="text-[10px] uppercase tracking-[2.2px] text-espresso/50">
            Gratuity
          </Text>
          <Text className="font-display-italic text-2xl text-copper">
            {tipPercent}%
          </Text>
        </View>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {TIP_PRESETS.map((preset) => {
            const active = !customTip && tipPercent === preset;
            return (
              <Pressable
                key={preset}
                onPress={() => {
                  setCustomTip(false);
                  setTipPercent(preset);
                }}
                className={`rounded-full px-4 py-2 ${
                  active ? "bg-espresso" : "border border-espresso/10 bg-paper"
                }`}
              >
                <Text className={active ? "text-foam" : "text-espresso"}>
                  {preset}%
                </Text>
              </Pressable>
            );
          })}
          <Pressable
            onPress={() => setCustomTip(true)}
            className={`rounded-full px-4 py-2 ${
              customTip ? "bg-copper" : "border border-espresso/10 bg-paper"
            }`}
          >
            <Text className={customTip ? "text-foam" : "text-espresso"}>
              Custom
            </Text>
          </Pressable>
        </View>
        {customTip ? (
          <TextInput
            accessibilityLabel="Custom tip percent"
            keyboardType="number-pad"
            value={String(tipPercent)}
            onChangeText={(value) =>
              setTipPercent(Math.min(40, Math.max(0, Number(value) || 0)))
            }
            className="mt-4 rounded-full bg-paper px-4 py-3 font-sans text-espresso"
          />
        ) : null}

        <View className="mt-8 flex-row items-center justify-between rounded-[22px] border border-espresso/10 bg-paper p-4">
          <View>
            <Text className="text-[10px] uppercase tracking-[2px] text-espresso/50">
              Guests
            </Text>
            <Text className="font-display text-xl text-espresso">{people}</Text>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              accessibilityLabel="Fewer guests"
              onPress={() => setPeople((value) => Math.max(1, value - 1))}
              className="h-11 w-11 items-center justify-center rounded-full bg-foam"
            >
              <Text className="text-xl text-espresso">-</Text>
            </Pressable>
            <Pressable
              accessibilityLabel="More guests"
              onPress={() => setPeople((value) => Math.min(20, value + 1))}
              className="h-11 w-11 items-center justify-center rounded-full bg-espresso"
            >
              <Text className="text-xl text-foam">+</Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-8 flex-row gap-3">
          <Stat label="Tip" value={formatMoney(result.tip)} />
          <Stat label="Total" value={formatMoney(result.total)} accent />
          <Stat label="Each" value={formatMoney(result.perPerson)} />
        </View>
      </View>
    </View>
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
    <View className={`flex-1 rounded-[22px] p-3 ${accent ? "bg-espresso" : "bg-paper"}`}>
      <Text
        className={`text-[10px] uppercase tracking-[2px] ${
          accent ? "text-foam/60" : "text-espresso/50"
        }`}
      >
        {label}
      </Text>
      <Text
        className={`mt-2 font-display text-lg ${accent ? "text-foam" : "text-espresso"}`}
      >
        {value}
      </Text>
    </View>
  );
}
