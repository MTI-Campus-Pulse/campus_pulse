'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerschema, registerschemaform } from '@/schema/register.schema'
import { Sparkles, Check, User, Phone, Calendar, Mail, Lock } from "lucide-react"

export default function Register() {
  const router = useRouter()

  // Step 2 categories
  const categories = [
    { id: "events", label: "Campus Events" },
    { id: "sports", label: "Sports" },
    { id: "tech", label: "Technology" },
    { id: "research", label: "Research" },
    { id: "announcements", label: "Announcements" },
    { id: "clubs", label: "Student Clubs" },
  ]

  const [step, setStep] = React.useState(1)

  const form = useForm<registerschemaform>({
    resolver: zodResolver(registerschema),
    defaultValues: {
      name: "",
      phone: "",
      date: "",
      email: "",
      password: "",
      repassword: "",
      
      interests: [],
    },
  })

  // Helper to show nice emojis for each category
  const getCategoryEmoji = (label: string) => {
    const map: Record<string, string> = {
      "Campus Events": "🎉",
      "Sports": "⚽",
      "Technology": "💻",
      "Research": "🔬",
      "Announcements": "📢",
      "Student Clubs": "👥",
    }
    return map[label] || "✨"
  }

  const goNext = async () => {
    const isValid = await form.trigger([
      "name",
      "phone",
      "date",
      "email",
      "password",
      "repassword",
    ])
    if (isValid) setStep(2)
  }

  function onsubmit(data: registerschemaform) {
    console.log("FINAL DATA:", data)

    localStorage.setItem('userNewsPreferences', JSON.stringify(data.interests || []))
    localStorage.setItem('userProfile', JSON.stringify({
      name: data.name.trim(),
      // major: data.major || "Not specified",
    }))

    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">
      {/* Modern Minimal Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-tight">CampusPulse</span>
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Step {step} of 2</div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto px-6 pb-6">
          <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            {/* ======================== STEP 1 ======================== */}
            {step === 1 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-10 md:p-14">
                <div className="text-center mb-12">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white">
                    Create your account
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Full Name - full width */}
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex font-extrabold items-center gap-3 text-base">
                          <User className="h-4 w-4 text-zinc-500" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ahmed Mohamed" className="h-14 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone + Date of Birth */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex font-extrabold items-center gap-3 text-base">
                            <Phone className="h-4 w-4 text-zinc-500" /> Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+20 1XX XXX XXXX" className="h-14 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="date"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex font-extrabold items-center gap-3 text-base">
                            <Calendar className="h-4 w-4 text-zinc-500" /> Date of Birth
                          </FormLabel>
                          <FormControl>
                            <Input type="date" className="h-14 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email - full width */}
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex font-extrabold items-center gap-3 text-base">
                          <Mail className="h-4 w-4 text-zinc-500" /> Email Address
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="loay.101060@cs.mti.edu.eg" className="h-14 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password + Confirm Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex font-extrabold items-center gap-3 text-base">
                            <Lock className="h-4 w-4 text-zinc-500" /> Password
                          </FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="At least 8 characters" className="h-14 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="repassword"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex font-extrabold items-center gap-3 text-base">
                            <Lock className="h-4 w-4 text-zinc-500" /> Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm password" className="h-14 text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={goNext}
                    className="w-full cursor-pointer h-16 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 transition-all rounded-2xl shadow-xl shadow-indigo-500/30 mt-6"
                  >
                    Continue to Interests →
                  </Button>
                </div>
              </div>
            )}

            {/* ======================== STEP 2 ======================== */}
            {step === 2 && (
              <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>

                  <div>
                    <h3 className="text-5xl font-bold tracking-tight text-black dark:text-white">
                      What sparks your interest?
                    </h3>
                    <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                      Choose the topics you want to see in your personalized campus feed.<br />
                      <span className="text-indigo-600 font-medium">You can change this anytime later.</span>
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-950 px-6 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    {form.watch("interests")?.length || 0} selected
                  </div>
                </div>

                {/* Interest Cards */}
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {categories.map((category) => {
                            const isSelected = field.value?.includes(category.id) ?? false

                            return (
                              <div
                                key={category.id}
                                onClick={() => {
                                  if (isSelected) {
                                    field.onChange(field.value?.filter((id: string) => id !== category.id) || [])
                                  } else {
                                    field.onChange([...(field.value || []), category.id])
                                  }
                                }}
                                className={`
                                  group relative cursor-pointer overflow-hidden rounded-3xl border-2 p-8 text-center
                                  transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl active:scale-[0.985]
                                  ${isSelected
                                    ? "border-transparent bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/30 text-white"
                                    : "border-zinc-200 dark:border-zinc-700 hover:border-indigo-400 bg-white dark:bg-slate-900"
                                  }
                                `}
                              >
                                {isSelected && (
                                  <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-lg">
                                    <Check className="h-5 w-5 text-indigo-600" strokeWidth={4} />
                                  </div>
                                )}

                                <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl text-6xl transition-all duration-300 ${isSelected ? "bg-white/20 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-5xl group-hover:scale-110"}`}>
                                  {getCategoryEmoji(category.label)}
                                </div>

                                <p className={`font-semibold text-2xl tracking-tight transition-colors ${isSelected ? "text-white" : "text-black dark:text-white group-hover:text-indigo-600"}`}>
                                  {category.label}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage className="text-center pt-3 text-base" />
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1 h-16 rounded-2xl border-2 text-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </Button>

                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-lg font-semibold shadow-xl shadow-indigo-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-3"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}