import type { Metadata } from "next";

import { absoluteUrl, getSiteConfig, summarizeText } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/lib/types";

export function buildRootMetadata(): Metadata {
  const site = getSiteConfig();
  const title = `${site.companyName} | 분양 현장 안내`;
  const description =
    "분양중인 현장과 소개가 완료된 현장을 함께 살펴보고, 관심 있는 현장은 편하게 문의하실 수 있습니다.";

  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: title,
      template: `%s | ${site.companyName}`
    },
    description,
    openGraph: {
      title,
      description,
      url: site.siteUrl,
      siteName: site.companyName,
      locale: "ko_KR",
      type: "website"
    },
    alternates: {
      canonical: site.siteUrl
    }
  };
}

export function buildProjectsMetadata(
  status: ProjectStatus,
  pathname = status === "active" ? "/projects" : "/completed"
): Metadata {
  const site = getSiteConfig();
  const title = status === "active" ? "분양중 현장" : "분양완료 현장";
  const description =
    status === "active"
      ? `${site.companyName}에서 현재 살펴보실 수 있는 분양 현장을 확인해보세요.`
      : `${site.companyName}에서 지금까지 소개해온 현장을 확인해보세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(pathname)
    },
    openGraph: {
      title: `${title} | ${site.companyName}`,
      description,
      url: absoluteUrl(pathname)
    }
  };
}

export function buildProjectMetadata(project: Project): Metadata {
  const site = getSiteConfig();
  const description = summarizeText(
    `${project.location} ${project.premiumSummary} ${project.locationDescription}`,
    150
  );

  return {
    title: `${project.name} ${project.status === "active" ? "안내" : "소개 완료"}`,
    description,
    alternates: {
      canonical: absoluteUrl(`/projects/${project.slug}`)
    },
    openGraph: {
      title: `${project.name} | ${site.companyName}`,
      description,
      url: absoluteUrl(`/projects/${project.slug}`),
      images: project.coverImageUrl ? [project.coverImageUrl] : undefined
    }
  };
}
