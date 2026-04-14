// 'use client'

// import { useState } from 'react'
// import Link from "next/link"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay, Pagination } from 'swiper/modules'
// import { ChevronDown, ChevronUp, Bell, Calendar, ArrowRight } from 'lucide-react'

// import 'swiper/css'
// import 'swiper/css/pagination'
// import StarRating from '@/components/Rating'

// // Multiple bulletins (add as many as you want!)
// const bulletins = [
//   {
//     id: 1,
//     title: "Registration for the New Academic Semester is Now Open",
//     date: "February 8, 2026",
//     urgent: true,
//     content: `The university announces the start of registration for the new academic semester.

// Students are advised to complete their registration before the deadline and follow the official announcements for updates regarding schedules, courses, and campus activities.

// Important dates:
// • Registration opens: February 10, 2026
// • Early registration discount deadline: February 20, 2026
// • Regular registration closes: March 5, 2026

// Required documents:
// - National ID / Passport
// - Previous academic transcripts
// - Recent passport photos
// - Payment receipt (if applicable)

// For any questions, contact the Student Affairs Office at student.affairs@mti.edu.eg or visit the registration portal at portal.mti.edu.eg.

// We look forward to welcoming you to the new semester!`
//   },
//   {
//     id: 2,
//     title: "Midterm Examination Schedule Released",
//     date: "February 15, 2026",
//     urgent: false,
//     content: `The official midterm exam schedule is now available on the student portal.

// Please check your faculty section for exact dates and venues. No changes will be made after February 20, 2026.

// Students with special needs must contact the Student Affairs Office before February 18.`
//   }
  
// ]

// const newsList = [
//   {
//     slug: "ai-conference",
//     title: "AI Conference at MTI Draws Global Experts",
//     excerpt: "MTI University hosted an international AI conference with experts from all over the world discussing the latest advancements in artificial intelligence...",
//     date: "Feb 28, 2026",
//     image: "/newsimage/conference.jpg",          // ← Added
//   },
//   {
//     slug: "sports-day",
//     title: "MTI Wins Big at Annual Inter-University Sports Day",
//     excerpt: "Students participated in various sports competitions during the annual sports day, promoting teamwork, health, and university spirit...",
//     date: "Feb 25, 2026",
//     image: "/newsimage/sport.jpg",                   // ← Already existed
//   },
//   {
//     slug: "fun-day",
//     title: "Annual Fun Day Brings Record Attendance",
//     excerpt: "A day full of games, music, food stalls and entertainment for all students and staff...",
//     date: "Feb 22, 2026",
//     image: "/newsimage/funday.jpg",                 // ← Added
//   },
// ]

// const categories = [
//   { slug: "events", title: "Campus Events", icon: "🎉" },
//   { slug: "sports", title: "Sports", icon: "⚽" },
//   { slug: "technology", title: "Technology", icon: "💻" },
//   { slug: "research", title: "Research", icon: "🔬" },
//   { slug: "announcements", title: "Announce ments", icon: "📢" },
//   { slug: "clubs", title: "Student Clubs", icon: "👥" },
// ]

// export default function Home() {
//   const [expandedIds, setExpandedIds] = useState(new Set<number>())

//   const toggleBulletin = (id: number) => {
//     const newSet = new Set(expandedIds)
//     if (newSet.has(id)) {
//       newSet.delete(id)
//     } else {
//       newSet.add(id)
//     }
//     setExpandedIds(newSet)
//   }

//   return (
//     <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">

    

//       {/* Hero Slider */}
//       <section className="relative">
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           loop
//           className="h-[70vh] md:h-[80vh] w-full"
//         >
//           {['/slider/university1.webp', '/slider/university2.webp'].map((src, index) => (
//             <SwiperSlide key={index}>
//               <div className="relative h-full w-full">
//                 <Image
//                   src={src}
//                   alt="University campus"
//                   fill
//                   sizes="100vw"
//                   className="object-cover brightness-[0.65]"
//                   priority={index === 0}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
//                   <div className="uppercase text-xs tracking-[6px] mb-4 opacity-90">MTI University Daily Edition</div>
//                   <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl leading-none">
//                     Welcome to CampusPulse
//                   </h1>
//                   <p className="mt-6 text-xl md:text-2xl max-w-2xl font-light opacity-90">
//                     Real-time news • Events • Announcements • Everything happening on campus
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       {/* Official Bulletins – Multiple Expandable */}
//       <section className="relative mt-10 mb-20  px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="mb-6 justify-center font-extrabold flex items-center gap-3">
//             <Bell className="h-7 w-7  text-red-600" />
//             <h2 className="text-3xl uppercase font-extrabold tracking-tight text-red-500">Announcements</h2>
//           </div>

