'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Save, Mail, Lock, Phone, GraduationCap, Newspaper, User, LogOut, ArrowLeft } from "lucide-react"
import Link from 'next/link'

// Category labels
const categoryLabels: Record<string, string> = {
  events: "Campus Events",
  sports: "Sports",
  tech: "Technology",
  research: "Research",
  announcements: "Announcements",
  clubs: "Student Clubs",
}

export default function ProfilePage() {
  const router = useRouter()

  const [phone, setPhone] = useState("01234567890")
  const [tempPhone, setTempPhone] = useState(phone)
  const [isEditingPhone, setIsEditingPhone] = useState(false)

  const [userName, setUserName] = useState("Guest User")
  const [userMajor, setUserMajor] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [isGuest, setIsGuest] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    const savedInterests = localStorage.getItem('userNewsPreferences')

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        if (parsed.name) setUserName(parsed.name)
        if (parsed.major) {
          const majorMap: Record<string, string> = {
            computer_science: "Computer Science",
            information_systems: "Information Systems",
            engineering: "Engineering",
            business: "Business",
            medicine: "Medicine",
          }
          setUserMajor(majorMap[parsed.major] || parsed.major)
        }
        setIsGuest(false)
      } catch (err) {}
    }

    if (savedInterests) {
      try {
        setInterests(JSON.parse(savedInterests))
      } catch (err) {}
    }

    setLoading(false)
  }, [])

  const handleSavePhone = () => {
    setPhone(tempPhone)
    setIsEditingPhone(false)
  }

  const handleCancelPhone = () => {
    setTempPhone(phone)
    setIsEditingPhone(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-zinc-900 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (isGuest) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center space-y-8">
          <User className="h-20 w-20 mx-auto text-zinc-400" />
          <h1 className="text-4xl font-bold tracking-tight">Sign in to view your profile</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Personalize your experience, save preferences, and get tailored campus news.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild><Link href="/auth/register">Create Account</Link></Button>
            <Button variant="outline" size="lg" asChild><Link href="/auth/login">Login</Link></Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 pb-20 mt-15">

     

      <div className="max-w-5xl mx-auto px-6 pt-12">
        {/* Hero Profile Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-3 right-3 bg-white p-3 rounded-2xl shadow-lg hover:scale-110 transition-all">
              <Pencil size={20} className="text-zinc-700" />
            </button>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">{userName}</h1>
          <div className="flex items-center gap-2 mt-3 text-xl text-zinc-600 dark:text-zinc-400">
            <GraduationCap className="h-6 w-6" />
            {userMajor ? `${userMajor} Student` : "Student"}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-7 space-y-8">
            {/* Email */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Email Address</p>
                  <p className="text-2xl font-medium">loayyasser@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-2xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Phone Number</p>
                </div>
              </div>

              {isEditingPhone ? (
                <div className="flex gap-3">
                  <Input
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="text-2xl"
                  />
                  <Button onClick={handleSavePhone} className="px-8">Save</Button>
                  <Button variant="outline" onClick={handleCancelPhone}>Cancel</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-medium tracking-tight">{phone}</p>
                  <Button variant="outline" onClick={() => setIsEditingPhone(true)}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950 rounded-2xl flex items-center justify-center">
                  <Lock className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Password</p>
                  <p className="text-3xl tracking-widest">••••••••••••</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Change Password</Button>
            </div>
          </div>

          {/* Right Column - Major + Interests */}
          <div className="lg:col-span-5 space-y-8">
            {/* Major */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 h-fit">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Major / Faculty</p>
                  <p className="text-3xl font-medium">{userMajor || "Computer Science"}</p>
                </div>
              </div>
            </div>

            {/* News Preferences */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-2xl flex items-center justify-center">
                    <Newspaper className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">News Preferences</p>
                    <p className="font-semibold text-xl">What I follow</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push('/auth/register')}
                >
                  Edit
                </Button>
              </div>

              {interests.length === 0 ? (
                <p className="text-zinc-500 italic">No interests selected yet</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {interests.map((slug) => (
                    <div
                      key={slug}
                      className="px-5 py-3 bg-zinc-100 dark:bg-zinc-800 text-sm font-medium rounded-2xl"
                    >
                      {categoryLabels[slug] || slug}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logout */}
            <Button
              variant="outline"
              size="lg"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
              onClick={() => {
                localStorage.clear()
                router.push('/')
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}