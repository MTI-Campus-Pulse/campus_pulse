'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Types
type Article = {
  article_id: number
  title: string
  summary: string
  category: string
  image: string
  published_at: string
}

type Category = {
  slug: string
  title: string
  description: string
  news: Article[]
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("http://localhost:8000/articles/published")
        if (!res.ok) throw new Error("Failed to fetch articles")
        const data: Article[] = await res.json()

        // Group by category
        const grouped: { [key: string]: Article[] } = {}
        data.forEach(article => {
          if (!grouped[article.category]) grouped[article.category] = []
          grouped[article.category].push(article)
        })

        // Map to categories array
        const categoriesArray: Category[] = Object.keys(grouped).map(cat => ({
          slug: cat,
          title: cat.charAt(0).toUpperCase() + cat.slice(1),
          description: `Latest news and updates for ${cat}.`,
          news: grouped[cat],
        }))

        setCategories(categoriesArray)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading articles...</div>
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-6xl font-bold text-black dark:text-white mb-8">Categories & Sections</h1>

        {categories.map((category) => (
          <section key={category.slug} className="border-b border-zinc-300 dark:border-zinc-700 pb-16 last:border-none last:pb-0">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-4xl font-bold text-black dark:text-white">{category.title}</h2>
              <Button asChild variant="outline">
                <Link href={`/categories/${category.slug}`}>All {category.title} Stories →</Link>
              </Button>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">{category.description}</p>

            <div className="flex gap-6 overflow-x-auto pb-6">
              {category.news.map((item) => (
                <Link key={item.article_id} href={`/news/${item.article_id}`} className="w-80 shrink-0 group">
                  <div className="h-56 bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-zinc-400">[PHOTO]</div>
                    )}
                  </div>
                  <h3 className="mt-4 font-bold text-xl text-black dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-4">{item.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}