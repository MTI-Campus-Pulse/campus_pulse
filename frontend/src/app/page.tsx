'use client'
import { useState } from 'react'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ArrowRight, Bell } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'

const newsList = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    excerpt: "MTI University hosted an international AI conference with experts from all over the world...",
    date: "Jan 15, 2026",
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    excerpt: "Students participated in various sports competitions during the annual sports day...",
    date: "Nov 20, 2025",
  },
  {
    slug: "fun-day",
    title: "Annual Sports Day",
    excerpt: "Students participated in various sports competitions during the annual sports day...",
    date: "Nov 20, 2025",
  },
]

const categories = [
  { slug: "events", title: "Campus Events", icon: "🎉" },
  { slug: "sports", title: "Sports", icon: "⚽" },
  { slug: "technology", title: "Technology", icon: "💻" },
  { slug: "research", title: "Research", icon: "🔬" },
  { slug: "announcements", title: "Announcements", icon: "📢" },
  { slug: "clubs", title: "Student Clubs", icon: "👥" },
]

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false)

  const announcementText = `The university announces the start of registration for the new academic semester. 

Students are advised to complete their registration before the deadline and follow the official announcements for updates regarding schedules, courses, and campus activities.

Important dates:
• Registration opens: February 10, 2026
• Early registration discount deadline: February 20, 2026
• Regular registration closes: March 5, 2026

Required documents:
- National ID / Passport
- Previous academic transcripts
- Recent passport photos
- Payment receipt (if applicable)

For any questions, contact the Student Affairs Office at student.affairs@mti.edu.eg or visit the registration portal at portal.mti.edu.eg.

We look forward to welcoming you to the new semester!`

  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">

      {/* Hero Slider */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[70vh] min-h-125 w-full"
        >
          {['/slider/university1.webp', '/slider/university2.webp'].map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt="University campus"
                  fill
                  sizes="100vw"
                  className="object-cover brightness-[0.75]"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
                  {/*<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
                    Campus<span className="text-indigo-400">Pulse</span>
                  </h1>*/}
                  <p className="mt-6 text-xl md:text-2xl max-w-3xl font-light opacity-90">
                    Your university's central hub for real-time news, events and announcements.
                  </p>


                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Announcement – expandable */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-white/30 dark:border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-red-100/80 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-sm font-medium">
                    <Bell size={16} />
                    Important Announcement
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-red-400 dark:text-white mb-4">
                    Registration for the New Academic Semester is Now Open
                  </h2>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-1 shrink-0"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  )}
                </Button>
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-250 opacity-100' : 'max-h-32 opacity-90'}`}>
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {announcementText}
                </p>
              </div>

              {!isExpanded && (
                <div className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline" onClick={() => setIsExpanded(true)}>
                  Read full announcement...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Latest University News
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news) => (
              <div
                key={news.slug}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 bg-linear-to-br from-indigo-100 to-blue-100 dark:from-slate-700 dark:to-slate-600">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                    [News Image]
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <span>{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 line-clamp-3 mb-6">
                    {news.excerpt}
                  </p>

                  <Button
                    variant="ghost"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 p-0"
                    asChild
                  >
                    <Link href={`/news/${news.slug}`}>
                      Read More →
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/news">
                View All News →
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Explore Categories Section */}
      <section className="py-16 md:py-20 px-6 bg-linear-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Discover news tailored to your interests — click any category to see all related updates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 dark:hover:border-indigo-500"
              >
                {/* Optional gradient accent on hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500/0 to-blue-500/0 group-hover:from-indigo-500/5 group-hover:to-blue-500/5 transition-opacity" />

                {/* Icon / emoji */}
                <div className="text-4xl md:text-5xl mb-4">{cat.icon}</div>

                <h3 className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Optional "View all categories" button */}
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories">
                See All Categories →
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


