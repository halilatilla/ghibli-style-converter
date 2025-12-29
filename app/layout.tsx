import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

export const metadata: Metadata = {
  title: "GhibliStyle Converter",
  description: "Transform your photos into Studio Ghibli style artwork",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
