'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"

interface Article {
  article_id: number
  title: string
  summary: string
  content: string
  photo: string | null
  scraped_at?: string
}

export default function NewsDetailPage() {
  const params = useParams()
  const id = params.slug

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/articles/${id}`)
        const data = await res.json()
        setArticle(data)
      } catch (err) {
        console.error("Error loading article:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchArticle()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Article not found
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        {article.title}
      </h1>

      {article.photo && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={article.photo}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>
      )}

      <p className="text-gray-500 mb-6">
        {article.scraped_at
          ? new Date(article.scraped_at).toLocaleDateString()
          : "Recent"}
      </p>

      <p className="text-lg leading-relaxed whitespace-pre-line">
        {article.content}
      </p>

    </div>
  )
}