
// Extended news data (same slugs as home page + more details)
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, Clock, Share2, Bookmark, Heart } from "lucide-react"

// Your news data (same slugs as home page)
const newsData = [
  {
    slug: "ai-conference",
    title: "AI Conference at MTI",
    category: "Technology",
    date: "January 15, 2026",
    readTime: "8 min read",
    author: "Dr. Hesham ElDeeb",
    excerpt: "MTI University hosted an international AI conference with experts from all over the world discussing the latest advancements in artificial intelligence and machine learning applications in education.",
    fullContent: `
The two-day conference brought together over 450 researchers, professors, industry leaders and students from 28 countries.

Key highlights:
• Keynote by Prof. Maria Gonzalez: "AI for Sustainable Education in 2030"
• Panel on Ethical AI in University Governance
• 62 research paper presentations (45 accepted)
• Launch of MTI AI Innovation Lab (Fall 2026 opening announced)

The event concluded with the signing of 4 international collaboration agreements and a student hackathon prize ceremony.
    `,
    image: "/public/slider/university1.webp", // add real image later
  },
  {
    slug: "sports-day",
    title: "Annual Sports Day",
    category: "Sports",
    date: "November 20, 2025",
    author: "Sports Committee",
    excerpt: "Students participated in various sports competitions during the annual sports day, promoting teamwork, health, and university spirit across all faculties.",
    fullContent: `
This year's theme "One Campus – One Spirit" saw record participation of 1,400+ students.

Events included:
• Inter-faculty football & basketball finals
• 100m sprint, long jump, relay races
• Tug-of-war, volleyball tournament
• Faculty vs students fun matches

Winners received trophies and medals during the closing ceremony attended by the university president and deans.
    `,
    image: "/news/sports-day-hero.jpg",
  },
  {
    slug: "fun-day",
    title: "Annual Fun Day",
    category: "Campus Life",
    date: "December 5, 2025",
    author: "Student Activities",
    excerpt: "A day full of games, music, food stalls and entertainment for all students and staff.",
    fullContent: `
The annual Fun Day featured:
• Live music performances
• Food trucks and BBQ zone
• Giant games (Jenga, twister, sack race)
• Photo booths and carnival games
• Raffle draw with prizes

Over 2,000 attendees enjoyed a relaxing day of laughter and community bonding.
    `,
    image: "/news/fun-day-hero.jpg",
  },
]

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // This line is the fix: await params!
  const { slug } = await params

  const article = newsData.find((item) => item.slug === slug)

  if (!article) {
    notFound()
  }

  // Optional: related articles (exclude current one)
  const related = newsData.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-100 w-full overflow-hidden">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-blue-800" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-16 text-white">
          <div className="max-w-5xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6">
              {article.category}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-2xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm md:text-base opacity-90">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                {article.date}
              </div>
              
              <div className="flex items-center gap-2">
                <span>By</span>
                <span className="font-medium">{article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
        <Button
          variant="ghost"
          className="mb-10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </Button>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-10 font-medium">
            {article.excerpt}
          </p>

          <div className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200">
            {article.fullContent}
          </div>
        </article>

        {/* Share buttons */}
        <div className="flex flex-wrap items-center gap-6 mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 size={16} />
            Share
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Heart size={16} />
            Like
          </Button>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40 bg-linear-to-br from-indigo-100 to-blue-100 dark:from-slate-700 dark:to-slate-600">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs font-medium">
                      [Image]
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}