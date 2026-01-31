import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Macci Fit Tracker',
  description: 'Track your daily fitness metrics',
  icons: {
    icon: '/activity-icon.svg',
    apple: '/activity-icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Macci Fit Tracker',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
