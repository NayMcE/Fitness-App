'use client'

import { useState } from 'react'
import { Menu, X, FileText, Settings, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  onLogsClick?: () => void
  onSettingsClick?: () => void
  onLogMetricsClick?: () => void
}

export default function Header({ onLogsClick, onSettingsClick, onLogMetricsClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogsClick = () => {
    onLogsClick?.()
    setMenuOpen(false)
  }

  const handleSettingsClick = () => {
    onSettingsClick?.()
    setMenuOpen(false)
  }

  const handleLogMetricsClick = () => {
    onLogMetricsClick?.()
    setMenuOpen(false)
  }

  return (
    <header className="bg-brand-dark shadow w-full">
      <Link href="/" className="flex items-center hover:opacity-80 transition w-full">
        <Image 
          src="/Macci (3).png" 
          alt="Macci Fit Tracker Logo" 
          width={200} 
          height={80}
          className="w-full h-auto object-cover"
          priority
        />
      </Link>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/logs"
              className="flex items-center gap-2 bg-brand-slate text-brand-light px-4 py-2 rounded-lg hover:bg-brand-teal hover:text-brand-dark transition"
              title="View all logs"
            >
              <FileText className="w-5 h-5" />
              Logs
            </Link>
            <button
              onClick={handleSettingsClick}
              className="flex items-center gap-2 bg-brand-slate text-brand-light px-4 py-2 rounded-lg hover:bg-brand-teal hover:text-brand-dark transition"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogMetricsClick}
              className="flex items-center gap-2 bg-brand-teal text-brand-dark px-4 py-2 rounded-lg hover:bg-brand-teal hover:opacity-80 transition"
            >
              <Plus className="w-5 h-5" />
              Log Metrics
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-brand-slate rounded-lg transition lg:hidden"
            title="Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-brand-light" />
            ) : (
              <Menu className="w-6 h-6 text-brand-light" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 space-y-2 pb-4">
            <Link
              href="/logs"
              onClick={handleLogsClick}
              className="flex items-center gap-2 bg-brand-slate text-brand-light px-4 py-2 rounded-lg hover:bg-brand-teal hover:text-brand-dark transition w-full"
              title="View all logs"
            >
              <FileText className="w-5 h-5" />
              Logs
            </Link>
            <button
              onClick={handleSettingsClick}
              className="flex items-center gap-2 bg-brand-slate text-brand-light px-4 py-2 rounded-lg hover:bg-brand-teal hover:text-brand-dark transition w-full"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button
              onClick={handleLogMetricsClick}
              className="flex items-center gap-2 bg-brand-teal text-brand-dark px-4 py-2 rounded-lg hover:bg-brand-teal hover:opacity-80 transition w-full"
            >
              <Plus className="w-5 h-5" />
              Log Metrics
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
