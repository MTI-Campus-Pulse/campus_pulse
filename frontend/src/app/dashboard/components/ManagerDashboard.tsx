'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ManagerDashboard() {
  // Track current active page
  const [activePage, setActivePage] = useState<string>('home')

  // Simple pages data
  const pages = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'reports', label: 'Reports', href: '#' },
    { id: 'settings', label: 'Settings', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 font-sans text-stone-900 dark:text-stone-100">

      {/* ==================== Navbar ==================== */}
      <nav className="bg-white mt-20 dark:bg-slate-900 shadow-md border-b border-stone-200 dark:border-stone-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
            Manager Dashboard
          </div>

          <div className="flex items-center gap-6">
            {pages.map(page => (
              <Button
                key={page.id}
                variant={activePage === page.id ? 'default' : 'outline'}
                size="sm"
                className="rounded-lg"
                onClick={() => setActivePage(page.id)}
              >
                {page.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* ==================== Page Content ==================== */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activePage === 'home' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Home</h1>
            <p>This is the manager's home page.</p>
          </div>
        )}

        {activePage === 'reports' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Reports</h1>
            <p>Reports will be shown here in the future.</p>
          </div>
        )}

        {activePage === 'settings' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p>Settings page placeholder.</p>
          </div>
        )}
      </main>
    </div>
  )
}