import type { Metadata } from "next";

export const productionUrl = "https://www.prime-champs.com";

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const canonical = `${productionUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | Prime Champs`,
      description,
      siteName: "Prime Champs",
      images: [
        {
          url: "/og.png",
          width: 1731,
          height: 909,
          alt: "Prime Champs — Turn performance into pull.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Prime Champs`,
      description,
      images: ["/og.png"],
    },
  };
}
