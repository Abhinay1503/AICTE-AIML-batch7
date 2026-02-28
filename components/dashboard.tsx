'use client'

import { useEffect, useState } from 'react'
import { Menu, X, RefreshCw, Bell, Settings, LogOut } from 'lucide-react'
import OverviewTab from './tabs/overview-tab'
import ResourcesTab from './tabs/resources-tab'
import BloodBankTab from './tabs/blood-bank-tab'
import AlertsTab from './tabs/alerts-tab'
import EmergencyTab from './tabs/emergency-tab'

interface User {
  email: string
  userType: 'user' | 'management'
}

interface DashboardProps {
  activeTab: 'overview' | 'resources' | 'blood-bank' | 'alerts' | 'emergency'
  user: User
  onLogout: () => void
}

export default function Dashboard({ activeTab, user, onLogout }: DashboardProps) {
  const [time, setTime] = useState<string>('')
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <>
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Smart Hospital Resource Manager</h2>
          <p className="text-sm text-muted-foreground">AI-Powered Real-Time Management System</p>
        </div>
        <div className="absolute right-6 flex items-center gap-6">
          <div className="text-right">
            <div className="text-lg font-semibold">{time}</div>
            <div className="text-xs text-muted-foreground">Last updated: Now</div>
          </div>
          
          {/* Three Dot Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Menu"
            >
              {showMenu ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>

            {/* Menu Dropdown */}
            {showMenu && (
              <>
                {/* Backdrop to close menu */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />
                
                <div className="absolute right-0 top-full mt-3 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3 border-b border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Quick Actions</p>
                  </div>

                  {/* Main Menu Items */}
                  <div className="divide-y divide-border">
                    <button
                      onClick={handleRefresh}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left text-sm font-medium hover:text-primary group"
                    >
                      <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-300" />
                      <span>Refresh Data</span>
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left text-sm font-medium hover:text-primary"
                    >
                      <Bell size={18} />
                      <span>Notifications</span>
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left text-sm font-medium hover:text-primary"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="bg-muted/30 px-4 py-3 border-t-2 border-border">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'resources' && <ResourcesTab />}
          {activeTab === 'blood-bank' && <BloodBankTab />}
          {activeTab === 'alerts' && <AlertsTab />}
          {activeTab === 'emergency' && <EmergencyTab />}
        </div>
      </main>
    </>
  )
}
