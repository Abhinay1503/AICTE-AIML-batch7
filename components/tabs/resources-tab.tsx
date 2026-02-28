'use client'

import { useState } from 'react'
import { Filter, Plus } from 'lucide-react'

interface Ward {
  id: string
  name: string
  totalBeds: number
  occupied: number
  available: number
  occupancyRate: number
  critical: number
}

export default function ResourcesTab() {
  const [selectedWard, setSelectedWard] = useState<string | null>(null)

  const wards: Ward[] = [
    { id: '1', name: 'General Ward A', totalBeds: 50, occupied: 42, available: 8, occupancyRate: 84, critical: 2 },
    { id: '2', name: 'General Ward B', totalBeds: 45, occupied: 38, available: 7, occupancyRate: 84, critical: 1 },
    { id: '3', name: 'ICU Level 1', totalBeds: 20, occupied: 18, available: 2, occupancyRate: 90, critical: 4 },
    { id: '4', name: 'ICU Level 2', totalBeds: 15, occupied: 12, available: 3, occupancyRate: 80, critical: 2 },
    { id: '5', name: 'Pediatric Ward', totalBeds: 30, occupied: 22, available: 8, occupancyRate: 73, critical: 1 },
    { id: '6', name: 'Maternity Ward', totalBeds: 25, occupied: 18, available: 7, occupancyRate: 72, critical: 0 },
  ]

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-muted-foreground" />
          <select className="px-4 py-2 border border-border rounded-lg bg-card text-foreground">
            <option>All Wards</option>
            <option>High Occupancy (&gt;80%)</option>
            <option>Critical Units</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition">
          <Plus size={18} />
          Add Bed
        </button>
      </div>

      {/* Wards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wards.map((ward) => (
          <div
            key={ward.id}
            onClick={() => setSelectedWard(ward.id)}
            className={`p-4 rounded-lg border cursor-pointer transition ${
              selectedWard === ward.id
                ? 'border-secondary bg-secondary/10 shadow-lg'
                : 'border-border bg-card hover:border-secondary/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{ward.name}</h3>
                <p className="text-xs text-muted-foreground">{ward.totalBeds} bed capacity</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-secondary">{ward.available}</div>
                <div className="text-xs text-muted-foreground">available</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Occupancy</span>
                <span className="font-semibold">{ward.occupancyRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    ward.occupancyRate > 85
                      ? 'bg-destructive'
                      : ward.occupancyRate > 75
                        ? 'bg-accent'
                        : 'bg-secondary'
                  }`}
                  style={{ width: `${ward.occupancyRate}%` }}
                />
              </div>
            </div>

            {/* Bed Details */}
            <div className="flex gap-3 text-sm">
              <div className="flex-1 bg-muted rounded px-2 py-1">
                <span className="text-muted-foreground text-xs">Occupied</span>
                <div className="font-semibold">{ward.occupied}</div>
              </div>
              <div className="flex-1 bg-secondary/10 rounded px-2 py-1">
                <span className="text-muted-foreground text-xs">Available</span>
                <div className="font-semibold text-secondary">{ward.available}</div>
              </div>
              {ward.critical > 0 && (
                <div className="flex-1 bg-destructive/10 rounded px-2 py-1">
                  <span className="text-muted-foreground text-xs">Critical</span>
                  <div className="font-semibold text-destructive">{ward.critical}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedWard && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {wards.find((w) => w.id === selectedWard)?.name} - Detailed Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Beds', value: wards.find((w) => w.id === selectedWard)?.totalBeds },
              { label: 'Occupied', value: wards.find((w) => w.id === selectedWard)?.occupied },
              { label: 'Available', value: wards.find((w) => w.id === selectedWard)?.available },
              { label: 'Critical', value: wards.find((w) => w.id === selectedWard)?.critical },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-secondary">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
