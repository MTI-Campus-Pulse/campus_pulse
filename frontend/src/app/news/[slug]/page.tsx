// 'use client'

// import { useEffect, useState } from "react"
// import Image from "next/image"
// import { useParams } from "next/navigation"
// import { Loader2 } from "lucide-react"

// interface Article {
//   article_id: number
//   title: string
//   summary: string
//   content: string
//   photo: string | null
//   scraped_at?: string
// }

// export default function NewsDetailPage() {
//   const params = useParams()
//   const id = params.slug

//   const [article, setArticle] = useState<Article | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchArticle() {
//       try {
//         const res = await fetch(`http://127.0.0.1:8000/articles/${id}`)
//         const data = await res.json()
//         setArticle(data)
//       } catch (err) {
//         console.error("Error loading article:", err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (id) fetchArticle()
//   }, [id])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//       </div>
//     )
//   }

//   if (!article) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl">
//         Article not found
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-16">

//       <h1 className="text-4xl font-bold mb-6">
//         {article.title}
//       </h1>

//       {article.photo && (
//         <div className="relative w-full h-[400px] mb-8">
//           <Image
//             src={article.photo}
//             alt={article.title}
//             fill
//             className="object-cover rounded-lg"
//             unoptimized
//           />
//         </div>
//       )}

//       <p className="text-gray-500 mb-6">
//         {article.scraped_at
//           ? new Date(article.scraped_at).toLocaleDateString()
//           : "Recent"}
//       </p>

//       <p className="text-lg leading-relaxed whitespace-pre-line">
//         {article.content}
//       </p>

//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from 'lucide-react'

interface Article {
  article_id: number
  title: string
  summary: string
  content: string
  photo: string | null
  scraped_at?: string
  author?: string
}

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/articles/${id}`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setArticle(data)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchArticle()
  }, [id])

  const readingTime = article?.content
    ? Math.max(1, Math.ceil(article.content.split(/\s+/).length / 225))
    : 0

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' 
      ? window.location.href 
      : `http://your-domain.com/news/${id}`

    const shareData = {
      title: article?.title || 'Campus News',
      text: article?.summary || 'Check out this article',
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      }
    } catch (err) {
      console.error('Share failed:', err)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      }
    }
  }

  const handleSave = () => {
    setSaved(!saved)
    
    // Optional: simple localStorage persistence
    if (!saved && article) {
      const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]')
      savedArticles.push({
        id: article.article_id,
        title: article.title,
        url: window.location.href,
        savedAt: new Date().toISOString()
      })
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          It might have been removed or there was an error loading it.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-10 bg-slate-50 dark:bg-slate-950 pb-20">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Back button at top of content */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-lg font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to news
        </button>

        {/* Title & meta */}
        <header className="mb-10 lg:mb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
            {article.author && (
              <div className="flex items-center gap-2">
                <span className="font-medium">{article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time>
                {article.scraped_at
                  ? new Date(article.scraped_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Recent'}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Hero image */}
        {article.photo && (
          <div className="relative w-full aspect-[16/9] mb-10 lg:mb-14 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={article.photo}
              alt={article.title}
              fill
              className="object-cover"
              priority
              quality={82}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Main content */}
        <div className="text-lg leading-8 text-slate-800 dark:text-slate-200 space-y-6 mb-16">
          <p className="whitespace-pre-line">
            {article.content}
          </p>
        </div>

        {/* Action buttons at the bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-6">
            <button
              onClick={handleSave}
              className={`flex items-center gap-3 px-5 py-3 rounded-lg border transition text-base font-medium ${
                saved 
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:border-indigo-500' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400'
              }`}
            >
              <Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
              {saved ? 'Saved' : 'Save Article'}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-3 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition text-base font-medium"
            >
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>

          {/* {shareSuccess && (
            <p className="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">
              {navigator.share ? 'Shared successfully!' : 'Link copied to clipboard!'}
            </p>
          )} */}
        </div>
      </main>
    </div>
  )
}