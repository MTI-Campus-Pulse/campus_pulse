// import { notFound } from "next/navigation"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, Calendar, Clock } from "lucide-react"

// const categories = [
//   {
//     slug: "technology",
//     title: "Technology",
//     description: "Latest innovations, AI research, cybersecurity, and digital transformation happening at MTI University.",
//     news: [
//       { 
//         title: "AI Research Breakthrough at MTI", 
//         excerpt: "University researchers develop new multimodal AI model that outperforms current benchmarks in reasoning and vision tasks.",
//         date: "Feb 5, 2026",
//         readTime: "8 min",
//         image: "/news/ai-breakthrough.jpg"
//       },
//       { 
//         title: "Cybersecurity Summit 2026", 
//         excerpt: "Leading experts share strategies to protect campus networks from emerging quantum threats.",
//         date: "Jan 28, 2026",
//         readTime: "7 min",
//         image: "/news/cyber-summit.jpg"
//       },
//       { 
//         title: "New High-Performance Computing Cluster", 
//         excerpt: "State-of-the-art GPU cluster now available for student research and machine learning courses.",
//         date: "Jan 15, 2026",
//         readTime: "5 min",
//         image: "/news/hpc-cluster.jpg"
//       },
//       { 
//         title: "Blockchain & Web3 Course Launched", 
//         excerpt: "New elective on decentralized finance attracts record enrollment this semester.",
//         date: "Dec 20, 2025",
//         readTime: "6 min",
//         image: "/news/blockchain-course.jpg"
//       },
//       { 
//         title: "Quantum Computing Workshop Series", 
//         excerpt: "Hands-on labs using Qiskit and real quantum hardware simulation.",
//         date: "Nov 10, 2025",
//         readTime: "9 min",
//         image: "/news/quantum-workshop.jpg"
//       },
//       { 
//         title: "AR Campus Navigation App Released", 
//         excerpt: "New augmented reality app helps freshmen navigate classrooms and facilities.",
//         date: "Oct 15, 2025",
//         readTime: "4 min",
//         image: "/news/ar-app.jpg"
//       },
//     ],
//   },
//   {
//     slug: "sports",
//     title: "Sports",
//     description: "University teams, tournaments, fitness events, and the vibrant sports culture at MTI.",
//     news: [
//       { 
//         title: "Annual Inter-Faculty Sports Festival", 
//         excerpt: "Record participation across 15 sports with Computer Science winning the overall trophy.",
//         date: "Feb 8, 2026",
//         readTime: "6 min",
//         image: "/news/sports-festival.jpg"
//       },
//       { 
//         title: "MTI Football Team Wins Regional Cup", 
//         excerpt: "Dramatic 3–2 victory in the final against rival university.",
//         date: "Jan 30, 2026",
//         readTime: "5 min",
//         image: "/news/football-cup.jpg"
//       },
//       { 
//         title: "New Olympic-Standard Athletics Track", 
//         excerpt: "Modern synthetic track and field facilities now open for training and competitions.",
//         date: "Jan 20, 2026",
//         readTime: "4 min",
//         image: "/news/athletics-track.jpg"
//       },
//       { 
//         title: "Women's Basketball League Champions", 
//         excerpt: "Undefeated season ends with championship title and MVP award.",
//         date: "Dec 18, 2025",
//         readTime: "5 min",
//         image: "/news/basketball-champs.jpg"
//       },
//       { 
//         title: "Campus Fitness Challenge Results", 
//         excerpt: "Over 1,200 students participated — top performers recognized in grand ceremony.",
//         date: "Nov 25, 2025",
//         readTime: "4 min",
//         image: "/news/fitness-challenge.jpg"
//       },
//       { 
//         title: "Swimming Team Breaks Records", 
//         excerpt: "Three new university records set at the national student championships.",
//         date: "Nov 12, 2025",
//         readTime: "5 min",
//         image: "/news/swimming-records.jpg"
//       },
//     ],
//   },
// ]

// export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params

//   const category = categories.find((c) => c.slug === slug)

//   if (!category) {
//     notFound()
//   }

//   return (
//     <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">

     

//       <div className="max-w-6xl mx-auto px-6 py-16">
//         {/* Back Button */}
//         <Button
//           variant="ghost"
//           className="mb-8 mt-10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-2"
//           asChild
//         >
//           <Link href="/categories">
//             <ArrowLeft className="h-4 w-4" /> Back to All Sections
//           </Link>
//         </Button>

