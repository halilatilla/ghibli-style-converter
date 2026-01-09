import type { Metadata } from "next";
import { Caveat, Quicksand } from "next/font/google";
import { Toaster } from "sonner";
import CustomCursor from "@/components/CustomCursor";
import GhibliFilters from "@/components/GhibliFilters";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GhibliThemeProvider } from "@/features/theme/hooks/useGhibliTheme";
import { PerformanceProvider } from "@/hooks/usePerformanceMode";
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
  metadataBase: new URL("https://ghiblistyle-converter.vercel.app"),
  title: {
    default: "GhibliStyle Converter - Become a Miyazaki Character",
    template: "%s | GhibliStyle Converter",
  },
  description:
    "Transform yourself into a Studio Ghibli character using AI. Turn your photos into Miyazaki-style anime characters from Spirited Away, Totoro, Howl's Moving Castle, Princess Mononoke, and Kiki's Delivery Service.",
  keywords: [
    "Studio Ghibli",
    "Ghibli character creator",
    "Miyazaki character",
    "anime character generator",
    "AI image transformation",
    "Miyazaki art style",
    "Spirited Away character",
    "Totoro style character",
    "anime character maker",
    "Ghibli avatar creator",
    "photo to anime character",
    "Ghibli filter",
    "become anime character",
    "AI character transformation",
    "Ghibli style portrait",
    "anime character converter",
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
    title: "GhibliStyle Converter - Become a Miyazaki Character",
    description:
      "Transform yourself into a Studio Ghibli character using AI. Choose from 5 iconic film styles: Spirited Away, Totoro, Howl's Moving Castle, Princess Mononoke, and Kiki's Delivery Service.",
    siteName: "GhibliStyle Converter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GhibliStyle Converter - Turn your photo into a Miyazaki character",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GhibliStyle Converter - Become a Miyazaki Character",
    description:
      "Transform yourself into a Studio Ghibli character using AI. Experience becoming a Miyazaki anime character from your favorite films.",
    images: ["/og-image.png"],
    creator: "@ghiblistyle",
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
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
  //   ],
  //   apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  // },
  // manifest: "/manifest.json",
  alternates: {
    canonical: "https://ghiblistyle-converter.vercel.app",
  },
  category: "Art & Design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`${quicksand.variable} ${caveat.variable} font-sans antialiased`}>
        <ThemeProvider>
          <PerformanceProvider>
            <GhibliThemeProvider>
              <GhibliFilters />
              <CustomCursor />
              {children}
              <Toaster
                position="top-center"
                closeButton
                richColors
                theme="dark"
                toastOptions={{
                  style: {
                    background: "rgba(15, 23, 42, 0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "1rem",
                    fontFamily: "var(--font-quicksand)",
                  },
                  className: "ghibli-toast",
                }}
              />
            </GhibliThemeProvider>
          </PerformanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
