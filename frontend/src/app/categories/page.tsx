// 'use client'

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"

// // Types
// type Article = {
//   article_id: number
//   title: string
//   summary: string
//   category: string
//   image: string
//   published_at: string
// }

// type Category = {
//   slug: string
//   title: string
//   description: string
//   news: Article[]
// }

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchArticles() {
//       try {
//         const res = await fetch("http://localhost:8000/articles/published")
//         if (!res.ok) throw new Error("Failed to fetch articles")
//         const data: Article[] = await res.json()

//         // Group by category
//         const grouped: { [key: string]: Article[] } = {}
//         data.forEach(article => {
//           if (!grouped[article.category]) grouped[article.category] = []
//           grouped[article.category].push(article)
//         })

//         // Map to categories array
//         const categoriesArray: Category[] = Object.keys(grouped).map(cat => ({
//           slug: cat,
//           title: cat.charAt(0).toUpperCase() + cat.slice(1),
//           description: `Latest news and updates for ${cat}.`,
//           news: grouped[cat],
//         }))

//         setCategories(categoriesArray)
//       } catch (error) {
//         console.error(error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchArticles()
//   }, [])

//   if (loading) {
//     return <div className="text-center mt-20 text-xl">Loading articles...</div>
//   }

//   return (
//     <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif mt-20">
//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <h1 className="text-6xl font-bold text-black dark:text-white mb-8">Categories & Sections</h1>

//         {categories.map((category) => (
//           <section key={category.slug} className="border-b border-zinc-300 dark:border-zinc-700 pb-16 last:border-none last:pb-0">
//             <div className="flex justify-between items-end mb-6">
//               <h2 className="text-4xl font-bold text-black dark:text-white">{category.title}</h2>
//               <Button asChild variant="outline">
//                 <Link href={`/categories/${category.slug}`}>All {category.title} Stories →</Link>
//               </Button>
//             </div>
//             <p className="text-zinc-600 dark:text-zinc-400 mb-6">{category.description}</p>

//             <div className="flex gap-6 overflow-x-auto pb-6">
//               {category.news.map((item) => (
//                 <Link key={item.article_id} href={`/news/${item.article_id}`} className="w-80 shrink-0 group">
//                   <div className="h-56 bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
//                     {item.image ? (
//                       <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-xs text-zinc-400">[PHOTO]</div>
//                     )}
//                   </div>
//                   <h3 className="mt-4 font-bold text-xl text-black dark:text-white">{item.title}</h3>
//                   <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-4">{item.summary}</p>
//                 </Link>
//               ))}
//             </div>
//           </section>
//         ))}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle } from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"

type Article = {
  article_id: number
  title: string
  summary: string
  category: string
  image: string | null
  published_at: string
}

type Category = {
  slug: string
  title: string
  description: string
  news: Article[]
}

// ============================================================
// 🔧 MOCK DATA (delete this when backend is ready)
// Simulates the response from GET /articles/published
// ============================================================
const MOCK_ARTICLES: Article[] = [
  {
    article_id: 1,
    title: "AI Conference at MTI Draws Global Experts",
    summary: "MTI University hosted an international AI conference with experts from all over the world discussing the latest advancements in artificial intelligence.",
    category: "tech",
    image: null,
    published_at: "2026-02-28T10:00:00Z",
  },
  {
    article_id: 2,
    title: "New Machine Learning Lab Opens on Campus",
    summary: "A state-of-the-art machine learning lab has opened its doors to students and researchers, equipped with high-end GPUs and cloud access.",
    category: "tech",
    image: null,
    published_at: "2026-02-25T09:00:00Z",
  },
  {
    article_id: 3,
    title: "MTI Wins Big at Annual Inter-University Sports Day",
    summary: "Students participated in various sports competitions during the annual sports day, promoting teamwork, health, and university spirit.",
    category: "sports",
    image: null,
    published_at: "2026-02-25T08:00:00Z",
  },
  {
    article_id: 4,
    title: "Football Team Advances to Regional Finals",
    summary: "After a thrilling overtime victory, the campus football team has secured their spot in the regional championship next month.",
    category: "sports",
    image: null,
    published_at: "2026-02-22T12:00:00Z",
  },
  {
    article_id: 5,
    title: "Annual Fun Day Brings Record Attendance",
    summary: "A day full of games, music, food stalls and entertainment for all students and staff across the entire campus.",
    category: "events",
    image: null,
    published_at: "2026-02-22T10:00:00Z",
  },
  {
    article_id: 6,
    title: "New Research Lab Opens in Engineering Building",
    summary: "The university unveiled a state-of-the-art research facility focused on renewable energy and sustainable engineering solutions.",
    category: "research",
    image: null,
    published_at: "2026-02-20T11:00:00Z",
  },
]

// ============================================================
// Category metadata — labels and descriptions per slug
// ============================================================
const CATEGORY_META: Record<string, { title: string; description: string }> = {
  events:        { title: "Campus Events",  description: "Everything happening on campus — don't miss out." },
  sports:        { title: "Sports",         description: "Latest results, highlights, and sports news." },
  tech:          { title: "Technology",     description: "Tech innovations, labs, and digital campus news." },
  research:      { title: "Research",       description: "Discoveries and academic research from our faculty." },
  announcements: { title: "Announcements",  description: "Official updates and notices from the university." },
  clubs:         { title: "Student Clubs",  description: "Activities and news from student organizations." },
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)

      try {
        // --- MOCK START (delete this block when backend is ready) ---
        await new Promise((r) => setTimeout(r, 900))
        const data: Article[] = MOCK_ARTICLES
        // --- MOCK END ---

        // --- REAL AXIOS CALL (uncomment when backend is ready) ---
        // const response = await axiosInstance.get('/articles/published')
        // const data: Article[] = response.data
        // ============================================================
        // 🔧 BACKEND INTEGRATION POINT
        // Adjust if articles are nested:
        //   response.data         → Article[]
        //   response.data.data    → Article[]
        // ============================================================

        // Group articles by category
        const grouped: Record<string, Article[]> = {}
        data.forEach((article) => {
          if (!grouped[article.category]) grouped[article.category] = []
          grouped[article.category].push(article)
        })

        // Build categories array using metadata if available
        const categoriesArray: Category[] = Object.keys(grouped).map((slug) => ({
          slug,
          title: CATEGORY_META[slug]?.title || slug.charAt(0).toUpperCase() + slug.slice(1),
          description: CATEGORY_META[slug]?.description || `Latest news and updates for ${slug}.`,
          news: grouped[slug],
        }))

        setCategories(categoriesArray)

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

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0] dark:bg-slate-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300 italic">
            Loading sections...
          </p>
        </div>
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
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h1 className="text-6xl font-bold text-black dark:text-white mb-16">
          Categories & Sections
        </h1>

        {categories.length === 0 ? (
          <p className="text-center text-zinc-500 dark:text-zinc-400 py-20 italic text-xl">
            No articles available yet. Check back later.
          </p>
        ) : (
          <div className="space-y-0">
            {categories.map((category) => (
              <section
                key={category.slug}
                className="border-b border-zinc-300 dark:border-zinc-700 py-16 last:border-none"
              >
                {/* Category Header */}
                <div className="flex justify-between items-end mb-3">
                  <h2 className="text-4xl font-bold text-black dark:text-white">
                    {category.title}
                  </h2>
                  <Button asChild variant="outline">
                    <Link href={`/categories/${category.slug}`}>
                      All {category.title} Stories →
                    </Link>
                  </Button>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  {category.description}
                </p>

                {/* Horizontal Scroll Articles */}
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                  {category.news.map((item) => (
                    <Link
                      key={item.article_id}
                      href={`/news/${item.article_id}`}
                      className="w-80 shrink-0 group"
                    >
                      {/* Image */}
                      <div className="h-52 bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700 group-hover:shadow-lg transition-shadow duration-300">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="mt-4 space-y-2">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 tracking-wide">
                          {item.published_at
                            ? new Date(item.published_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                              })
                            : "Recent"}
                        </p>
                        <h3 className="font-bold text-xl text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 text-sm leading-relaxed">
                          {item.summary}
                        </p>
                        <span className="inline-block text-xs font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline pt-1">
                          Read full story →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}