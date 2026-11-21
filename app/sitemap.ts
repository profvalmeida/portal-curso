import type { MetadataRoute } from "next";
import { listarParaOSitemap } from "./dados/noticias";
import { enderecoDoSite } from "./lib/site";

// o mapa do site, em /sitemap.xml: a lista de endereços que o Google deve visitar
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const noticias = await listarParaOSitemap();
  return [
    { url: enderecoDoSite, changeFrequency: "hourly", priority: 1 },
    ...noticias.map((noticia) => ({
      url: `${enderecoDoSite}/noticias/${noticia.slug}`,
      lastModified: noticia.publicada_em,
    })),
  ];
}
