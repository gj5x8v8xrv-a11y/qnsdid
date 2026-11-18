export type ProjectPageMeta = {
  youtubeUrl: string;
  modelHouseAddress: string;
  siteAddress: string;
  sectionOrder: string[];
};

const META_PREFIX = "[[PROJECT_PAGE_META:";
const META_SUFFIX = "]]";

export const DEFAULT_PROJECT_SECTION_ORDER = [
  "premium",
  "location",
  "site_plan",
  "floor_plan",
  "community",
  "gallery"
];

export function parseProjectPageMeta(value: string | null | undefined) {
  const source = value || "";
  const start = source.lastIndexOf(META_PREFIX);

  if (start < 0 || !source.endsWith(META_SUFFIX)) {
    return {
      content: source.trim(),
      meta: {
        youtubeUrl: "",
        modelHouseAddress: "",
        siteAddress: "",
        sectionOrder: DEFAULT_PROJECT_SECTION_ORDER
      } satisfies ProjectPageMeta
    };
  }

  const encoded = source.slice(start + META_PREFIX.length, -META_SUFFIX.length);
  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Partial<ProjectPageMeta>;
    return {
      content: source.slice(0, start).trim(),
      meta: {
        youtubeUrl: parsed.youtubeUrl || "",
        modelHouseAddress: parsed.modelHouseAddress || "",
        siteAddress: parsed.siteAddress || "",
        sectionOrder: Array.isArray(parsed.sectionOrder) && parsed.sectionOrder.length
          ? parsed.sectionOrder
          : DEFAULT_PROJECT_SECTION_ORDER
      } satisfies ProjectPageMeta
    };
  } catch {
    return {
      content: source.trim(),
      meta: {
        youtubeUrl: "",
        modelHouseAddress: "",
        siteAddress: "",
        sectionOrder: DEFAULT_PROJECT_SECTION_ORDER
      } satisfies ProjectPageMeta
    };
  }
}

export function serializeProjectPageMeta(content: string, meta: ProjectPageMeta) {
  const encoded = Buffer.from(JSON.stringify(meta), "utf8").toString("base64url");
  return `${content.trim()}\n\n${META_PREFIX}${encoded}${META_SUFFIX}`;
}

export function getYoutubeEmbedUrl(value: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    let videoId = "";
    if (url.hostname === "youtu.be") videoId = url.pathname.slice(1);
    if (url.hostname.includes("youtube.com")) {
      videoId = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop() || "";
    }
    return /^[A-Za-z0-9_-]{6,}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : null;
  } catch {
    return null;
  }
}
