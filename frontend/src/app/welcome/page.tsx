'use client'

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function Welcome() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 sm:px-8 md:px-12">
        <div className="w-full max-w-4xl mx-auto text-center space-y-10 md:space-y-12 animate-fade-in-up">
          {/* Badge / tag */}
          <div className="inline-flex items-center mt-15 gap-2 px-5 py-2 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/30 dark:border-slate-700/50 shadow-sm">
            <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Welcome to the new era of campus life
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              CampusPulse
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Your university's central hub for real-time news, events, announcements, and everything happening on campus.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 sm:pt-10">
            <Link href="/auth/register">
              <Button 
                size="lg"
                className="h-14 px-10 text-lg font-medium bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/20 transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/auth/login">
              <Button 
                variant="outline"
                size="lg"
                className="h-14 px-10 text-lg font-medium border-2 border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm transition-all duration-300"
              >
                Already have an account? Login
              </Button>
            </Link>
          </div>

          {/* Trust signals / small text */}
          <div className="pt-8 md:pt-12 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <span>Real-time updates</span>
            <span className="hidden sm:inline">•</span>
            <span>Personalized feed</span>
            <span className="hidden sm:inline">•</span>
            <span>Free for all students</span>
            <span className="hidden sm:inline">•</span>
            <span>Secure & private</span>
          </div>
        </div>
      </div>
    </div>
  )
}