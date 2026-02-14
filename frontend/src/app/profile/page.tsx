'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Save, Mail, Lock, Phone, GraduationCap, Newspaper, ShieldCheck } from "lucide-react"

// Map category slugs → display names (same as in register page)
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

  // Phone editing state
  const [phone, setPhone] = useState("01234567890")
  const [tempPhone, setTempPhone] = useState(phone)
  const [isEditingPhone, setIsEditingPhone] = useState(false)

  // Profile data from registration (name + major)
  const [userName, setUserName] = useState("Guest User")
  const [userMajor, setUserMajor] = useState("")

  // News preferences from registration
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    // Load profile data (name + major)
    const savedProfile = localStorage.getItem('userProfile')
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
      } catch (err) {
        console.error("Failed to load profile data", err)
      }
    }

    // Load news preferences
    const savedInterests = localStorage.getItem('userNewsPreferences')
    if (savedInterests) {
      try {
        const parsed = JSON.parse(savedInterests)
        if (Array.isArray(parsed)) {
          setInterests(parsed)
        }
      } catch (err) {
        console.error("Failed to load news preferences", err)
      }
    }
  }, [])

  const handleSavePhone = () => {
    setPhone(tempPhone)
    setIsEditingPhone(false)
  }

  const handleCancelPhone = () => {
    setTempPhone(phone)
    setIsEditingPhone(false)
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-6 lg:px-8 mt-24 ">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/70 overflow-hidden">

          {/* Header – dynamic name & major */}
          <div className="px-8 pt-10 pb-12 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-linear-to-br from-slate-100 to-slate-200">
                    <img
                      src="/profile-placeholder.png"
                      alt="Profile picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-colors border border-slate-200">
                    <Pencil size={16} className="text-slate-600" />
                  </button>
                </div>

                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    {userName}
                  </h1>
                  <div className="mt-2 flex items-center gap-3 text-slate-600">
                    <GraduationCap size={20} className="text-indigo-600" />
                    <span className="text-lg font-medium">
                      {userMajor ? `${userMajor} Student` : "Student"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 self-start md:self-center">
                <Button variant="outline" size="lg">
                  Log Out
                </Button>
               
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-8 lg:p-10 space-y-10">

            {/* Row 1: Email + Password */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5  rounded-lg">
                    <Mail size={20} className="text-indigo-600" />
                  </div>
                  <label className="text-lg font-semibold text-slate-800">
                    Email Address
                  </label>
                </div>
                <div className="flex items-center gap-4 bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                  <Input
                    value="loayyasser@gmail.com"
                    disabled
                    className="bg-transparent border-none focus-visible:ring-0 text-slate-700 text-base flex-1"
                  />
                  
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5  rounded-lg">
                    <Lock size={20} className="text-rose-600" />
                  </div>
                  <label className="text-lg font-semibold text-slate-800">
                    Password
                  </label>
                </div>
                <div className="flex items-center gap-4 bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                  <Input
                    type="password"
                    value="************"
                    disabled
                    className="bg-transparent border-none focus-visible:ring-0 text-slate-700 text-base flex-1"
                  />
                  <Button variant="outline" size="lg" className="whitespace-nowrap">
                    Change Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Row 2: Major + Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Major */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5  rounded-lg">
                    <GraduationCap size={20} className="text-amber-600" />
                  </div>
                  <label className="text-lg font-semibold text-slate-800">
                    Major / Faculty
                  </label>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                  <Input
                    value={userMajor || "Computer Science"}
                    disabled
                    className="bg-transparent border-none focus-visible:ring-0 text-slate-700 text-base"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5  rounded-lg">
                    <Phone size={20} className="text-emerald-600" />
                  </div>
                  <label className="text-lg font-semibold text-slate-800">
                    Phone Number
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                  <Input
                    value={isEditingPhone ? tempPhone : phone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    disabled={!isEditingPhone}
                    className={
                      "bg-transparent border-none focus-visible:ring-0 text-slate-700 text-base flex-1" +
                      (isEditingPhone ? " bg-white border border-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400" : "")
                    }
                  />

                  {isEditingPhone ? (
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleCancelPhone}
                        className="flex-1 sm:flex-none"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-none"
                        onClick={handleSavePhone}
                      >
                        <Save size={18} className="mr-2" />
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 whitespace-nowrap"
                      onClick={() => setIsEditingPhone(true)}
                    >
                      <Pencil size={18} className="mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* News Preferences */}
            <div className="space-y-4 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-100 rounded-lg">
                    <Newspaper size={20} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    My News Preferences
                  </h3>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/auth/register')}
                >
                  <Pencil size={16} className="mr-2 h-4 w-4" />
                  Edit Preferences
                </Button>
              </div>

              {interests.length === 0 ? (
                <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-500 border border-slate-200">
                  You haven't selected any news categories yet.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {interests.map((slug) => (
                    <div
                      key={slug}
                      className="bg-indigo-50 text-indigo-800 px-4 py-2.5 rounded-full text-sm font-medium border border-indigo-100 shadow-sm"
                    >
                      {categoryLabels[slug] || slug}
                    </div>
                  ))}
                </div>
              )}
            </div>

            

          </div>
        </div>
      </div>
    </div>
  )
}