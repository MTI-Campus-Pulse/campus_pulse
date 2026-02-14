'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Newspaper, Heart, MessageSquare, TrendingUp, ChevronRight } from 'lucide-react'

// Map slugs → nice labels (same as registration)
const categoryLabels: Record<string, string> = {
  events: "Campus Events",
  sports: "Sports",
  tech: "Technology",
  research: "Research",
  announcements: "Announcements",
  clubs: "Student Clubs",
}

// Mock data — later replace with real API responses
const mockNews = [
  { id: 1, slug: "ai-conference", title: "AI Conference at MTI", category: "tech", excerpt: "MTI hosted international AI experts...", date: "Jan 15, 2026", likes: 342, comments: 87 },
  { id: 2, slug: "sports-day", title: "Annual Sports Day Highlights", category: "sports", excerpt: "Record participation across 15 sports...", date: "Nov 20, 2025", likes: 521, comments: 134 },
  { id: 3, slug: "new-library", title: "New Library Extension Opens", category: "announcements", excerpt: "24/7 study zones and digital resources now available...", date: "Feb 1, 2026", likes: 289, comments: 62 },
  { id: 4, slug: "research-grant", title: "Major Research Grant Awarded", category: "research", excerpt: "$2.5M for sustainable energy projects...", date: "Jan 28, 2026", likes: 176, comments: 41 },
  { id: 5, slug: "esports-tournament", title: "Esports Tournament Grand Final", category: "tech", excerpt: "Over 500 spectators watched the League of Legends final...", date: "Oct 28, 2025", likes: 412, comments: 98 },
]

export default function DashboardPage() {
  const [userInterests, setUserInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load interests from localStorage (saved during registration)
    const saved = localStorage.getItem('userNewsPreferences')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setUserInterests(parsed)
        }
      } catch (err) {
        console.error("Failed to load interests", err)
      }
    }
    setLoading(false)
  }, [])

  // Filter news that match user's interests
  const interestedNews = mockNews.filter(item =>
    userInterests.includes(item.category)
  )

  // Mock "most interacted" — in real app you'd get this from backend
  const mostInteracted = [...mockNews]
    .sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
    .slice(0, 6)

  // Mock "recommended/trending"
  const trending = [...mockNews].slice(0, 4)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 mt-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
         
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
            Personalized news based on your interests • {userInterests.length} categories selected
          </p>
        </div>

        {/* Your Interests Section */}
        <section className="mb-16">
         

          {userInterests.length === 0 ? (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-10 text-center">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                You haven't selected any interests yet.
              </p>
              <Button asChild>
                <Link href="/auth/register">
                  Choose Interests Now
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interestedNews.length > 0 ? (
                interestedNews.map((news) => (
                  <NewsCard key={news.slug} news={news} />
                ))
              ) : (
                <div className="col-span-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-10 text-center text-slate-600 dark:text-slate-400">
                  No recent news in your selected categories yet
                </div>
              )}
            </div>
          )}
        </section>

        {/* Most Interacted Section (mocked) */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-rose-600" />
            You Interact With These Most
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostInteracted.map((news) => (
              <NewsCard key={news.slug} news={news}  />
            ))}
          </div>
        </section>

        {/* Trending / Recommended */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-indigo-600" />
            Trending on Campus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((news) => (
              <NewsCard key={news.slug} news={news} compact />
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="text-center mt-16 py-10 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Want to see more? Explore all categories or search for specific topics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/categories">
                Browse Categories
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/news">
                View All News
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable News Card component
function NewsCard({
  news,
  showInteraction = false,
  compact = false,
}: {
  news: any
  showInteraction?: boolean
  compact?: boolean
}) {
  return (
    <Link href={`/news/${news.slug}`} className="block group">
      <div className={`bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${compact ? 'h-full flex flex-col' : ''}`}>
        {/* Image placeholder */}
        <div className={`relative ${compact ? 'h-36' : 'h-48 md:h-56'} bg-linear-to-br from-indigo-100 to-blue-100 dark:from-slate-700 dark:to-slate-600`}>
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium">
            [Image]
          </div>
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-xs font-medium text-indigo-700 dark:text-indigo-300">
            {news.category}
          </div>
        </div>

        <div className="p-5 md:p-6 flex flex-col grow">
          <h3 className={`font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${compact ? 'line-clamp-2 text-lg' : 'line-clamp-2 text-xl'}`}>
            {news.title}
          </h3>

          {!compact && (
            <p className="text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 text-base grow">
              {news.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-auto">
            <div className="flex items-center gap-4">
              <span>{news.date}</span>
              {showInteraction && (
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart size={14} /> {news.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} /> {news.comments || 0}
                  </span>
                </div>
              )}
            </div>

            <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}