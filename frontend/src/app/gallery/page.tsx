// app/gallery/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

// Mock data – replace with real API fetch later
const galleryItems = [
  {
    id: 1,
    src: '/public/newsimage/conference.jpg',
    title: 'Annual Tech Symposium 2025',
    caption: 'Students showcasing AI innovations to industry leaders',
    date: 'March 10, 2025',
    category: 'tech',
  },
  {
    id: 2,
    src: '/public/newsimage/funday.jpg',
    title: 'Interfaculty Sports Day',
    caption: 'Thrilling finals: Engineering vs Medicine basketball',
    date: 'February 28, 2025',
    category: 'sports',
  },
  {
    id: 3,
    src: '/public/newsimage/esports.jpg',
    title: 'Student Clubs Fair',
    caption: 'Discovering new passions with 50+ clubs',
    date: 'September 15, 2024',
    category: 'clubs',
  },
  {
    id: 4,
    src: '/public/newsimage/funday.jpg',
    title: 'Student Clubs Fair',
    caption: 'Discovering new passions with 50+ clubs',
    date: 'September 15, 2024',
    category: 'clubs',
  },
  {
    id: 5,
    src: '/public/newsimage/library.jpg',
    title: 'Student Clubs Fair',
    caption: 'Discovering new passions with 50+ clubs',
    date: 'September 15, 2024',
    category: 'clubs',
  },
  // Add more real images...
]

export default function GalleryPage() {
  const [selected, setSelected] = useState<typeof galleryItems[0] | null>(null)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black">
      {/* Hero Header – more immersive */}
      <div className="relative h-[50vh] min-h-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/campus-hero-bg.jpg" // ← use a beautiful campus wide-shot
            alt="Campus life"
            fill
            className="object-cover brightness-[0.85] scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Campus Moments
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Capturing the heart of university life — events, friendships, and milestones from our newsletters
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Filters – make them more stylish */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {['All', 'Events', 'Sports', 'Tech', 'Clubs', 'Academic'].map((cat) => (
            <Button
              key={cat}
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Improved Masonry Grid */}
        <div className="columns-3 sm:columns-3 lg:columns-3 xl:columns-3 gap-5 sm:gap-6 lg:gap-8 space-y-5 sm:space-y-6 lg:space-y-8">
          {galleryItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden break-inside-avoid group cursor-pointer bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                  <CardContent className="p-0 relative">
                    <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <div className="text-white space-y-1">
                          <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                          <p className="text-sm opacity-90">{item.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <Badge variant="secondary" className="mb-2">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                      <h3 className="font-medium text-base sm:text-lg line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.caption}</p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* Enhanced Lightbox */}
              <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden rounded-2xl">
                <div className="relative h-[60vh] sm:h-[75vh] lg:h-[80vh]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-10 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold">{item.title}</h2>
                  <p className="mt-2 text-base sm:text-lg opacity-90">{item.caption}</p>
                  <p className="mt-1 text-sm opacity-70">{item.date} • {item.category}</p>
                </div>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <Button size="lg" className="rounded-full px-10">
            Load More Moments
          </Button>
        </div>
      </div>
    </div>
  )
}