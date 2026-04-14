
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Loader2, AlertTriangle, RefreshCcw, Newspaper,
  Users, BookOpen, TrendingUp, Eye, FileText, Database
} from 'lucide-react'
import { ReportsViewer, QueriesViewer } from '../components/ManagerDashboard'
import axiosInstance from '@/lib/axiosInstance'

// ============================================================
// 🔧 BACKEND INTEGRATION POINT
// Confirm these field names with your backend team.
// ============================================================
type Report = {
  total_articles_published: number
  total_users_registered: number
  newsletter_editions_count: number
  most_read_articles: {
    article_id: number
    title: string
    category: string
    views: number
  }[]
}

// ============================================================
// 🔧 MOCK DATA (delete this when backend is ready)
// ============================================================
const MOCK_REPORT: Report = {
  total_articles_published: 142,
  total_users_registered: 1380,
  newsletter_editions_count: 24,
  most_read_articles: [
    { article_id: 1, title: "AI Conference at MTI Draws Global Experts",           category: "tech",          views: 4821 },
    { article_id: 2, title: "MTI Wins Big at Annual Inter-University Sports Day",  category: "sports",        views: 3654 },
    { article_id: 3, title: "New Research Lab Opens in Engineering Building",       category: "research",      views: 2910 },
    { article_id: 4, title: "Registration for the New Academic Semester is Open",  category: "announcements", views: 2540 },
    { article_id: 5, title: "Annual Fun Day Brings Record Attendance",             category: "events",        views: 2100 },
  ],
}

const CATEGORY_LABELS: Record<string, string> = {
  events:        "Campus Events",
  sports:        "Sports",
  tech:          "Technology",
  research:      "Research",
  announcements: "Announcements",
  clubs:         "Student Clubs",
}

const CATEGORY_COLORS: Record<string, string> = {
  events:        "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  sports:        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  tech:          "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  research:      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  announcements: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  clubs:         "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
}

// Role to display title mapping
const ROLE_TITLES: Record<string, string> = {
  supreme_council:    "Supreme Council",
  naqaae:             "NAQAAE",
  council:            "Council of Private Universities",
  manager:            "University President",
  quality_assurance:  "Quality Assurance Unit",
  supreme_universities: "Supreme Council of Universities",
  ministry:           "Ministry of Higher Education",
}

type StatCardProps = {
  icon: React.ReactNode
  label: string
  value: number
  iconBg: string
}

