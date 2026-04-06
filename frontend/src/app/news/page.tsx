// src/app/news/page.tsx

'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

// Mock data (replace with API fetch later)
const allNews = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    excerpt: "MTI University hosted an international AI conference with experts from all over the world...",
    date: "Jan 15, 2026",
    category: "Technology",
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    excerpt: "Students participated in various sports competitions during the annual sports day...",
    date: "Nov 20, 2025",
    category: "Sports",
    image: "/news/fun-day-hero.jpg",
  },
  {
    slug: "fun-day",
    title: "Annual Fun Day",
    excerpt: "A day full of games, music, food stalls and entertainment for all students and staff.",
    date: "Dec 5, 2025",
    category: "Campus Life",
  },
  {
    slug: "library-opening",
    title: "New Library Facilities Opened",
    excerpt: "State-of-the-art library extension with 24/7 study zones and digital resources now open.",
    date: "Feb 1, 2026",
    category: "Campus Life",
  },
  {
    slug: "research-grant",
    title: "Major Research Grant Awarded",
    excerpt: "MTI receives $2.5M grant for sustainable energy and climate research projects.",
    date: "Jan 28, 2026",
    category: "Research",
  },
  {
    slug: "graduation-ceremony",
    title: "2026 Graduation Ceremony",
    excerpt: "Over 1,800 students celebrated their graduation in a memorable ceremony.",
    date: "Jan 10, 2026",
    category: "Campus Life",
  },
  // Add more items as needed
]

export default function AllNewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(allNews.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNews = allNews.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-5">
            All University News
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Stay up to date with the latest campus updates, events, research, and announcements.
          </p>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {paginatedNews.map((news) => (
            <div
              key={news.slug}
              className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className="relative h-48 md:h-56 bg-linear-to-br from-indigo-100 to-blue-100 dark:from-slate-700 dark:to-slate-600">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                  [News Image]
                </div>
                {/* Category tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-xs font-medium text-indigo-700 dark:text-indigo-300">
                  {news.category}
                </div>
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <CalendarDays size={14} />
                  {news.date}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {news.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 line-clamp-3 mb-6 text-base">
                  {news.excerpt}
                </p>

                <Button
                  variant="ghost"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 p-0"
                  asChild
                >
                  <Link href={`/news/${news.slug}`}>
                    Read Full Story →
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-16">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-12 w-12 rounded-full"
            >
              <ChevronLeft size={20} />
            </Button>

            <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-12 w-12 rounded-full"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        )}

        {/* Back to home */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}