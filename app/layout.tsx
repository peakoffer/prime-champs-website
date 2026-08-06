import type { Metadata } from "next";
import { headers } from "next/headers";
import { Barlow_Condensed, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { productionUrl } from "./seo";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const utility = IBM_Plex_Mono({
  variable: "--font-utility",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "www.prime-champs.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Prime Champs | Athlete Partnerships & Brand Campaigns",
      template: "%s | Prime Champs",
    },
    description:
      "Prime Champs helps athletes stand out, meet the right brands, and manage partnerships from first call to final post.",
    applicationName: "Prime Champs",
    category: "Sports marketing",
    creator: "Prime Champs",
    publisher: "VisionWave Agency LLC",
    verification: {
      other: {
        "facebook-domain-verification": "bp4x2jjm9vk4t7nersc48k7aatsr39",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      url: origin,
      siteName: "Prime Champs",
      title: "Prime Champs | Turn performance into momentum.",
      description:
        "Brand opportunities and partnership support for modern athletes.",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Prime Champs — Turn performance into momentum.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Prime Champs | Turn performance into momentum.",
      description:
        "Brand opportunities and partnership support for modern athletes.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prime Champs",
    legalName: "VisionWave Agency LLC",
    url: productionUrl,
    logo: `${productionUrl}/brand/prime-champs-wordmark-dark.png`,
    description:
      "Athlete representation, brand partnerships, and sports campaign support.",
    email: "info@prime-champs.com",
    sameAs: ["https://www.instagram.com/primechamps"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Prime Champs",
    url: productionUrl,
    publisher: { "@id": `${productionUrl}/#organization` },
  };

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${utility.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              { ...organizationSchema, "@id": `${productionUrl}/#organization` },
              websiteSchema,
            ]).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