function StatCard({ icon, label, value, iconBg }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm p-7 flex items-center gap-6 hover:shadow-md transition-shadow duration-300">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-4xl font-black text-stone-900 dark:text-white mt-1">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

// ============================================================
// This single component is reused for ALL stakeholder roles.
// ============================================================
export default function StakeholderDashboard() {
  const [activeSection, setActiveSection] = useState<'home' | 'reports' | 'queries'>('home')
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Read role from localStorage to show correct title
  const storedUser = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : {}
  const role = storedUser?.role || ''
  const title = ROLE_TITLES[role] || 'Dashboard'

  // ✅ Fetch function - BEFORE early return (React Hook Rules)
  const fetchReport = async () => {
    setLoading(true)
    setError(null)

    try {
      // --- MOCK START ---
      await new Promise((r) => setTimeout(r, 900))
      setReport(MOCK_REPORT)
      // --- MOCK END ---

      // --- REAL AXIOS CALL (uncomment when backend is ready) ---
      // const response = await axiosInstance.get('/reports')
      // setReport(response.data)
      // ============================================================
   // 🔧 BACKEND INTEGRATION POINT
      // Adjust if report is nested:
      //   response.data       → Report
      //   response.data.data  → Report
      // ============================================================
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load reports. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  // ✅ useEffect - BEFORE early return (React Hook Rules)
  useEffect(() => {
    fetchReport()
  }, [])

  // ✅ Early return for Reports/Queries views (AFTER hooks)
  if (activeSection !== 'home') {
    return (
      <>
        {/* Overlay to hide global navbar */}
        <div className="fixed top-0 left-0 right-0 h-20 bg-[#f8f5f0] dark:bg-slate-950 z-[60]" />
        
        {activeSection === 'reports' 
          ? <ReportsViewer userRole={role} onBack={() => setActiveSection('home')} />
          : <QueriesViewer userRole={role} onBack={() => setActiveSection('home')} />
        }
      </>
    );
  }

  // ✅ Helper function to get Reports card classes based on role
  const getReportsCardClasses = () => {
    switch(role) {
      case 'ministry':
        return {
          hover: 'hover:border-emerald-500',
          bg: 'bg-emerald-100 dark:bg-emerald-950',
          icon: 'text-emerald-600 dark:text-emerald-400',
          arrow: 'text-emerald-500'
        };
      case 'naqaae':
        return {
          hover: 'hover:border-blue-500',
          bg: 'bg-blue-100 dark:bg-blue-950',
          icon: 'text-blue-600 dark:text-blue-400',
          arrow: 'text-blue-500'
        };
      case 'council':
        return {
          hover: 'hover:border-indigo-500',
          bg: 'bg-indigo-100 dark:bg-indigo-950',
          icon: 'text-indigo-600 dark:text-indigo-400',
          arrow: 'text-indigo-500'
        };
      case 'supreme_council':
        return {
          hover: 'hover:border-amber-500',
          bg: 'bg-amber-100 dark:bg-amber-950',
          icon: 'text-amber-600 dark:text-amber-400',
          arrow: 'text-amber-500'
        };
      case 'quality_assurance':
        return {
          hover: 'hover:border-cyan-500',
          bg: 'bg-cyan-100 dark:bg-cyan-950',
          icon: 'text-cyan-600 dark:text-cyan-400',
          arrow: 'text-cyan-500'
        };
      default:
        return {
          hover: 'hover:border-indigo-500',
          bg: 'bg-indigo-100 dark:bg-indigo-950',
          icon: 'text-indigo-600 dark:text-indigo-400',
          arrow: 'text-indigo-500'
        };
    }
  };

  // ✅ Helper function to get Queries card classes based on role
  const getQueriesCardClasses = () => {
    switch(role) {
      case 'ministry':
        return {
          hover: 'hover:border-teal-500',
          bg: 'bg-teal-100 dark:bg-teal-950',
          icon: 'text-teal-600 dark:text-teal-400',
          arrow: 'text-teal-500'
        };
      case 'naqaae':
        return {
          hover: 'hover:border-purple-500',
          bg: 'bg-purple-100 dark:bg-purple-950',
          icon: 'text-purple-600 dark:text-purple-400',
          arrow: 'text-purple-500'
        };
      case 'council':
        return {
          hover: 'hover:border-purple-500',
          bg: 'bg-purple-100 dark:bg-purple-950',
          icon: 'text-purple-600 dark:text-purple-400',
          arrow: 'text-purple-500'
        };
      case 'supreme_council':
        return {
          hover: 'hover:border-yellow-500',
          bg: 'bg-yellow-100 dark:bg-yellow-950',
          icon: 'text-yellow-600 dark:text-yellow-400',
          arrow: 'text-yellow-500'
        };
      case 'quality_assurance':
        return {
          hover: 'hover:border-blue-500',
          bg: 'bg-blue-100 dark:bg-blue-950',
          icon: 'text-blue-600 dark:text-blue-400',
          arrow: 'text-blue-500'
        };
      default:
        return {
          hover: 'hover:border-purple-500',
          bg: 'bg-purple-100 dark:bg-purple-950',
          icon: 'text-purple-600 dark:text-purple-400',
          arrow: 'text-purple-500'
        };
    }
  };

  const reportsClasses = getReportsCardClasses();
  const queriesClasses = getQueriesCardClasses();

  // ✅ Main Dashboard Content
  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16 mt-10">

        {/* Header */}
        <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-8 mb-12">
          <p className="text-sm uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans font-medium mb-1">
            CampusPulse
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-stone-900 dark:text-white">
              {title}
            </h1>
            <Button
              variant="outline"
              onClick={fetchReport}
              disabled={loading}
              className="border-2 border-stone-800 dark:border-stone-200 rounded-xl h-11 px-5 flex items-center gap-2 self-start sm:self-auto"
            >
              {loading
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <RefreshCcw className="h-4 w-4" />
              }
              Refresh Report
            </Button>
          </div>
        </div>

        {/* ✅ NEW: Reports & Queries Quick Access Cards - Fixed Tailwind Classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          
          {/* Reports Card */}
          <button
            onClick={() => setActiveSection('reports')}
            className={`group bg-white dark:bg-slate-900 rounded-2xl border-2 border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5 text-left ${reportsClasses.hover}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${reportsClasses.bg}`}>
              <FileText className={`h-7 w-7 ${reportsClasses.icon}`} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-white text-lg">Manager Reports</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">View reports sent by the Manager dashboard</p>
            </div>
            <FileText className={`h-5 w-5 text-stone-400 ml-auto group-hover:translate-x-1 transition-transform ${reportsClasses.arrow}`} />
          </button>

          {/* Queries Card */}
          <button
            onClick={() => setActiveSection('queries')}
            className={`group bg-white dark:bg-slate-900 rounded-2xl border-2 border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5 text-left ${queriesClasses.hover}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${queriesClasses.bg}`}>
              <Database className={`h-7 w-7 ${queriesClasses.icon}`} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-white text-lg">Database Queries</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Access raw data queries and exports</p>
            </div>
            <Database className={`h-5 w-5 text-stone-400 ml-auto group-hover:translate-x-1 transition-transform ${queriesClasses.arrow}`} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-10 p-5 bg-white dark:bg-slate-800 border-l-4 border-red-500 rounded-xl shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchReport}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-28">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
              <p className="text-lg italic text-stone-500 dark:text-stone-400">
                Loading system report...
              </p>
            </div>
          </div>
        )}

       

      </div>
    </div>
  )
}