'use client'

import { TrendingDown, AlertTriangle, Plus } from 'lucide-react'

interface BloodType {
  type: string
  units: number
  demand: number
  expiringIn: string
  status: 'critical' | 'warning' | 'safe'
}

export default function BloodBankTab() {
  const bloodTypes: BloodType[] = [
    { type: 'O+', units: 120, demand: 35, expiringIn: '3 days', status: 'safe' },
    { type: 'O-', units: 45, demand: 28, expiringIn: '2 days', status: 'critical' },
    { type: 'A+', units: 110, demand: 22, expiringIn: '5 days', status: 'safe' },
    { type: 'A-', units: 30, demand: 15, expiringIn: '1 day', status: 'critical' },
    { type: 'B+', units: 95, demand: 18, expiringIn: '4 days', status: 'safe' },
    { type: 'B-', units: 25, demand: 10, expiringIn: '2 days', status: 'warning' },
    { type: 'AB+', units: 50, demand: 12, expiringIn: '3 days', status: 'safe' },
    { type: 'AB-', units: 15, demand: 8, expiringIn: '6 hours', status: 'critical' },
  ]

  const totalUnits = bloodTypes.reduce((sum, bt) => sum + bt.units, 0)
  const totalDemand = bloodTypes.reduce((sum, bt) => sum + bt.demand, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Units Available</p>
          <div className="text-3xl font-bold text-secondary">{totalUnits}</div>
          <p className="text-xs text-muted-foreground mt-2">Across all blood types</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Daily Demand</p>
          <div className="text-3xl font-bold text-accent">{totalDemand}</div>
          <p className="text-xs text-muted-foreground mt-2">Expected usage today</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Days Supply Left</p>
          <div className="text-3xl font-bold text-secondary">
            {Math.floor(totalUnits / (totalDemand || 1))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">At current demand rate</p>
        </div>
      </div>

      {/* Blood Types Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Blood Type</th>
                <th className="text-left px-4 py-3 font-semibold">Units</th>
                <th className="text-left px-4 py-3 font-semibold">Daily Demand</th>
                <th className="text-left px-4 py-3 font-semibold">Supply Left</th>
                <th className="text-left px-4 py-3 font-semibold">Expiring In</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bloodTypes.map((blood) => (
                <tr key={blood.type} className="hover:bg-muted/50 transition">
                  <td className="px-4 py-3 font-semibold text-foreground">{blood.type}</td>
                  <td className="px-4 py-3">
                    <span className="text-secondary font-semibold">{blood.units}</span>
                  </td>
                  <td className="px-4 py-3 text-accent">{blood.demand}</td>
                  <td className="px-4 py-3">
                    <span className={blood.units / blood.demand < 2 ? 'text-destructive font-semibold' : ''}>
                      {(blood.units / blood.demand).toFixed(1)} days
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{blood.expiringIn}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          blood.status === 'critical'
                            ? 'bg-destructive'
                            : blood.status === 'warning'
                              ? 'bg-accent'
                              : 'bg-secondary'
                        }`}
                      />
                      <span className="text-xs capitalize font-medium">{blood.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingDown size={20} className="text-accent" />
          AI Demand Predictions
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="font-semibold text-destructive flex items-center gap-2 mb-1">
              <AlertTriangle size={16} />
              Critical: O- and AB- Blood Running Low
            </p>
            <p className="text-sm text-muted-foreground">
              Predicted shortage in 6-12 hours. Immediate donor mobilization recommended.
            </p>
          </div>
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="font-semibold text-accent flex items-center gap-2 mb-1">
              <AlertTriangle size={16} />
              Warning: B- Type Declining
            </p>
            <p className="text-sm text-muted-foreground">
              Demand exceeding supply by 15%. Call 10+ donors to maintain safety stock.
            </p>
          </div>
          <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
            <p className="font-semibold text-secondary mb-1">Recommendation: Emergency Drive</p>
            <p className="text-sm text-muted-foreground">
              Schedule emergency blood drive for tomorrow. Focus on O-, A-, and AB- types.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition">
          <Plus size={18} />
          Add Blood Units
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition">
          <AlertTriangle size={18} />
          Emergency Mobilization
        </button>
      </div>
    </div>
  )
}
