export function normalizeTag(tag: string): string {
  return tag.trim().replace(/^v/i, "");
}

function parts(tag: string): [number, number, number] {
  const core = normalizeTag(tag).split("-")[0] ?? "0.0.0";
  const [major, minor, patch] = core.split(".").map((piece) => {
    const n = Number.parseInt(piece, 10);
    return Number.isFinite(n) ? n : 0;
  });
  return [major ?? 0, minor ?? 0, patch ?? 0];
}

export function compareSemver(a: string, b: string): number {
  const left = parts(a);
  const right = parts(b);
  for (let i = 0; i < 3; i += 1) {
    if (left[i] > right[i]) return 1;
    if (left[i] < right[i]) return -1;
  }
  return 0;
}

export function isRemoteNewer(remoteTag: string, localVersion: string): boolean {
  return compareSemver(remoteTag, localVersion) > 0;
}
