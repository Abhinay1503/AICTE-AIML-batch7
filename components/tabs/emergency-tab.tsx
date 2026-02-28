'use client'

import { Zap, Brain, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function EmergencyTab() {
  const [selectedScenario, setSelectedScenario] = useState<string>('mass-casualty')

  const scenarios = [
    {
      id: 'mass-casualty',
      name: 'Mass Casualty Event',
      description: 'Multi-vehicle accident with 50+ patients',
      aiRecommendations: [
        'Activate Level-1 Emergency Response Protocol',
        'Free up 80+ beds across general wards (recommend early discharge of stable patients)',
        'Pre-mobilize 200+ units of blood (priority: O+, O-, A+)',
        'Alert all surgical teams - expect 30+ OR cases',
        'Recall off-duty staff - recommend 40+ additional personnel',
        'Prepare trauma units for shock and critical care management',
      ],
      estimatedImpact: 'Bed availability drops from 42 to 8 in 30 minutes',
    },
    {
      id: 'pandemic',
      name: 'Disease Outbreak',
      description: 'Sudden spike in respiratory infections',
      aiRecommendations: [
        'Activate infection control protocols immediately',
        'Isolate 45+ patients in ICU units with negative pressure rooms',
        'Increase PPE supply allocation by 300%',
        'Set up screening checkpoints at all entry points',
        'Reduce elective surgeries by 50% to free resources',
        'Prepare ICU for 80% occupancy surge',
      ],
      estimatedImpact: 'ICU beds fill in 2-4 hours',
    },
    {
      id: 'staff-shortage',
      name: 'Staff Shortage Crisis',
      description: 'Unexpected loss of 20% medical staff',
      aiRecommendations: [
        'Redistribute remaining staff to critical departments first',
        'Call contractors for emergency staffing',
        'Reduce non-critical procedures by 60%',
        'Extend shift hours for available staff (monitor burnout)',
        'Pause elective admissions temporarily',
        'Activate inter-hospital resource sharing network',
      ],
      estimatedImpact: 'Service capacity reduced to 65% temporarily',
    },
    {
      id: 'equipment-failure',
      name: 'Critical Equipment Failure',
      description: 'Multiple ventilators offline, imaging system down',
      aiRecommendations: [
        'Prepare alternative ventilation protocols (bagging, manual)',
        'Redirect critical imaging cases to partner hospitals',
        'Increase monitoring frequency for ventilator-dependent patients',
        'Call equipment vendor for emergency repair',
        'Move ICU patients to other units if necessary',
        'Establish communication channels with backup facilities',
      ],
      estimatedImpact: 'ICU capacity reduced by 40%, imaging delayed',
    },
  ]

  const current = scenarios.find((s) => s.id === selectedScenario) || scenarios[0]

  return (
    <div className="space-y-6">
      {/* Emergency Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            className={`p-4 rounded-lg border text-left transition ${
              selectedScenario === scenario.id
                ? 'border-secondary bg-secondary/10 shadow-lg'
                : 'border-border bg-card hover:border-secondary/50'
            }`}
          >
            <h3 className="font-semibold text-foreground">{scenario.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
          </button>
        ))}
      </div>

      {/* Current Scenario Details */}
      <div className="space-y-4">
        {/* Scenario Header */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent rounded-lg">
              <Zap size={24} className="text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{current.name}</h2>
              <p className="text-muted-foreground mt-1">{current.description}</p>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain size={24} className="text-secondary" />
            <h3 className="text-lg font-semibold">AI-Powered Recommendations</h3>
          </div>

          <div className="space-y-3">
            {current.aiRecommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <CheckCircle size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Impact */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="text-destructive flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Estimated Impact</h3>
              <p className="text-sm text-foreground">{current.estimatedImpact}</p>
            </div>
          </div>
        </div>

        {/* Resource Planning */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users size={24} className="text-secondary" />
            <h3 className="text-lg font-semibold">Resource Planning</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Beds Required</p>
              <p className="text-2xl font-bold text-secondary">45-80</p>
              <p className="text-xs text-muted-foreground mt-1">Current availability: 42</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Staff Needed</p>
              <p className="text-2xl font-bold text-accent">35-50</p>
              <p className="text-xs text-muted-foreground mt-1">Currently available: 120</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Blood Units</p>
              <p className="text-2xl font-bold text-secondary">200+</p>
              <p className="text-xs text-muted-foreground mt-1">Current stock: 356</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">OR Capacity</p>
              <p className="text-2xl font-bold text-secondary">8-10</p>
              <p className="text-xs text-muted-foreground mt-1">Available ORs: 6</p>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Immediate Action Items</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition font-medium">
              Activate Emergency Protocol
            </button>
            <button className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition font-medium">
              Alert Key Personnel
            </button>
            <button className="w-full px-4 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition font-medium">
              Contact Partner Hospitals
            </button>
            <button className="w-full px-4 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition font-medium">
              Begin Resource Mobilization
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
