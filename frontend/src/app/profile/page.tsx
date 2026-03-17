'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Pencil, Save, X, Mail, Lock, Phone, GraduationCap, Newspaper, 
  User, LogOut, ArrowLeft, Camera 
} from "lucide-react"
import Link from 'next/link'

// Category labels + optional colors
const categoryStyles: Record<string, { label: string; color: string }> = {
  events:       { label: "Campus Events",       color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" },
  sports:       { label: "Sports",              color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
  tech:         { label: "Technology",          color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
  research:     { label: "Research",            color: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300" },
  announcements:{ label: "Announcements",       color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
  clubs:        { label: "Student Clubs",       color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300" },
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
      } catch {}
    }

    if (savedInterests) {
      try {
        setInterests(JSON.parse(savedInterests))
      } catch {}
    }

    setLoading(false)
  }, [])

  const handleSavePhone = () => {
    setPhone(tempPhone)
    setIsEditingPhone(false)
    // TODO: persist to backend / localStorage
  }

  const handleCancelPhone = () => {
    setTempPhone(phone)
    setIsEditingPhone(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:from-slate-950 dark:to-slate-900 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16">
        {/* Profile Header */}
        <Card className="overflow-hidden border-none shadow-xl mb-10">
          <div className="h-32 sm:h-48 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <CardContent className="relative px-6 pb-10 pt-0 sm:pt-4 -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-8 border-background shadow-2xl">
                  <AvatarImage src="/profile-placeholder.png" alt={userName} />
                  <AvatarFallback className="text-4xl bg-linear-to-br from-indigo-400 to-purple-500 text-white">
                    {userName.slice(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute bottom-2 right-2 rounded-full shadow-md"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center sm:text-left space-y-2 flex-1">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{userName}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-xl text-muted-foreground">
                  <GraduationCap className="h-6 w-6" />
                  <span>{userMajor ? `${userMajor} Student` : "Student"}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                <Button variant="outline" size="icon" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={() => {
                    localStorage.clear()
                    router.push('/')
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Log Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl">Email Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-medium">loayyasser@gmail.com</p>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl">Phone Number</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingPhone ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="text-xl"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSavePhone}>
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                      <Button variant="outline" onClick={handleCancelPhone}>
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-medium tracking-tight">{phone}</p>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingPhone(true)}>
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <CardTitle className="text-xl">Password</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl tracking-widest text-muted-foreground mb-4">••••••••••••</p>
                <Button variant="outline" className="w-full sm:w-auto">
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            {/* Major */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl">Major / Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-medium">{userMajor || "Not set"}</p>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="h-max flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                    <Newspaper className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">News Preferences</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push('/preferences')}>
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="flex-1">
                {interests.length === 0 ? (
                  <p className="text-muted-foreground italic py-6">
                    No interests selected yet — add some to personalize your feed!
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {interests.map((slug) => {
                      const style = categoryStyles[slug] || { label: slug, color: "bg-muted text-muted-foreground" }
                      return (
                        <Badge 
                          key={slug} 
                          variant="secondary"
                          className={`px-4 py-2 text-sm font-medium rounded-xl ${style.color}`}
                        >
                          {style.label}
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}