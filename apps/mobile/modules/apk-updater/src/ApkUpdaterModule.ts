import { NativeModule, requireNativeModule } from "expo";
import { Platform } from "react-native";

type ApkUpdaterNativeModule = NativeModule & {
  getInstalledPackageName(): string;
  getInstalledCertSha256(): string;
  inspectApk(path: string): { packageName: string; certSha256: string };
  canRequestInstall(): Promise<boolean>;
  openInstallPermissionSettings(): Promise<void>;
  installApk(path: string): Promise<void>;
  saveToDownloads(path: string, filename: string): Promise<string>;
};

const fallback: ApkUpdaterNativeModule = {
  getInstalledPackageName: () => "",
  getInstalledCertSha256: () => "",
  inspectApk: () => ({ packageName: "", certSha256: "" }),
  canRequestInstall: async () => false,
  openInstallPermissionSettings: async () => undefined,
  installApk: async () => undefined,
  saveToDownloads: async () => "",
} as ApkUpdaterNativeModule;

function loadNative(): ApkUpdaterNativeModule {
  if (Platform.OS !== "android") return fallback;
  try {
    return requireNativeModule<ApkUpdaterNativeModule>("ApkUpdater");
  } catch {
    return fallback;
  }
}

export default loadNative();
