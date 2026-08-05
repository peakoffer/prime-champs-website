import type { Metadata } from "next";
import { headers } from "next/headers";
import { Barlow_Condensed, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

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
      "Prime Champs connects athletes with brands and platforms, supporting positioning, introductions, negotiation, and campaign growth.",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      url: origin,
      siteName: "Prime Champs",
      title: "Prime Champs | Turn performance into pull.",
      description:
        "Athlete partnerships and brand campaigns built for the pace of modern sports culture.",
      images: [
        {
          url: socialImage,
          width: 1731,
          height: 909,
          alt: "Prime Champs — Turn performance into pull.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Prime Champs | Turn performance into pull.",
      description:
        "Athlete partnerships and brand campaigns built for the pace of modern sports culture.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${utility.variable}`}>
        {children}
      </body>
    </html>
  );
}
