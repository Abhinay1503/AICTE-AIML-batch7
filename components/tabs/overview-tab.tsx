'use client'

import { TrendingUp, AlertTriangle, Activity, Zap } from 'lucide-react'
import StatCard from '../stat-card'
import QuickChart from '../charts/quick-chart'

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Available Beds"
          value="42"
          total="200"
          percentage={21}
          icon={Activity}
          trend="up"
          color="secondary"
        />
        <StatCard
          title="ICU Units"
          value="8"
          total="50"
          percentage={16}
          icon={Zap}
          trend="up"
          color="accent"
        />
        <StatCard
          title="Blood Units"
          value="156"
          total="500"
          percentage={31}
          icon={TrendingUp}
          trend="down"
          color="secondary"
        />
        <StatCard
          title="Critical Alerts"
          value="3"
          total={0}
          percentage={0}
          icon={AlertTriangle}
          trend="down"
          color="destructive"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickChart
          title="Bed Occupancy Trend"
          data={[
            { time: '12 AM', beds: 145, icu: 35 },
            { time: '4 AM', beds: 138, icu: 32 },
            { time: '8 AM', beds: 165, icu: 40 },
            { time: '12 PM', beds: 178, icu: 42 },
            { time: '4 PM', beds: 158, icu: 38 },
            { time: '8 PM', beds: 152, icu: 36 },
          ]}
        />
        <QuickChart
          title="Blood Bank Inventory"
          data={[
            { time: 'O+', beds: 120, icu: 0 },
            { time: 'O-', beds: 95, icu: 0 },
            { time: 'A+', beds: 110, icu: 0 },
            { time: 'A-', beds: 70, icu: 0 },
            { time: 'B+', beds: 100, icu: 0 },
            { time: 'AB+', beds: 65, icu: 0 },
          ]}
        />
      </div>

      {/* AI Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">AI Insights & Predictions</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-secondary pl-4 py-2">
            <p className="font-medium text-secondary">Predicted Peak Hour</p>
            <p className="text-sm text-muted-foreground">Expected high occupancy between 2-4 PM. Recommend prepping 10 additional beds.</p>
          </div>
          <div className="border-l-4 border-accent pl-4 py-2">
            <p className="font-medium text-accent">Blood Shortage Alert</p>
            <p className="text-sm text-muted-foreground">O- blood units dropping fast. Recommend emergency call for donors.</p>
          </div>
          <div className="border-l-4 border-secondary pl-4 py-2">
            <p className="font-medium text-secondary">Staff Optimization</p>
            <p className="text-sm text-muted-foreground">Recommend reducing ICU staff by 2 units during off-peak hours (10 PM - 6 AM).</p>
          </div>
        </div>
      </div>
    </div>
  )
}
