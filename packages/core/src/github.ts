export const GITHUB_REPO = "PUSHPAK-JAISWAL/Tip-Calculator";
export const GITHUB_RELEASES_LATEST = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
export const APK_ASSET_NAME = "Tip-Calculator.apk";
export const IPA_ASSET_NAME = "Tip-Calculator.ipa";
export const PAGES_ORIGIN = `https://pushpak-jaiswal.github.io/Tip-Calculator`;
export const WEB_APP_PATH = `${PAGES_ORIGIN}/app/`;

export type GithubAsset = {
  name: string;
  browser_download_url: string;
  size: number;
  content_type: string;
};

export type GithubRelease = {
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  assets: GithubAsset[];
};

export function pickAsset(
  release: GithubRelease,
  filename: string,
): GithubAsset | undefined {
  const exact = release.assets.find((asset) => asset.name === filename);
  if (exact) return exact;
  const lower = filename.toLowerCase();
  return release.assets.find((asset) => asset.name.toLowerCase() === lower);
}

export async function fetchLatestRelease(
  fetcher: typeof fetch = fetch,
): Promise<GithubRelease> {
  const response = await fetcher(GITHUB_RELEASES_LATEST, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (response.status === 404) {
    throw new Error("No GitHub release has been published yet.");
  }
  if (!response.ok) {
    throw new Error(`GitHub releases request failed (${response.status}).`);
  }
  return (await response.json()) as GithubRelease;
}
