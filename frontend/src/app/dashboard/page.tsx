
'use client'

import { useEffect, useState } from 'react'
import StudentDashboard from './components/StudentDashboard'
import ManagerDashboard from './components/ManagerDashboard'


export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    setRole(user.role || 'guest')
  }, [])

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (role === 'student') return <StudentDashboard />
 

  return <ManagerDashboard />
}