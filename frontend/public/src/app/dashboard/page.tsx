'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, Newspaper, RefreshCcw } from 'lucide-react'

// Category labels
const categoryLabels: Record<string, string> = {
  events: "Campus Events",
  sports: "Sports",
  tech: "Technology",
  research: "Research",
  announcements: "Announcements",
  clubs: "Student Clubs",
}

interface NewsArticle {
  article_id: number;
  title: string;
  summary: string;
  photo: string | null;
  scraped_at?: string;
  category?: string;
}

export default function DashboardPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [userInterests, setUserInterests] = useState<string[]>([])
  const [userName, setUserName] = useState<string>("Student")
  const [userId, setUserId] = useState<number>(2) // <-- TEMP default ID
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const timestamp = new Date().getTime()
      const url = `http://127.0.0.1:8000/dashboard/newsletter?user_id=${userId}&t=${timestamp}`

      console.log("Fetching:", url)

      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      setArticles(Array.isArray(data?.data) ? data.data : data?.data?.details || [])
    } catch (err: any) {
      console.error("Fetch error:", err)
      setError("Unable to connect to the backend. Make sure the server is running and CORS is enabled.")
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Load dashboard immediately
  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  // Sort: interested categories first
  const sortedArticles = [...articles].sort((a, b) => {
    const aMatch = a.category && userInterests.includes(a.category) ? 1 : 0
    const bMatch = b.category && userInterests.includes(b.category) ? 1 : 0
    return bMatch - aMatch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-lg font-medium text-stone-600 dark:text-stone-300 italic">
            Preparing today's edition...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-serif text-stone-900 dark:text-stone-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">

        {/* Header */}
        <header className="mb-16 mt-10 space-y-10">
          <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-lg uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans font-medium">
                  Welcome, {userName}
                </p>
                <h1 className="mt-2 text-2xl sm:text-6xl lg:text-5xl font-black tracking-tight uppercase text-stone-900 dark:text-white">
                  CampusPulse
                </h1>
              </div>

              <div className="text-right">
                <p className="text-base sm:text-lg font-bold uppercase tracking-wide text-stone-700 dark:text-stone-300 font-sans">
                  Edition {userId}
                </p>
                <p className="text-lg text-stone-500 dark:text-stone-400 italic font-sans">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Error banner */}
        {error && (
          <div className="mb-12 p-6 bg-white dark:bg-slate-800/70 border-l-4 border-red-500 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4 text-red-700 dark:text-red-400">
              <AlertCircle className="h-7 w-7 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Connection Issue</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30 whitespace-nowrap"
              onClick={loadDashboard}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        )}

        {/* Main news grid */}
        <main>
          {sortedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-14 lg:gap-y-16">
              {sortedArticles.map((article) => (
                <NewsItem key={article.article_id} article={article} />
              ))}
            </div>
          ) : (
            !error && (
              <div className="text-center py-32">
                <Newspaper className="h-20 w-20 mx-auto text-stone-300 dark:text-stone-700 mb-6" />
                <h2 className="text-2xl font-semibold text-stone-600 dark:text-stone-300 mb-3">
                  No articles yet
                </h2>
                <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                  Check back later or update your interests in the profile to see personalized content.
                </p>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  )
}

function NewsItem({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.article_id}`}
      className="group block space-y-5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[5/3] overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-500 bg-stone-200 dark:bg-slate-800">
        <Image
          src={article.photo || "/newsimage/placeholder.jpg"}
          alt={article.title || "Campus news image"}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {categoryLabels[article.category || ''] || "Campus News"}
        </p>

        <h3 className="text-2xl lg:text-3xl font-bold leading-tight text-stone-900 dark:text-stone-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
          {article.title}
        </h3>

        <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed line-clamp-3">
          {article.summary}
        </p>

        <div className="pt-3 flex items-center justify-between text-sm text-stone-500 dark:text-stone-400 border-t border-stone-200 dark:border-stone-700">
          <time className="italic">
            {article.scraped_at
              ? new Date(article.scraped_at).toLocaleDateString()
              : "Recent"}
          </time>

          {/* FIX: removed nested Link */}
          <span className="font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
            Read full story →
          </span>
        </div>
      </div>
    </Link>
  )
}