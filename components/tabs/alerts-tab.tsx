'use client'

import { AlertTriangle, AlertCircle, Info, CheckCircle, Clock, X } from 'lucide-react'
import { useState } from 'react'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  ward?: string
  action?: string
}

export default function AlertsTab() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Blood Shortage - O- Type',
      message: 'O- blood units critically low. Only 45 units left. Predicted shortage in 6 hours.',
      timestamp: '2 minutes ago',
      ward: 'Blood Bank',
      action: 'Emergency Mobilization',
    },
    {
      id: '2',
      type: 'critical',
      title: 'ICU Level 1 at Capacity',
      message: '18 out of 20 beds occupied. One critical patient pending. Recommend early discharge review.',
      timestamp: '15 minutes ago',
      ward: 'ICU Level 1',
      action: 'Manage Beds',
    },
    {
      id: '3',
      type: 'warning',
      title: 'High Occupancy Predicted',
      message: 'AI forecast shows 85% bed occupancy between 2-4 PM today. Prepare 10 additional beds.',
      timestamp: '45 minutes ago',
      ward: 'General Wards',
      action: 'Prepare',
    },
    {
      id: '4',
      type: 'warning',
      title: 'Equipment Maintenance Due',
      message: '3 ventilators require scheduled maintenance this week. Plan accordingly.',
      timestamp: '1 hour ago',
      ward: 'ICU Level 2',
      action: 'Schedule',
    },
    {
      id: '5',
      type: 'info',
      title: 'Staff Schedule Updated',
      message: 'New shift rotation has been applied for this week. All staff notified.',
      timestamp: '3 hours ago',
      ward: 'Admin',
    },
    {
      id: '6',
      type: 'info',
      title: 'System Backup Completed',
      message: 'Daily system backup completed successfully. No data loss detected.',
      timestamp: '5 hours ago',
      ward: 'System',
    },
  ])

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle size={20} className="text-destructive" />
      case 'warning':
        return <AlertCircle size={20} className="text-accent" />
      case 'info':
        return <Info size={20} className="text-secondary" />
    }
  }

  const getBgColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-destructive/10 border-destructive/20'
      case 'warning':
        return 'bg-accent/10 border-accent/20'
      case 'info':
        return 'bg-secondary/10 border-secondary/20'
    }
  }

  const criticalCount = alerts.filter((a) => a.type === 'critical').length
  const warningCount = alerts.filter((a) => a.type === 'warning').length

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Critical Alerts</p>
          <div className="text-3xl font-bold text-destructive">{criticalCount}</div>
          <p className="text-xs text-muted-foreground mt-2">Require immediate action</p>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Warnings</p>
          <div className="text-3xl font-bold text-accent">{warningCount}</div>
          <p className="text-xs text-muted-foreground mt-2">Require attention</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Alerts</p>
          <div className="text-3xl font-bold text-secondary">{alerts.length}</div>
          <p className="text-xs text-muted-foreground mt-2">This 24-hour period</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle size={48} className="mx-auto text-secondary mb-4 opacity-50" />
            <p className="text-lg font-semibold text-muted-foreground">All Clear!</p>
            <p className="text-sm text-muted-foreground">No active alerts at this time.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 flex items-start gap-4 transition ${getBgColor(alert.type)}`}
            >
              {getIcon(alert.type)}

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={14} />
                        {alert.timestamp}
                      </div>
                      {alert.ward && (
                        <div className="px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                          {alert.ward}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition"
                  >
                    <X size={18} className="text-muted-foreground" />
                  </button>
                </div>

                {alert.action && (
                  <button className="mt-3 px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:opacity-90 transition">
                    {alert.action}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Alert Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm">Critical alerts enabled</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm">Warning alerts enabled</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-sm">Info alerts enabled</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm">Sound notifications</span>
          </label>
        </div>
      </div>
    </div>
  )
}
