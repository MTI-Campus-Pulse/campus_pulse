'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1300))
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900 rounded-3xl flex items-center justify-center mb-8">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4">Message Sent!</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Thank you for reaching out.<br />
            We will reply as soon as possible.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', email: '', subject: '', message: '' })
            }}
            className="mt-10 h-14 px-10 text-lg bg-gradient-to-r from-indigo-600 to-violet-600"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Have questions about CampusPulse? Want to collaborate or report an issue?<br />
            We’re here to help.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-10 relative z-10">
        {/* Main Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-10 md:p-14">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Full Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ahmed Mohamed"
                  required
                  className="h-14 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="h-14 text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Subject</label>
              <Select onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                <SelectTrigger className="h-14 text-base">
                  <SelectValue placeholder="What is this about?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                  <SelectItem value="Technical Support">Technical Support</SelectItem>
                  <SelectItem value="Suggestion">Suggestion / Feedback</SelectItem>
                  <SelectItem value="Partnership">Partnership / Collaboration</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={7}
                required
                className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 px-6 py-5 text-base focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 transition-all rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                'Sending Message...'
              ) : (
                <>
                  <Send className="h-6 w-6" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Quick Contact Info - Now with proper spacing */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Mail className="h-8 w-8 text-indigo-600 mb-3" />
            <p className="font-medium">Email</p>
            <a href="mailto:info@mti.edu.eg" className="text-indigo-600 hover:underline text-sm mt-1">
              info@mti.edu.eg
            </a>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="h-8 w-8 text-emerald-600 mb-3" />
            <p className="font-medium">Phone</p>
            <a href="tel:+20123456789" className="text-emerald-600 hover:underline text-sm mt-1">
              +20 123 456 789
            </a>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="h-8 w-8 text-amber-600 mb-3" />
            <p className="font-medium">Location</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
              Al Mokkatam, Egypt
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}