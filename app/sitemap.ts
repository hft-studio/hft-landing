import type { MetadataRoute } from "next";

const siteUrl = "https://www.hftlabs.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/platform", priority: 0.8, changeFrequency: "weekly" },
    { path: "/ignition", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
