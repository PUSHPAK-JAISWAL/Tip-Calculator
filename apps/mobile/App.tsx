import {
  Fraunces_700Bold,
  Fraunces_700Bold_Italic,
  useFonts as useFraunces,
} from "@expo-google-fonts/fraunces";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  useFonts as useOutfit,
} from "@expo-google-fonts/outfit";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TipCalculator } from "./src/TipCalculator";
import { UpdatePanel } from "./src/UpdatePanel";

export default function App() {
  const [fraunces] = useFraunces({
    Fraunces_700Bold,
    Fraunces_700Bold_Italic,
  });
  const [outfit] = useOutfit({ Outfit_400Regular, Outfit_500Medium });

  if (!fraunces || !outfit) {
    return <View className="flex-1 bg-cream" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-cream">
        <StatusBar style="dark" />
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-4 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-8 self-start rounded-full border border-espresso/10 bg-foam px-3 py-2">
            <Text className="text-[11px] font-sans-medium uppercase tracking-[2.4px] text-espresso">
              Tableside
            </Text>
          </View>
          <Text className="mb-2 text-[10px] uppercase tracking-[2.2px] text-rust">
            Hospitality math
          </Text>
          <Text className="font-display text-5xl leading-[0.95] tracking-tight text-espresso">
            Split the check.
          </Text>
          <Text className="mt-2 font-display-italic text-4xl text-copper">
            Keep the evening.
          </Text>
          <Text className="mt-4 mb-8 max-w-sm text-base leading-6 text-espresso/70">
            A quiet calculator for noisy tables. Same cream-and-copper surface as
            the website.
          </Text>
          <TipCalculator />
          <UpdatePanel />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
