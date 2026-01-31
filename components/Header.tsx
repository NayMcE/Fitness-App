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
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Activity className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Macci Fit Tracker</h1>
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/logs"
                className="flex items-center gap-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                title="View all logs"
              >
                <FileText className="w-5 h-5" />
                Logs
              </Link>
              <button
                onClick={handleSettingsClick}
                className="flex items-center gap-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogMetricsClick}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus className="w-5 h-5" />
                Log Metrics
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition lg:hidden"
              title="Menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
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
              className="flex items-center gap-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition w-full"
              title="View all logs"
            >
              <FileText className="w-5 h-5" />
              Logs
            </Link>
            <button
              onClick={handleSettingsClick}
              className="flex items-center gap-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition w-full"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button
              onClick={handleLogMetricsClick}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
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
