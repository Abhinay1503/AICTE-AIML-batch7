'use client'

import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  total?: string
  percentage?: number
  icon: LucideIcon
  trend: 'up' | 'down'
  color: 'primary' | 'secondary' | 'accent' | 'destructive'
}

export default function StatCard({
  title,
  value,
  total,
  percentage,
  icon: Icon,
  trend,
  color,
}: StatCardProps) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  }

  return (
    <div className={`rounded-lg border p-4 bg-card transition hover:shadow-lg ${colorMap[color]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon size={20} className={`text-${color}`} />
        </div>
        {percentage !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-secondary' : 'text-destructive'}`}>
            {percentage}%
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {total && <span className="text-sm text-muted-foreground">/ {total}</span>}
      </div>
    </div>
  )
}
