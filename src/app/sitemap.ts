import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = await getProjects();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/company"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: absoluteUrl("/completed"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    }
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: project.updatedAt || project.createdAt || now.toISOString(),
    changeFrequency: project.status === "active" ? "weekly" : "monthly",
    priority: project.status === "active" ? 0.85 : 0.65
  }));

  return [...staticPages, ...projectPages];
}