//           <div className="space-y-6">
//             {bulletins.map((bulletin) => {
//               const isExpanded = expandedIds.has(bulletin.id)
//               return (
//                 <div
//                   key={bulletin.id}
//                   className="bg-white dark:bg-slate-900 border-4 border-black shadow-2xl overflow-hidden"
//                 >
//                   <div 
//                     className="p-8 md:p-10 cursor-pointer flex items-start justify-between gap-6"
//                     onClick={() => toggleBulletin(bulletin.id)}
//                   >
//                     <div className="flex-1">
//                       {bulletin.urgent && (
//                         <div className="inline-flex items-center gap-2 px-6 py-1.5 mb-4 rounded-none border-2 border-red-600 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm font-bold tracking-widest">
//                           URGENT
//                         </div>
//                       )}
//                       <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white leading-tight">
//                         {bulletin.title}
//                       </h3>
//                       <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{bulletin.date}</p>
//                     </div>

//                     <div className="mt-1 shrink-0">
//                       {isExpanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
//                     </div>
//                   </div>

//                   <div className={`overflow-hidden transition-all duration-500 ease-in-out px-8 md:px-10 pb-8 md:pb-10 ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
//                     <p className="text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
//                       {bulletin.content}
//                     </p>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Rest of the page (Today’s Headlines, Categories, Rating) remains the same as before */}
//       {/* ... (I kept the rest exactly as my previous version for consistency) ... */}

//       {/* Today's Headlines */}
//      {/* <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center gap-6 mb-12">
//             <div className="h-px flex-1 bg-zinc-400 dark:bg-zinc-700" />
//             <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight">TODAY'S HEADLINES</h2>
//             <div className="h-px flex-1 bg-zinc-400 dark:bg-zinc-700" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//   {newsList.map((news) => (
//     <Link
//       key={news.slug}
//       href={`/news/${news.slug}`}
//       className="group block bg-white dark:bg-slate-900 border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white transition-all duration-300"
//     >
      
//       <div className="relative h-60 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
//         {news.image ? (
//           <Image
//             src={news.image}
//             alt={news.title}
//             fill
//             className="object-cover transition-transform duration-500 group-hover:scale-105"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-xs font-medium tracking-widest">
//             IMAGE COMING SOON
//           </div>
//         )}
//       </div>

//       <div className="p-8">
//         <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 tracking-widest">{news.date}</div>
//         <h3 className="text-2xl font-bold leading-tight text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
//           {news.title}
//         </h3>
//         <p className="mt-5 text-[15px] text-zinc-600 dark:text-zinc-400 line-clamp-4">
//           {news.excerpt}
//         </p>

//         <div className="mt-8 text-xs uppercase tracking-[2px] font-medium text-zinc-500 group-hover:text-black dark:group-hover:text-white flex items-center gap-2">
//           READ FULL STORY →
//         </div>
//       </div>
//     </Link>
//   ))}
// </div>

//           <div className="text-center mt-16">
//             <Button variant="outline" size="lg" className="border-2 border-black dark:border-white text-base px-10" asChild>
//               <Link href="/news">View All Headlines →</Link>
//             </Button>
//           </div>
//         </div>
//       </section>*/}

//       {/* Explore by Section */}
//       <section className="py-20 px-6 bg-white dark:bg-slate-900 border-t border-b border-zinc-300 dark:border-zinc-700">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="uppercase text-xs tracking-[4px] text-zinc-500 dark:text-zinc-400 mb-3">INSIDE TODAY'S PAPER</div>
//             <h2 className="text-4xl font-bold text-black dark:text-white">Explore by Section</h2>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
//             {categories.map((cat) => (
//               <Link
//                 key={cat.slug}
//                 href={`/categories/${cat.slug}`}
//                 className="group relative bg-white dark:bg-slate-900 border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white p-8 text-center transition-all duration-300"
//               >
//                 <div className="text-5xl mb-6 transition-transform group-hover:scale-110">{cat.icon}</div>
//                 <h3 className="font-bold text-xl text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
//                   {cat.title}
//                 </h3>
//               </Link>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Button variant="outline" size="lg" className="border-2 border-black dark:border-white" asChild>
//               <Link href="/categories">All Sections →</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

     
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { ChevronDown, ChevronUp, Bell, AlertTriangle, Loader2 } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'
import axiosInstance from '@/lib/axiosInstance'

interface Announcement {
  id: number
  title: string
  date: string
  urgent: boolean
  content: string
  image: string | null
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Registration for the New Academic Semester is Now Open",
    date: "February 8, 2026",
    urgent: true,
    image: "/slider/university1.webp",
    content: `The university announces the start of registration for the new academic semester.

Students are advised to complete their registration before the deadline...`,
  },
  {
    id: 2,
    title: "Midterm Examination Schedule Released",
    date: "February 15, 2026",
    urgent: false,
    image: null,
    content: `The official midterm exam schedule is now available...`,
  },
]

