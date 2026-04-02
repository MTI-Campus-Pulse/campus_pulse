'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Clock, CheckCircle, XCircle, FileText, Plus,
  Loader2, AlertTriangle, RefreshCcw, Calendar,
  ThumbsUp, ThumbsDown, Megaphone, Newspaper
} from 'lucide-react'
import axiosInstance from '@/lib/axiosInstance'

// ============================================================
// 🔧 BACKEND INTEGRATION POINT
// Confirm these field names with your backend team.
// ============================================================
type Article = {
  article_id: number
  title: string
  summary: string
  category: string
  status: 'pending' | 'approved' | 'rejected'
  image: string | null
  published_at: string | null
  created_at: string
  written_by_adviser: boolean // true = written by media adviser, false = AI generated
}

type Tab = 'pending' | 'approved' | 'rejected' | 'mine'

// ============================================================
// 🔧 MOCK DATA (delete this when backend is ready)
// Simulates the response from GET /media-adviser/articles
// ============================================================
const MOCK_ARTICLES: Article[] = [
  {
    article_id: 1,
    title: "AI Detects Early Signs of Campus Infrastructure Issues",
    summary: "A new AI system deployed across campus has successfully identified early warning signs of infrastructure degradation in three buildings.",
    category: "tech",
    status: "pending",
    image: null,
    published_at: null,
    created_at: "2026-04-01T10:00:00Z",
    written_by_adviser: false,
  },
  {
    article_id: 2,
    title: "MTI Research Team Publishes Groundbreaking Climate Study",
    summary: "Researchers from the environmental science department have published a study on urban heat islands that is gaining international attention.",
    category: "research",
    status: "pending",
    image: null,
    published_at: null,
    created_at: "2026-04-01T08:30:00Z",
    written_by_adviser: false,
  },
  {
    article_id: 3,
    title: "Annual Sports Day Set for Next Month",
    summary: "The student affairs office has confirmed the date for the annual sports day, with over 20 competitions planned across all faculties.",
    category: "sports",
    status: "pending",
    image: null,
    published_at: null,
    created_at: "2026-03-31T14:00:00Z",
    written_by_adviser: false,
  },
  {
    article_id: 4,
    title: "New Library Wing Opens to Students",
    summary: "The university library has opened a brand new wing dedicated to digital resources and collaborative study spaces.",
    category: "announcements",
    status: "approved",
    image: null,
    published_at: "2026-03-30T09:00:00Z",
    created_at: "2026-03-29T11:00:00Z",
    written_by_adviser: false,
  },
  {
    article_id: 5,
    title: "Blockchain Workshop for CS Students",
    summary: "A two-day blockchain development workshop is planned exclusively for computer science students in collaboration with a leading fintech company.",
    category: "tech",
    status: "rejected",
    image: null,
    published_at: null,
    created_at: "2026-03-28T10:00:00Z",
    written_by_adviser: false,
  },
  {
    article_id: 6,
    title: "Welcome Message from the Media Adviser",
    summary: "A personal welcome note from the media adviser introducing the new semester's communication strategy and newsletter vision.",
    category: "announcements",
    status: "approved",
    image: null,
    published_at: "2026-03-27T12:00:00Z",
    created_at: "2026-03-27T10:00:00Z",
    written_by_adviser: true,
  },
]

const TAB_CONFIG: Record<Tab, { label: string; icon: React.ReactNode; color: string }> = {
  pending:  { label: "Pending Review", icon: <Clock className="h-4 w-4" />,       color: "text-amber-600 dark:text-amber-400" },
  approved: { label: "Approved",       icon: <CheckCircle className="h-4 w-4" />, color: "text-emerald-600 dark:text-emerald-400" },
  rejected: { label: "Rejected",       icon: <XCircle className="h-4 w-4" />,     color: "text-red-600 dark:text-red-400" },
  mine:     { label: "My Articles",    icon: <FileText className="h-4 w-4" />,    color: "text-indigo-600 dark:text-indigo-400" },
}

const CATEGORY_LABELS: Record<string, string> = {
  events:        "Campus Events",
  sports:        "Sports",
  tech:          "Technology",
  research:      "Research",
  announcements: "Announcements",
  clubs:         "Student Clubs",
}

const STATUS_BADGE: Record<string, string> = {
  pending:  "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
}

