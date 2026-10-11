import {
  APK_ASSET_NAME,
  fetchLatestRelease,
  isRemoteNewer,
  pickAsset,
  type GithubRelease,
} from "@tip/core";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system/legacy";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { ApkUpdater } from "../modules/apk-updater";

export type DownloadProgress = {
  percent: number;
  receivedMb: number;
  totalMb: number;
  speedMbps: number;
};

export type UpdateState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "current"; release: GithubRelease }
  | { status: "available"; release: GithubRelease; apkUrl?: string }
  | { status: "downloading"; progress: DownloadProgress; release: GithubRelease }
  | { status: "ready"; path: string; release: GithubRelease }
  | { status: "error"; message: string };

const localVersion =
  Constants.expoConfig?.version ?? Constants.nativeAppVersion ?? "1.0.0";

export function useAppUpdate(autoCheck = true) {
  const [state, setState] = useState<UpdateState>({ status: "idle" });

  const check = useCallback(async () => {
    setState({ status: "checking" });
    try {
      const release = await fetchLatestRelease();
      if (!isRemoteNewer(release.tag_name, localVersion)) {
        setState({ status: "current", release });
        return;
      }
      const apk = pickAsset(release, APK_ASSET_NAME);
      setState({
        status: "available",
        release,
        apkUrl: apk?.browser_download_url,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Update check failed.";
      setState({ status: "error", message });
    }
  }, []);

  const downloadAndInstall = useCallback(
    async (release: GithubRelease, apkUrl: string) => {
      if (Platform.OS !== "android") {
        setState({
          status: "error",
          message:
            "iOS cannot sideload APKs. Use TestFlight, the App Store, or download from the website.",
        });
        return;
      }
      const dest = `${FileSystem.cacheDirectory}Tip-Calculator.apk`;
      let lastBytes = 0;
      let lastAt = Date.now();
      const resumable = FileSystem.createDownloadResumable(
        apkUrl,
        dest,
        {},
        (progress) => {
          const received = progress.totalBytesWritten;
          const total = Math.max(progress.totalBytesExpectedToWrite, 1);
          const now = Date.now();
          const dt = Math.max((now - lastAt) / 1000, 0.2);
          const speedMbps = ((received - lastBytes) * 8) / dt / 1_000_000;
          lastBytes = received;
          lastAt = now;
          setState({
            status: "downloading",
            release,
            progress: {
              percent: Math.min(100, (received / total) * 100),
              receivedMb: received / 1_000_000,
              totalMb: total / 1_000_000,
              speedMbps,
            },
          });
        },
      );
      try {
        const result = await resumable.downloadAsync();
        const path = result?.uri?.replace("file://", "") ?? dest.replace("file://", "");
        const inspection = ApkUpdater.inspectApk(path);
        const expectedPackage = ApkUpdater.getInstalledPackageName();
        const expectedCert = ApkUpdater.getInstalledCertSha256();
        if (inspection.packageName !== expectedPackage) {
          throw new Error(
            `Package mismatch: ${inspection.packageName} vs ${expectedPackage}`,
          );
        }
        if (
          expectedCert &&
          inspection.certSha256 &&
          inspection.certSha256.toLowerCase() !== expectedCert.toLowerCase()
        ) {
          throw new Error(
            "Signing certificate SHA-256 does not match the installed app.",
          );
        }
        setState({ status: "ready", path, release });
        const allowed = await ApkUpdater.canRequestInstall();
        if (!allowed) {
          await ApkUpdater.openInstallPermissionSettings();
        }
        await ApkUpdater.installApk(path);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Download failed.";
        setState({ status: "error", message });
      }
    },
    [],
  );

  const saveToDownloads = useCallback(async (path: string) => {
    try {
      await ApkUpdater.saveToDownloads(path, APK_ASSET_NAME);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not save to Downloads.";
      setState({ status: "error", message });
    }
  }, []);

  useEffect(() => {
    if (autoCheck) {
      void check();
    }
  }, [autoCheck, check]);

  return {
    state,
    localVersion,
    check,
    downloadAndInstall,
    saveToDownloads,
  };
}
