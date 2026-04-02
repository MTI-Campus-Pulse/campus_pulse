
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StudentDashboard from './components/StudentDashboard'
import ManagerDashboard from './components/ManagerDashboard'
import MediaAdviserDashboard from './components/MediaAdviser'
import SupremeCouncilDashboard from './components/SupremeCouncil'

// ============================================================
// 🔧 BACKEND INTEGRATION POINT
// Import the rest of the dashboards as they are created:
// import AdminDashboard from './components/AdminDashboard'
// import CouncilDashboard from './components/CouncilDashboard'
// import SupremeCouncilDashboard from './components/SupremeCouncilDashboard'
// import NaqaaeDashboard from './components/NaqaaeDashboard'
// import MediaAdviserDashboard from './components/MediaAdviserDashboard'
// ============================================================

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const userRole = user.role || null

    if (!userRole) {
      // Not logged in → redirect to login
      router.push('/auth/login')
      return
    }

    setRole(userRole)
  }, [router])

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  // ============================================================
  // 🔧 BACKEND INTEGRATION POINT
  // As each dashboard component is built, replace the
  // placeholder comments below with the actual component.
  // ============================================================
  switch (role) {
    case 'student':
      return <StudentDashboard />
    case 'manager':
      return <ManagerDashboard />
    case 'admin':
      return <ManagerDashboard /> 
    case 'council':
      return <ManagerDashboard /> 
    case 'supreme_council':
      return <SupremeCouncilDashboard /> 
    case 'naqaae':
      return <ManagerDashboard /> 
    case 'media_adviser':
      return <MediaAdviserDashboard /> 
    default:
      // Unknown role → redirect to login
      router.push('/auth/login')
      return null
  }
}