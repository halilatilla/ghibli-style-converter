import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GhibliStyle Converter",
  description: "Transform your photos into Studio Ghibli style artwork",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
