import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/cosmic'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  return {
    title: siteSettings?.metadata?.site_title || 'Neural Nexus - Free Sci-Fi Thriller Ebook',
    description: siteSettings?.metadata?.site_description || 'Read Neural Nexus, a gripping sci-fi thriller about neural interfaces, corporate espionage, and digital consciousness.',
    viewport: 'width=device-width, initial-scale=1',
    themeColor: siteSettings?.metadata?.primary_color || '#00ffff',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}