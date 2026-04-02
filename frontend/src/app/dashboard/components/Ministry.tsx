'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Loader2, AlertTriangle, RefreshCcw, Newspaper,
  Users, BookOpen, TrendingUp, Eye
} from 'lucide-react'
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
// Simulates the response from GET /reports
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
// ============================================================
// 🔧 BACKEND INTEGRATION POINT
// Make sure the role strings here match exactly what your
// backend returns in the login response.
// ============================================================
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
// The title changes automatically based on the role stored
// in localStorage after login.
// ============================================================
export default function StakeholderDashboard() {
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Read role from localStorage to show correct title
  const storedUser = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : {}
  const role = storedUser?.role || ''
  const title = ROLE_TITLES[role] || 'Dashboard'

  // ============================================================
  // 🔧 BACKEND INTEGRATION POINT
  // Fetch the system report.
  // Confirm endpoint with your backend team: GET /reports
  // If each role has its own endpoint, adjust accordingly:
  //   GET /supreme-council/reports
  //   GET /naqaae/reports
  //   etc.
  // ============================================================
  const fetchReport = async () => {
    setLoading(true)
    setError(null)

    try {
      // --- MOCK START (delete this block when backend is ready) ---
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

  useEffect(() => {
    fetchReport()
  }, [])

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

        {/* Report Content */}
        {!loading && report && (
          <div className="space-y-12">

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                icon={<Newspaper className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />}
                label="Articles Published"
                value={report.total_articles_published}
                iconBg="bg-indigo-100 dark:bg-indigo-950"
              />
              <StatCard
                icon={<Users className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />}
                label="Users Registered"
                value={report.total_users_registered}
                iconBg="bg-emerald-100 dark:bg-emerald-950"
              />
              <StatCard
                icon={<BookOpen className="h-7 w-7 text-amber-600 dark:text-amber-400" />}
                label="Newsletter Editions"
                value={report.newsletter_editions_count}
                iconBg="bg-amber-100 dark:bg-amber-950"
              />
            </div>

            {/* Most Read Articles */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                  Most Read Articles
                </h2>
              </div>

              <div className="space-y-4">
                {report.most_read_articles.map((article, index) => (
                  <div
                    key={article.article_id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex items-center gap-6"
                  >
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0
                      ${index === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400' :
                        index === 1 ? 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400' :
                        index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400' :
                        'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Article Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-stone-900 dark:text-white text-lg leading-snug line-clamp-1">
                        {article.title}
                      </h3>
                      <span className={`inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[article.category] || 'bg-zinc-100 text-zinc-600'}`}>
                        {CATEGORY_LABELS[article.category] || article.category}
                      </span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 shrink-0">
                      <Eye className="h-4 w-4" />
                      <span className="font-bold text-lg text-stone-900 dark:text-white">
                        {article.views.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400">views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
