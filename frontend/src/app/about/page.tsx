 // src/app/about/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, Target, Heart, Globe, Mail, MapPin, Phone } from 'lucide-react'

export default function AboutUsPage() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            About CampusPulse
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Connecting the MTI community through real-time news, events, and campus life — made by students, for students.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-20">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-5">Our Mission</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              To create the most reliable, fast, and personalized source of information for every MTI student, faculty member, and staff — helping everyone stay connected and never miss what matters on campus.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center mb-6">
              <Heart className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-5">Our Vision</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              To become the heartbeat of MTI University — a vibrant, inclusive digital community where every voice is heard, every event is celebrated, and every student feels truly part of campus life.
            </p>
          </div>
        </div>

        {/* Who We Are */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">
            Who We Are
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            CampusPulse was created in 2026 by a group of passionate MTI students who wanted a better way to stay informed and connected.  
            What started as a small project in a dorm room has grown into the central platform for thousands of students, faculty, and staff.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Globe, title: "Community First", text: "We build features based on what students actually need and use every day." },
            { icon: Users, title: "Inclusivity", text: "Every faculty, club, event, and voice on campus deserves to be seen and heard." },
            { icon: Target, title: "Real-Time Accuracy", text: "Fast, verified updates so you never miss important news or deadlines." },
          ].map((value, i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-linear-to-br from-indigo-100 to-blue-100 dark:from-indigo-950/50 dark:to-blue-950/50 flex items-center justify-center">
                <value.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {value.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {value.text}
              </p>
            </div>
          ))}
        </div>

        {/* Contact & CTA */}
        <div className="text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-10 md:p-16 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
            Have questions, suggestions, or want to contribute? We'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Button size="lg" className="gap-2" asChild>
              <a href="mailto:support@campuspulse.edu">
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="https://instagram.com/campuspulse" target="_blank" rel="noopener noreferrer">
               {/* <Instagram className="h-5 w-5" />*/}
                Follow on Instagram
              </a>
            </Button>
          </div>

          <p className="text-slate-500 dark:text-slate-400">
            CampusPulse • MTI University • Cairo, Egypt
          </p>
        </div>
      </div>
    </div>
  )
}