//         {/* Category Header */}
//         <div className="border-b border-zinc-300 dark:border-zinc-700 pb-10 mb-14">
//           <div className="uppercase tracking-[4px] text-xs text-zinc-500 mb-4">SECTION</div>
//           <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-black dark:text-white">
//             {category.title}
//           </h1>
//           <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
//             {category.description}
//           </p>
//         </div>

//         {/* News Grid – Newspaper Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {category.news.map((newsItem, idx) => (
//             <Link
//               key={idx}
//               href={`/news/${category.slug}-${idx}`}
//               className="group block"
//             >
//               <div className="relative">
//                 {/* Image */}
//                 <div className="aspect-video w-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
//                   <Image
//                     src={newsItem.image}
//                     alt={newsItem.title}
//                     width={600}
//                     height={340}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>

//                 {/* Category Tag */}
//                 <div className="absolute top-4 left-4 px-4 py-1 bg-white/90 dark:bg-black/80 text-xs font-medium tracking-widest text-black dark:text-white">
//                   {category.title.toUpperCase()}
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h3 className="font-bold text-2xl leading-tight text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors line-clamp-3">
//                   {newsItem.title}
//                 </h3>

//                 <p className="mt-5 text-[15px] text-zinc-600 dark:text-zinc-400 line-clamp-4 leading-relaxed">
//                   {newsItem.excerpt}
//                 </p>

//                 <div className="mt-6 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="h-3.5 w-3.5" />
//                     {newsItem.date}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-3.5 w-3.5" />
//                     {newsItem.readTime} read
//                   </div>
//                 </div>

//                 <div className="mt-8 text-xs uppercase tracking-[2px] font-medium text-zinc-500 group-hover:text-black dark:group-hover:text-white inline-flex items-center gap-2">
//                   READ FULL STORY →
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Footer CTA */}
//         <div className="text-center mt-20 pt-12 border-t border-zinc-300 dark:border-zinc-700">
//           <Button variant="outline" size="lg" className="border-2 border-black dark:border-white" asChild>
//             <Link href="/news">View All University News →</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Loader2, AlertTriangle } from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"

// ============================================================
// 🔧 BACKEND INTEGRATION POINT
// This is the shape of each article from the API.
// Confirm field names with your backend team.
// ============================================================
type Article = {
  article_id: number
  title: string
  summary: string
  category: string
  image: string | null
  published_at: string
  read_time?: string | null
}

// Category metadata — titles and descriptions per slug
const CATEGORY_META: Record<string, { title: string; description: string }> = {
  events:        { title: "Campus Events",  description: "Everything happening on campus — don't miss out." },
  sports:        { title: "Sports",         description: "Latest results, highlights, and sports news." },
  tech:          { title: "Technology",     description: "Tech innovations, labs, and digital campus news." },
  research:      { title: "Research",       description: "Discoveries and academic research from our faculty." },
  announcements: { title: "Announcements",  description: "Official updates and notices from the university." },
  clubs:         { title: "Student Clubs",  description: "Activities and news from student organizations." },
}

