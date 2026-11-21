import type { MetadataRoute } from "next";
import { enderecoDoSite } from "./lib/site";

// o /robots.txt: o que os robôs de busca podem visitar (o painel e a conta não interessam a eles)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/painel", "/conta"] },
    sitemap: `${enderecoDoSite}/sitemap.xml`,
  };
}
