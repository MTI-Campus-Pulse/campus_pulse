import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  {
    slug: "technology",
    title: "Technology",
    news: [
      {
        title: "AI Research Breakthrough",
        excerpt: "New AI models developed by university researchers...",
      },
      {
        title: "Cybersecurity Workshop",
        excerpt: "A hands-on workshop focused on modern security threats...",
      },
      {
        title: "New Computer Labs",
        excerpt: "State-of-the-art labs opened for CS students...",
      },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    news: [
      {
        title: "Annual Sports Day",
        excerpt: "Students competed in various athletic events...",
      },
      {
        title: "Football Team Wins",
        excerpt: "The university football team secured first place...",
      },
      {
        title: "New Gym Facilities",
        excerpt: "Modern gym equipment now available for students...",
      },
      
    ],
  },
]

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto mt-30 px-4 space-y-12 mb-20">
      {categories.map((category) => (
        <section
          key={category.slug}
          className="bg-white border border-zinc-200 rounded-2xl shadow-md p-8"
        >
          {/* Category title */}
          <h2 className="text-2xl font-bold mb-6 underline">
            {category.title}
          </h2>

          {/* News cards */}
          <div className="flex gap-6 mb-8">
            {category.news.map((item, index) => (
              <div
                key={index}
                className="flex-1 border border-zinc-200 rounded-xl p-5 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-600 text-sm">
                  {item.excerpt}
                </p>
              </div>
            ))}
          </div>

          {/* See more */}
          <div className="text-right">
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href={`/categories/${category.slug}`}>
                See more
              </Link>
            </Button>
          </div>
        </section>
      ))}
    </div>
  )
}
