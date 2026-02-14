/*import { notFound } from "next/navigation"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold">
      
        Category: {slug}
      </h1>
    </div>
  )
}*/
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

const categories = [
  {
    slug: "technology",
    title: "Technology",
    news: [
      { title: "AI Research Breakthrough", excerpt: "New AI models developed by university researchers..." },
      { title: "Cybersecurity Workshop", excerpt: "A hands-on workshop focused on modern security threats..." },
      { title: "New Computer Labs", excerpt: "State-of-the-art labs opened for CS students..." },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    news: [
      { title: "Annual Sports Day", excerpt: "Students competed in various athletic events..." },
      { title: "Football Team Wins", excerpt: "The university football team secured first place..." },
      { title: "New Gym Facilities", excerpt: "Modern gym equipment now available for students..." },
    ],
  },
];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Find the category
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto mt-30 mb-30 px-4 space-y-12">
      <h1 className="text-3xl font-bold mb-8 underline text-gray-900">{category.title}</h1>

      <div className="flex flex-wrap gap-6">
        {category.news.map((newsItem, idx) => (
          <div
            key={idx}
            className="flex-1 border border-zinc-200 rounded-xl p-5 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">{newsItem.title}</h3>
            <p className="text-zinc-600 text-sm">{newsItem.excerpt}</p>
          </div>
        ))}
      </div>

      {/* Optional: a "See More" button if you have more news in the future */}
      <div className="text-right">
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          See More
        </Button>
      </div>
    </div>
  );
}