const categories = [
  { slug: "events",        title: "Campus Events", icon: "🎉" },
  { slug: "sports",        title: "Sports",        icon: "⚽" },
  { slug: "technology",    title: "Technology",    icon: "💻" },
  { slug: "research",      title: "Research",      icon: "🔬" },
  { slug: "announcements", title: "Announ cements", icon: "📢" },
  { slug: "clubs",         title: "Student Clubs", icon: "👥" },
]

export default function Home() {
  const [expandedIds, setExpandedIds] = useState(new Set<number>())
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true)
  const [announcementsError, setAnnouncementsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoadingAnnouncements(true)
      setAnnouncementsError(null)

      try {
        await new Promise((r) => setTimeout(r, 800))
        setAnnouncements(MOCK_ANNOUNCEMENTS)
      } catch (err: any) {
        setAnnouncementsError("Failed to load announcements.")
      } finally {
        setLoadingAnnouncements(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const toggleBulletin = (id: number) => {
    const newSet = new Set(expandedIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setExpandedIds(newSet)
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[70vh] md:h-[80vh] w-full"
        >
          {['/slider/university1.webp', '/slider/university2.webp'].map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt="University campus"
                  fill
                  sizes="100vw"
                  className="object-cover brightness-[0.65]"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
                  <div className="uppercase text-xs tracking-[6px] mb-4 opacity-90">MTI University Daily Edition</div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl leading-none">
                    Welcome to CampusPulse
                  </h1>
                  <p className="mt-6 text-xl md:text-2xl max-w-2xl font-light opacity-90">
                    Real-time news • Events • Announcements • Everything happening on campus
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Announcements Section */}
      <section className="relative mt-16 mb-20 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="mb-10 flex items-center gap-4">
            <div className="w-1.5 h-10 bg-red-600 rounded-full" />
            <Bell className="h-7 w-7 text-red-600" />
            <h2 className="text-3xl uppercase font-extrabold tracking-tight text-red-600">
              Announcements
            </h2>
          </div>

          {loadingAnnouncements && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-red-500" />
            </div>
          )}

          {announcementsError && !loadingAnnouncements && (
            <div className="flex items-center gap-4 p-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <p>{announcementsError}</p>
            </div>
          )}

          {!loadingAnnouncements && !announcementsError && (
            <div className="space-y-6">
              {announcements.length === 0 ? (
                <p className="text-center text-zinc-500 dark:text-zinc-400 py-16 italic">
                  No announcements at the moment. Check back later.
                </p>
              ) : (
                announcements.map((bulletin) => {
                  const isExpanded = expandedIds.has(bulletin.id)
                  return (
                    <div
                      key={bulletin.id}
                      className="bg-white dark:bg-slate-900 border-2 border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-zinc-400 dark:hover:border-zinc-500"
                    >
                      {bulletin.image ? (
                        <div className="relative h-80 w-full overflow-hidden">   {/* Changed from h-52 to h-80 */}
                          <Image
                            src={bulletin.image}
                            alt={bulletin.title}
                            fill
                            unoptimized
                            className="object-cover brightness-90"
                          />
                          {bulletin.urgent && (
                            <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-xs font-bold tracking-widest rounded-full shadow-lg">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              URGENT
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative h-3 w-full bg-linear-to-r from-red-500 via-orange-400 to-yellow-400">
                          {bulletin.urgent && (
                            <div className="absolute -bottom-4 left-6 flex items-center gap-2 px-4 py-1 bg-red-600 text-white text-xs font-bold tracking-widest rounded-full shadow">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              URGENT
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className="p-7 md:p-9 cursor-pointer flex items-start justify-between gap-6"
                        onClick={() => toggleBulletin(bulletin.id)}
                      >
                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-snug">
                            {bulletin.title}
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
                            {bulletin.date}
                          </p>
                        </div>
                        <div className="mt-1 shrink-0 text-zinc-500 dark:text-zinc-400">
                          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>
                      </div>

                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-7 md:px-9 pb-8 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                          <p className="text-[16px] leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                            {bulletin.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </section>

      {/* Explore by Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900 border-t border-b border-zinc-300 dark:border-zinc-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="uppercase text-xs tracking-[4px] text-zinc-500 dark:text-zinc-400 mb-3">INSIDE TODAY'S PAPER</div>
            <h2 className="text-4xl font-bold text-black dark:text-white">Explore by Section</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative bg-white dark:bg-slate-900 border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white p-8 text-center transition-all duration-300"
              >
                <div className="text-5xl mb-6 transition-transform group-hover:scale-110">{cat.icon}</div>
                <h3 className="font-bold text-xl text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                  {cat.title}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2 border-black dark:border-white" asChild>
              <Link href="/categories">All Sections →</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}


