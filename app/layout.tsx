import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Nunito } from "next/font/google"
import "./globals.css"

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "GhibliStyle Converter",
  description: "Transform your photos into Studio Ghibli style artwork",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
