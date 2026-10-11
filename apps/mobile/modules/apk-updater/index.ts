import { Platform } from "react-native";
import ApkUpdaterNative from "./src/ApkUpdaterModule";

export type ApkInspection = {
  packageName: string;
  certSha256: string;
};

function unsupported(): never {
  throw new Error("APK install helpers are only available on Android.");
}

export const ApkUpdater = {
  isAndroid: Platform.OS === "android",

  getInstalledPackageName(): string {
    if (Platform.OS !== "android") return "";
    return ApkUpdaterNative.getInstalledPackageName();
  },

  getInstalledCertSha256(): string {
    if (Platform.OS !== "android") return "";
    return ApkUpdaterNative.getInstalledCertSha256();
  },

  inspectApk(path: string): ApkInspection {
    if (Platform.OS !== "android") unsupported();
    return ApkUpdaterNative.inspectApk(path);
  },

  canRequestInstall(): Promise<boolean> {
    if (Platform.OS !== "android") return Promise.resolve(false);
    return ApkUpdaterNative.canRequestInstall();
  },

  openInstallPermissionSettings(): Promise<void> {
    if (Platform.OS !== "android") return Promise.resolve();
    return ApkUpdaterNative.openInstallPermissionSettings();
  },

  installApk(path: string): Promise<void> {
    if (Platform.OS !== "android") unsupported();
    return ApkUpdaterNative.installApk(path);
  },

  saveToDownloads(path: string, filename: string): Promise<string> {
    if (Platform.OS !== "android") unsupported();
    return ApkUpdaterNative.saveToDownloads(path, filename);
  },
};
