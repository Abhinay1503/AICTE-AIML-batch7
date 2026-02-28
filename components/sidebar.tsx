'use client'

import { Menu, X, Home, Bed, Droplet, AlertCircle, Zap, LogOut } from 'lucide-react'

interface User {
  email: string
  userType: 'user' | 'management'
}

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: 'overview' | 'resources' | 'blood-bank' | 'alerts' | 'emergency') => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  user: User
  onLogout: () => void
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, user, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'resources', label: 'Bed & ICU Tracking', icon: Bed },
    { id: 'blood-bank', label: 'Blood Bank', icon: Droplet },
    { id: 'alerts', label: 'Alert System', icon: AlertCircle },
    { id: 'emergency', label: 'Emergency Support', icon: Zap },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen bg-primary text-primary-foreground flex flex-col transition-transform duration-300 z-40 lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 pt-10 lg:pt-6 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-lg">
              ⚕️
            </div>
            <div>
              <h1 className="text-xl font-bold">MediFlow</h1>
              <p className="text-xs text-primary-foreground/70">Hospital AI Manager</p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Main Navigation */}
          <nav className="space-y-1">
            <p className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide px-4 py-2">Main Menu</p>
            {menuItems.slice(0, 2).map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Resources Section */}
          <nav className="space-y-1">
            <p className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide px-4 py-2">Resources</p>
            {menuItems.slice(2, 3).map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Operations Section */}
          <nav className="space-y-1">
            <p className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wide px-4 py-2">Operations</p>
            {menuItems.slice(3, 5).map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom Section - System Status & User Info */}
        <div className="p-6 border-t border-primary-foreground/20 space-y-4">
          <div className="bg-primary-foreground/10 rounded-lg p-4 text-sm">
            <p className="font-semibold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              System Status
            </p>
            <p className="text-xs text-primary-foreground/80">All Systems Operational</p>
          </div>

          {/* User Profile Section */}
          <div className="bg-primary-foreground/10 rounded-lg p-3">
            <p className="text-xs text-primary-foreground/70 mb-1">Logged in as</p>
            <p className="font-semibold text-sm truncate">{user.email}</p>
            <p className="text-xs text-primary-foreground/70 capitalize mt-1">{user.userType}</p>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
