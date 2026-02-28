'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface QuickChartProps {
  title: string
  data: any[]
}

export default function QuickChart({ title, data }: QuickChartProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="time" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: `1px solid var(--border)`,
              borderRadius: '0.5rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="beds"
            stroke="var(--secondary)"
            strokeWidth={2}
            dot={false}
            name="Beds"
          />
          <Line
            type="monotone"
            dataKey="icu"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={false}
            name="ICU"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
