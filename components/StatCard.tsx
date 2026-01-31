'use client'

import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'stable'
}

export default function StatCard({ icon: Icon, label, value, change, trend }: StatCardProps) {
  const trendColor = trend === 'down' ? 'text-brand-teal' : trend === 'up' ? 'text-red-600' : 'text-brand-slate'
  const trendBg = trend === 'down' ? 'bg-brand-teal bg-opacity-10' : trend === 'up' ? 'bg-red-50' : 'bg-brand-light'

  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-teal">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-brand-slate text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-brand-dark mt-2">{value}</p>
          {change !== 0 && (
            <p className={`text-sm mt-2 ${trendColor}`}>
              {change > 0 ? '+' : ''}{change.toFixed(1)} {label.includes('Weight') ? 'lbs' : ''}
            </p>
          )}
        </div>
        <div className={`${trendBg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${trendColor}`} />
        </div>
      </div>
    </div>
  )
}