export default function MediaAdviserDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('pending')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  // ============================================================
  // 🔧 BACKEND INTEGRATION POINT
  // Fetch all articles for the media adviser.
  // Confirm endpoint: GET /media-adviser/articles
  // ============================================================
  const fetchArticles = async () => {
    setLoading(true)
    setError(null)

    try {
      // --- MOCK START (delete this block when backend is ready) ---
      await new Promise((r) => setTimeout(r, 900))
      setArticles(MOCK_ARTICLES)
      // --- MOCK END ---

      // --- REAL AXIOS CALL (uncomment when backend is ready) ---
      // const response = await axiosInstance.get('/media-adviser/articles')
      // setArticles(response.data)
      // ============================================================
      // 🔧 BACKEND INTEGRATION POINT
      // Adjust if articles are nested:
      //   response.data       → Article[]
      //   response.data.data  → Article[]
      // ============================================================

    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load articles. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  // ============================================================
  // 🔧 BACKEND INTEGRATION POINT
  // Approve an article.
  // Confirm endpoint: PATCH /media-adviser/articles/:id/approve
  // ============================================================
  const handleApprove = async (articleId: number) => {
    setActionLoading(articleId)
    try {
      // --- MOCK START (delete this block when backend is ready) ---
      await new Promise((r) => setTimeout(r, 600))
      setArticles((prev) =>
        prev.map((a) => a.article_id === articleId ? { ...a, status: 'approved' } : a)
      )
      console.log("📦 Approve article (ready for backend):", { article_id: articleId })
      // --- MOCK END ---

      // --- REAL AXIOS CALL (uncomment when backend is ready) ---
      // await axiosInstance.patch(`/media-adviser/articles/${articleId}/approve`)
      // setArticles((prev) =>
      //   prev.map((a) => a.article_id === articleId ? { ...a, status: 'approved' } : a)
      // )

    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to approve article. Please try again."
      )
    } finally {
      setActionLoading(null)
    }
  }

  // ============================================================
  // 🔧 BACKEND INTEGRATION POINT
  // Reject an article.
  // Confirm endpoint: PATCH /media-adviser/articles/:id/reject
  // ============================================================
  const handleReject = async (articleId: number) => {
    setActionLoading(articleId)
    try {
      // --- MOCK START (delete this block when backend is ready) ---
      await new Promise((r) => setTimeout(r, 600))
      setArticles((prev) =>
        prev.map((a) => a.article_id === articleId ? { ...a, status: 'rejected' } : a)
      )
      console.log("📦 Reject article (ready for backend):", { article_id: articleId })
      // --- MOCK END ---

      // --- REAL AXIOS CALL (uncomment when backend is ready) ---
      // await axiosInstance.patch(`/media-adviser/articles/${articleId}/reject`)
      // setArticles((prev) =>
      //   prev.map((a) => a.article_id === articleId ? { ...a, status: 'rejected' } : a)
      // )

    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to reject article. Please try again."
      )
    } finally {
      setActionLoading(null)
    }
  }

  const filteredArticles = articles.filter((a) => {
    if (activeTab === 'mine') return a.written_by_adviser
    return a.status === activeTab
  })

  const counts: Record<Tab, number> = {
    pending:  articles.filter((a) => a.status === 'pending').length,
    approved: articles.filter((a) => a.status === 'approved').length,
    rejected: articles.filter((a) => a.status === 'rejected').length,
    mine:     articles.filter((a) => a.written_by_adviser).length,
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16 mt-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 border-b-2 border-stone-800 dark:border-stone-200 pb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans font-medium mb-1">
              CampusPulse
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-stone-900 dark:text-white">
              Media Adviser
            </h1>
          </div>

          {/* Write Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push('/media-adviser/write/article')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 h-11 flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" />
              Write Article
            </Button>
            <Button
              onClick={() => router.push('/media-adviser/write/announcement')}
              variant="outline"
              className="border-2 border-stone-800 dark:border-stone-200 rounded-xl px-5 h-11 flex items-center gap-2"
            >
              <Megaphone className="h-4 w-4" />
              Write Announcement
            </Button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-5 bg-white dark:bg-slate-800 border-l-4 border-red-500 rounded-xl shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchArticles}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(TAB_CONFIG) as Tab[]).map((tab) => {
            const { label, icon, color } = TAB_CONFIG[tab]
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200
                  ${isActive
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-stone-900 dark:border-white shadow-lg'
                    : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
              >
                <span className={isActive ? 'text-white dark:text-stone-900' : color}>
                  {icon}
                </span>
                {label}
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                  ${isActive
                    ? 'bg-white/20 dark:bg-stone-900/20 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {counts[tab]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-28">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
              <p className="text-lg italic text-stone-500 dark:text-stone-400">
                Loading articles...
              </p>
            </div>
          </div>
        )}

        {/* Articles List */}
        {!loading && (
          <div className="space-y-5">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-28">
                <FileText className="h-16 w-16 mx-auto text-stone-300 dark:text-stone-700 mb-4" />
                <p className="text-xl font-semibold text-stone-500 dark:text-stone-400">
                  No articles in this section
                </p>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.article_id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${STATUS_BADGE[article.status]}`}>
                          {article.status.toUpperCase()}
                        </span>

                        {/* Category Badge */}
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                          {CATEGORY_LABELS[article.category] || article.category}
                        </span>

                        {/* AI or Adviser tag */}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          article.written_by_adviser
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        }`}>
                          {article.written_by_adviser ? '✍️ By You' : '🤖 AI Generated'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-stone-900 dark:text-white leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed line-clamp-2">
                        {article.summary}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {new Date(article.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Actions — only show for pending articles */}
                    {article.status === 'pending' && (
                      <div className="flex sm:flex-col gap-3 shrink-0">
                        <Button
                          onClick={() => handleApprove(article.article_id)}
                          disabled={actionLoading === article.article_id}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-5 flex items-center gap-2 text-sm font-semibold"
                        >
                          {actionLoading === article.article_id
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : <ThumbsUp className="h-4 w-4" />
                          }
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(article.article_id)}
                          disabled={actionLoading === article.article_id}
                          variant="outline"
                          className="border-2 border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl h-10 px-5 flex items-center gap-2 text-sm font-semibold"
                        >
                          {actionLoading === article.article_id
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : <ThumbsDown className="h-4 w-4" />
                          }
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}
