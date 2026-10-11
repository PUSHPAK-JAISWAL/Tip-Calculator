import { WEB_APP_PATH } from "@tip/core";
import { Linking, Platform, Pressable, Text, View } from "react-native";
import { useAppUpdate } from "./useAppUpdate";

export function UpdatePanel() {
  const { state, localVersion, check, downloadAndInstall, saveToDownloads } =
    useAppUpdate(true);

  return (
    <View className="mt-8 rounded-[32px] border border-espresso/10 bg-espresso/[0.04] p-1.5">
      <View className="rounded-[26px] bg-foam p-6">
        <Text className="text-[10px] uppercase tracking-[2.2px] text-espresso/50">
          About / updates
        </Text>
        <Text className="mt-2 font-display text-2xl text-espresso">
          Tableside {localVersion}
        </Text>
        <Text className="mt-2 text-espresso/70">
          {Platform.OS === "ios"
            ? "iOS cannot install GitHub APKs. Version notes still come from Releases; install through TestFlight or the App Store."
            : "On launch we check GitHub Releases. If a newer tag exists, you can download Tip-Calculator.apk, verify the signing certificate, and install it."}
        </Text>

        <Pressable
          onPress={() => void check()}
          className="mt-5 self-start rounded-full bg-paper px-4 py-2"
        >
          <Text className="text-espresso">Check again</Text>
        </Pressable>

        {state.status === "checking" ? (
          <Text className="mt-4 text-espresso/60">Talking to GitHub…</Text>
        ) : null}
        {state.status === "current" ? (
          <Text className="mt-4 text-sage">You are on the latest release.</Text>
        ) : null}
        {state.status === "error" ? (
          <Text className="mt-4 text-rust">{state.message}</Text>
        ) : null}
        {state.status === "available" ? (
          <View className="mt-4">
            <Text className="font-display text-xl text-copper">
              {state.release.tag_name} is ready
            </Text>
            {state.release.body ? (
              <Text className="mt-2 text-espresso/70">{state.release.body}</Text>
            ) : null}
            {Platform.OS === "android" && state.apkUrl ? (
              <Pressable
                onPress={() => void downloadAndInstall(state.release, state.apkUrl!)}
                className="mt-4 self-start rounded-full bg-espresso px-5 py-3"
              >
                <Text className="text-foam">Update now</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => void Linking.openURL(WEB_APP_PATH.replace("/app/", "/"))}
                className="mt-4 self-start rounded-full bg-espresso px-5 py-3"
              >
                <Text className="text-foam">Open downloads site</Text>
              </Pressable>
            )}
          </View>
        ) : null}
        {state.status === "downloading" ? (
          <Text className="mt-4 text-espresso">
            {state.progress.percent.toFixed(0)}% ·{" "}
            {state.progress.receivedMb.toFixed(1)} /{" "}
            {state.progress.totalMb.toFixed(1)} MB ·{" "}
            {state.progress.speedMbps.toFixed(1)} Mbps
          </Text>
        ) : null}
        {state.status === "ready" ? (
          <Pressable
            onPress={() => void saveToDownloads(state.path)}
            className="mt-4 self-start rounded-full bg-paper px-5 py-3"
          >
            <Text className="text-espresso">Save to Downloads instead</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
