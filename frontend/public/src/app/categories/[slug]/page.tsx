import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

const categories = [
  {
    slug: "technology",
    title: "Technology",
    description: "Latest innovations, AI research, cybersecurity, and digital transformation happening at MTI University.",
    news: [
      { 
        title: "AI Research Breakthrough at MTI", 
        excerpt: "University researchers develop new multimodal AI model that outperforms current benchmarks in reasoning and vision tasks.",
        date: "Feb 5, 2026",
        readTime: "8 min",
        image: "/news/ai-breakthrough.jpg"
      },
      { 
        title: "Cybersecurity Summit 2026", 
        excerpt: "Leading experts share strategies to protect campus networks from emerging quantum threats.",
        date: "Jan 28, 2026",
        readTime: "7 min",
        image: "/news/cyber-summit.jpg"
      },
      { 
        title: "New High-Performance Computing Cluster", 
        excerpt: "State-of-the-art GPU cluster now available for student research and machine learning courses.",
        date: "Jan 15, 2026",
        readTime: "5 min",
        image: "/news/hpc-cluster.jpg"
      },
      { 
        title: "Blockchain & Web3 Course Launched", 
        excerpt: "New elective on decentralized finance attracts record enrollment this semester.",
        date: "Dec 20, 2025",
        readTime: "6 min",
        image: "/news/blockchain-course.jpg"
      },
      { 
        title: "Quantum Computing Workshop Series", 
        excerpt: "Hands-on labs using Qiskit and real quantum hardware simulation.",
        date: "Nov 10, 2025",
        readTime: "9 min",
        image: "/news/quantum-workshop.jpg"
      },
      { 
        title: "AR Campus Navigation App Released", 
        excerpt: "New augmented reality app helps freshmen navigate classrooms and facilities.",
        date: "Oct 15, 2025",
        readTime: "4 min",
        image: "/news/ar-app.jpg"
      },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    description: "University teams, tournaments, fitness events, and the vibrant sports culture at MTI.",
    news: [
      { 
        title: "Annual Inter-Faculty Sports Festival", 
        excerpt: "Record participation across 15 sports with Computer Science winning the overall trophy.",
        date: "Feb 8, 2026",
        readTime: "6 min",
        image: "/news/sports-festival.jpg"
      },
      { 
        title: "MTI Football Team Wins Regional Cup", 
        excerpt: "Dramatic 3–2 victory in the final against rival university.",
        date: "Jan 30, 2026",
        readTime: "5 min",
        image: "/news/football-cup.jpg"
      },
      { 
        title: "New Olympic-Standard Athletics Track", 
        excerpt: "Modern synthetic track and field facilities now open for training and competitions.",
        date: "Jan 20, 2026",
        readTime: "4 min",
        image: "/news/athletics-track.jpg"
      },
      { 
        title: "Women's Basketball League Champions", 
        excerpt: "Undefeated season ends with championship title and MVP award.",
        date: "Dec 18, 2025",
        readTime: "5 min",
        image: "/news/basketball-champs.jpg"
      },
      { 
        title: "Campus Fitness Challenge Results", 
        excerpt: "Over 1,200 students participated — top performers recognized in grand ceremony.",
        date: "Nov 25, 2025",
        readTime: "4 min",
        image: "/news/fitness-challenge.jpg"
      },
      { 
        title: "Swimming Team Breaks Records", 
        excerpt: "Three new university records set at the national student championships.",
        date: "Nov 12, 2025",
        readTime: "5 min",
        image: "/news/swimming-records.jpg"
      },
    ],
  },
]

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
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
            {category.title}
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {category.description}
          </p>
        </div>

        {/* News Grid – Newspaper Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {category.news.map((newsItem, idx) => (
            <Link
              key={idx}
              href={`/news/${category.slug}-${idx}`}
              className="group block"
            >
              <div className="relative">
                {/* Image */}
                <div className="aspect-video w-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
                  <Image
                    src={newsItem.image}
                    alt={newsItem.title}
                    width={600}
                    height={340}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4 px-4 py-1 bg-white/90 dark:bg-black/80 text-xs font-medium tracking-widest text-black dark:text-white">
                  {category.title.toUpperCase()}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-2xl leading-tight text-black dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors line-clamp-3">
                  {newsItem.title}
                </h3>

                <p className="mt-5 text-[15px] text-zinc-600 dark:text-zinc-400 line-clamp-4 leading-relaxed">
                  {newsItem.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {newsItem.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {newsItem.readTime} read
                  </div>
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