// ============================================================
// 🔧 MOCK DATA (delete this when backend is ready)
// Simulates the response from GET /articles/published?category=slug
// ============================================================
const MOCK_ARTICLES: Record<string, Article[]> = {
  tech: [
    {
      article_id: 1,
      title: "AI Conference at MTI Draws Global Experts",
      summary: "MTI University hosted an international AI conference with experts from all over the world discussing the latest advancements in artificial intelligence.",
      category: "tech",
      image: null,
      published_at: "2026-02-28T10:00:00Z",
      read_time: "8 min",
    },
    {
      article_id: 2,
      title: "New Machine Learning Lab Opens on Campus",
      summary: "A state-of-the-art machine learning lab has opened its doors to students and researchers, equipped with high-end GPUs and cloud access.",
      category: "tech",
      image: null,
      published_at: "2026-02-25T09:00:00Z",
      read_time: "5 min",
    },
    {
      article_id: 3,
      title: "Blockchain & Web3 Course Launched",
      summary: "New elective on decentralized finance attracts record enrollment this semester across multiple faculties.",
      category: "tech",
      image: null,
      published_at: "2026-02-20T11:00:00Z",
      read_time: "6 min",
    },
  ],
  sports: [
    {
      article_id: 4,
      title: "MTI Wins Big at Annual Inter-University Sports Day",
      summary: "Students participated in various sports competitions during the annual sports day, promoting teamwork, health, and university spirit.",
      category: "sports",
      image: null,
      published_at: "2026-02-25T08:00:00Z",
      read_time: "6 min",
    },
    {
      article_id: 5,
      title: "Football Team Advances to Regional Finals",
      summary: "After a thrilling overtime victory, the campus football team has secured their spot in the regional championship next month.",
      category: "sports",
      image: null,
      published_at: "2026-02-22T12:00:00Z",
      read_time: "5 min",
    },
  ],
  events: [
    {
      article_id: 6,
      title: "Annual Fun Day Brings Record Attendance",
      summary: "A day full of games, music, food stalls and entertainment for all students and staff across the entire campus.",
      category: "events",
      image: null,
      published_at: "2026-02-22T10:00:00Z",
      read_time: "4 min",
    },
  ],
  research: [
    {
      article_id: 7,
      title: "New Research Lab Opens in Engineering Building",
      summary: "The university unveiled a state-of-the-art research facility focused on renewable energy and sustainable engineering solutions.",
      category: "research",
      image: null,
      published_at: "2026-02-20T11:00:00Z",
      read_time: "7 min",
    },
  ],
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const meta = CATEGORY_META[slug] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Latest news and updates for ${slug}.`,
  }

  useEffect(() => {
    if (!slug) return

    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      setNotFound(false)

      try {
        // --- MOCK START (delete this block when backend is ready) ---
        await new Promise((r) => setTimeout(r, 800))
        const data = MOCK_ARTICLES[slug] || []
        if (data.length === 0) setNotFound(true)
        setArticles(data)
        // --- MOCK END ---

        // --- REAL AXIOS CALL (uncomment when backend is ready) ---
        // const response = await axiosInstance.get('/articles/published', {
        //   params: { category: slug },
        // })
        // const data: Article[] = response.data
        // ============================================================
        // 🔧 BACKEND INTEGRATION POINT
        // Adjust if articles are nested:
        //   response.data       → Article[]
        //   response.data.data  → Article[]
        // If the backend returns 404 for unknown categories,
        // catch it below and set setNotFound(true)
        // ============================================================
        // if (data.length === 0) setNotFound(true)
        // setArticles(data)

      } catch (err: any) {
        if (err?.response?.status === 404) {
          setNotFound(true)
        } else {
          setError(
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Failed to load articles. Please try again."
          )
        }
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0] dark:bg-slate-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300 italic">
            Loading {meta.title}...
          </p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5f0] dark:bg-slate-950 gap-6">
        <h2 className="text-4xl font-bold text-black dark:text-white">Section Not Found</h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          The category <span className="font-semibold">"{slug}"</span> doesn't exist or has no articles yet.
        </p>
        <Button asChild>
          <Link href="/categories">← Back to All Sections</Link>
        </Button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0] dark:bg-slate-950">
        <div className="text-center space-y-4 max-w-md mx-auto px-6">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-lg text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 mt-10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-2"
          asChild
        >
          <Link href="/categories">
            <ArrowLeft className="h-4 w-4" /> Back to All Sections
          </Link>
        </Button>

        {/* Category Header */}
        <div className="border-b border-zinc-300 dark:border-zinc-700 pb-10 mb-14">
          <div className="uppercase tracking-[4px] text-xs text-zinc-500 mb-4">SECTION</div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-black dark:text-white">
            {meta.title}
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {meta.description}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <Link
              key={article.article_id}
              href={`/news/${article.article_id}`}
              className="group block"
            >
              <div className="relative">
                {/* Image */}
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={600}
                      height={340}
                      unoptimized
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
                      No Image
                    </div>
                  )}
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4 px-4 py-1 bg-white/90 dark:bg-black/80 text-xs font-medium tracking-widest text-black dark:text-white rounded-full">
                  {meta.title.toUpperCase()}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-2xl leading-tight text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors line-clamp-3">
                  {article.title}
                </h3>

                <p className="mt-5 text-[15px] text-zinc-600 dark:text-zinc-400 line-clamp-4 leading-relaxed">
                  {article.summary}
                </p>

                <div className="mt-6 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })
                      : "Recent"}
                  </div>
                  {article.read_time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.read_time} read
                    </div>
                  )}
                </div>

                <div className="mt-8 text-xs uppercase tracking-[2px] font-medium text-zinc-500 group-hover:text-black dark:group-hover:text-white inline-flex items-center gap-2">
                  READ FULL STORY →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20 pt-12 border-t border-zinc-300 dark:border-zinc-700">
          <Button variant="outline" size="lg" className="border-2 border-black dark:border-white" asChild>
            <Link href="/news">View All University News →</Link>
          </Button>
        </div>

      </div>
    </div>
  )
}



