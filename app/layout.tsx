import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Macci Fit Tracker',
  description: 'Track your daily fitness metrics',
  icons: {
    icon: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
