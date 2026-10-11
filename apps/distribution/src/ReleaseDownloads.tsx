import { DownloadSimple } from "@phosphor-icons/react";
import {
  APK_ASSET_NAME,
  fetchLatestRelease,
  IPA_ASSET_NAME,
  pickAsset,
  type GithubRelease,
} from "@tip/core";
import { useEffect, useState } from "react";

type Status =
  | { kind: "loading" }
  | { kind: "empty"; message: string }
  | { kind: "ready"; release: GithubRelease }
  | { kind: "error"; message: string };

export function ReleaseDownloads() {
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchLatestRelease()
      .then((release) => {
        if (!cancelled) setStatus({ kind: "ready", release });
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Could not load releases.";
        if (!cancelled) {
          setStatus(
            message.includes("No GitHub release")
              ? { kind: "empty", message }
              : { kind: "error", message },
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mt-16 rounded-[2rem] border border-espresso/10 bg-espresso/[0.04] p-1.5">
      <div className="rounded-[calc(2rem-0.375rem)] bg-foam p-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-espresso/45">
          Downloads
        </p>
        <h2 className="mt-3 font-display text-4xl tracking-[-0.03em]">
          Latest GitHub Release
        </h2>
        <p className="mt-3 max-w-2xl text-espresso/70">
          Files are pulled live from{" "}
          <code className="text-sm">PUSHPAK-JAISWAL/Tip-Calculator</code>{" "}
          releases. Tag a version to publish an APK named{" "}
          <code className="text-sm">{APK_ASSET_NAME}</code>.
        </p>

        {status.kind === "loading" ? (
          <p className="mt-8 text-espresso/60">Checking GitHub…</p>
        ) : null}
        {status.kind === "empty" || status.kind === "error" ? (
          <p className="mt-8 text-espresso/70">{status.message}</p>
        ) : null}
        {status.kind === "ready" ? (
          <AssetList release={status.release} />
        ) : null}
      </div>
    </section>
  );
}

function AssetList({ release }: { release: GithubRelease }) {
  const apk = pickAsset(release, APK_ASSET_NAME);
  const ipa = pickAsset(release, IPA_ASSET_NAME);

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <DownloadCard
        title="Android APK"
        href={apk?.browser_download_url}
        meta={apk ? formatSize(apk.size) : "Not attached to this release"}
        tag={release.tag_name}
      />
      <DownloadCard
        title="iOS IPA"
        href={ipa?.browser_download_url}
        meta={
          ipa
            ? formatSize(ipa.size)
            : "No IPA yet — iOS needs Apple signing secrets in Actions"
        }
        tag={release.tag_name}
      />
      {release.body ? (
        <article className="md:col-span-2 rounded-[1.4rem] bg-paper p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-espresso/45">
            Notes · {release.name ?? release.tag_name}
          </p>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-espresso/75">
            {release.body}
          </pre>
        </article>
      ) : null}
    </div>
  );
}

function DownloadCard({
  title,
  href,
  meta,
  tag,
}: {
  title: string;
  href?: string;
  meta: string;
  tag: string;
}) {
  const disabled = !href;
  const className =
    "group flex items-center justify-between rounded-[1.4rem] p-5 text-left transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]";
  const inner = (
    <>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-foam/55">
          {tag}
        </p>
        <p className="mt-2 font-display text-2xl">{title}</p>
        <p className="mt-1 text-sm text-foam/70">{meta}</p>
      </div>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
        <DownloadSimple size={18} weight="light" />
      </span>
    </>
  );

  if (disabled) {
    return (
      <div className={`${className} bg-espresso/40 text-foam`}>{inner}</div>
    );
  }
  return (
    <a href={href} className={`${className} bg-espresso text-foam`}>
      {inner}
    </a>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
