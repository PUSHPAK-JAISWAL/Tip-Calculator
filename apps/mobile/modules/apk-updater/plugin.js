const { withAndroidManifest } = require("expo/config-plugins");

function withApkUpdater(config) {
  return withAndroidManifest(config, (mod) => {
    const manifest = mod.modResults.manifest;
    const permissions = manifest["uses-permission"] ?? [];
    const hasInstall = permissions.some(
      (item) =>
        item.$?.["android:name"] === "android.permission.REQUEST_INSTALL_PACKAGES",
    );
    if (!hasInstall) {
      permissions.push({
        $: { "android:name": "android.permission.REQUEST_INSTALL_PACKAGES" },
      });
      manifest["uses-permission"] = permissions;
    }
    return mod;
  });
}

module.exports = withApkUpdater;
