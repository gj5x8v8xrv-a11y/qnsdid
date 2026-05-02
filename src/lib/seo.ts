import type { Metadata } from "next";

import { absoluteUrl, getProjectAddressLine, getProjectRegion, getSiteConfig, summarizeText } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/lib/types";

export function buildRootMetadata(): Metadata {
  const site = getSiteConfig();

  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: `${site.companyName} | ${site.companyTagline}`,
      template: `%s | ${site.companyName}`
    },
    description: site.companyDescription,
    openGraph: {
      title: `${site.companyName} | ${site.companyTagline}`,
      description: site.companyDescription,
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
      ? `${site.companyName}에서 소개하는 현재 상담 가능한 분양 현장을 확인해보세요.`
      : `${site.companyName}에서 소개해온 완료 현장을 지역별로 확인해보세요.`;

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
  const addressLine = getProjectAddressLine(project);
  const description = summarizeText(
    `${getProjectRegion(project)} ${addressLine} ${project.premiumSummary} ${project.locationDescription}`,
    150
  );

  return {
    title: `${project.name} ${project.status === "active" ? "분양 정보" : "분양완료 정보"}`,
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
