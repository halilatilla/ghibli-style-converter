import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import { GhibliThemeProvider } from "@/components/GhibliThemeContext"
import { Quicksand, Caveat } from "next/font/google"
import "./globals.css"

const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "GhibliStyle Converter",
  description: "Transform your photos into Studio Ghibli style artwork",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.variable} ${caveat.variable} font-sans antialiased`}>
        <ThemeProvider>
          <GhibliThemeProvider>
            {children}
          </GhibliThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
