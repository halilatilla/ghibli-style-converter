import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GhibliThemeProvider } from "@/components/GhibliThemeContext";
import { Quicksand, Caveat } from "next/font/google";
import { JsonLd } from "./jsonld";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ghiblistyle-converter.vercel.app"), // Update with your actual domain
  title: {
    default: "GhibliStyle Converter - Transform Photos into Studio Ghibli Art",
    template: "%s | GhibliStyle Converter",
  },
  description:
    "Transform your photos into magical Studio Ghibli-style artwork using AI. Experience authentic hand-drawn anime aesthetics inspired by Miyazaki's masterpieces - Totoro, Spirited Away, Howl's Moving Castle, and more.",
  keywords: [
    "Studio Ghibli",
    "Ghibli style converter",
    "anime art generator",
    "AI image transformation",
    "Miyazaki art style",
    "Totoro filter",
    "Spirited Away style",
    "anime photo editor",
    "hand-drawn animation",
    "watercolor anime art",
    "Japanese animation style",
    "Ghibli aesthetic",
    "AI art generator",
    "photo to anime",
    "Ghibli filter",
  ],
  authors: [{ name: "GhibliStyle Team" }],
  creator: "GhibliStyle Converter",
  publisher: "GhibliStyle Converter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ghiblistyle-converter.vercel.app",
    title: "GhibliStyle Converter - Transform Photos into Studio Ghibli Art",
    description:
      "Transform your photos into magical Studio Ghibli-style artwork using AI. Choose from 5 iconic film themes: Totoro, Spirited Away, Howl's Moving Castle, Princess Mononoke, and Castle in the Sky.",
    siteName: "GhibliStyle Converter",
    images: [
      {
        url: "/og-image.png", // We'll create this
        width: 1200,
        height: 630,
        alt: "GhibliStyle Converter - AI-powered Ghibli art transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GhibliStyle Converter - Transform Photos into Studio Ghibli Art",
    description:
      "Transform your photos into magical Studio Ghibli-style artwork using AI. Experience authentic Miyazaki aesthetics.",
    images: ["/og-image.png"],
    creator: "@ghiblistyle", // Update with actual Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://ghiblistyle-converter.vercel.app",
  },
  category: "Art & Design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${quicksand.variable} ${caveat.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <GhibliThemeProvider>{children}</GhibliThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
