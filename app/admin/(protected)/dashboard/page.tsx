'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { LogOut, Menu, X } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { ProjectsManager } from '@/components/admin/projects-manager'
import { MessagesManager } from '@/components/admin/messages-manager'
import { SettingsManager } from '@/components/admin/settings-manager'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/admin/login')
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'messages', label: 'Messages' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed md:relative w-64 h-screen bg-card border-r border-primary/10 p-6 overflow-y-auto"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">&lt; Admin /&gt;</h1>
          <p className="text-xs text-muted-foreground mt-1">Manage your portfolio</p>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                if (window.innerWidth < 768) setSidebarOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'text-foreground hover:bg-primary/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 text-foreground hover:bg-primary/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-primary/10 bg-card/50 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground capitalize">{activeTab}</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-primary/10 text-foreground"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">Dashboard Overview</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Projects', value: '6' },
                    { label: 'Total Experience', value: '3' },
                    { label: 'Skills', value: '18' },
                    { label: 'Messages', value: '0' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm"
                    >
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <ProjectsManager />
            )}

            {activeTab === 'messages' && (
              <MessagesManager />
            )}

            {activeTab === 'settings' && (
              <SettingsManager />
            )}
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}
    </div>
  )
}
