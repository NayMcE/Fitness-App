'use client'

import { useState } from 'react'
import { Activity, Menu, X, FileText, Settings, Plus } from 'lucide-react'
import Link from 'next/link'

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
    <header className="bg-brand-dark shadow">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Activity className="w-8 h-8 text-brand-teal" />
            <h1 className="text-3xl font-bold text-brand-light">Macci Fit Tracker</h1>
          </Link>

          <div className="flex items-center gap-2">
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
