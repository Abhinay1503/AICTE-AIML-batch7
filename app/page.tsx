'use client'

import { useState } from 'react'
import Dashboard from '@/components/dashboard'
import Sidebar from '@/components/sidebar'
import LoginPage from '@/components/login-page'

interface User {
  email: string
  userType: 'user' | 'management'
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'blood-bank' | 'alerts' | 'emergency'>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleLogin = (userType: 'user' | 'management', credentials: { email: string; password: string }) => {
    setUser({
      email: credentials.email,
      userType,
    })
  }

  const handleLogout = () => {
    setUser(null)
    setActiveTab('overview')
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Dashboard activeTab={activeTab} user={user} onLogout={handleLogout} />
      </div>
    </div>
  )
}
