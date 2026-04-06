'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How do I register for courses?",
    answer:
      "You can register for courses through the university portal. Make sure you meet all prerequisites and check the schedule before confirming your registration. After registration, you will receive a confirmation email with your course details.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Refunds are available if you drop a course within the first two weeks. After that period, partial refunds may be granted under special circumstances. Always check the official guidelines and submit requests through the finance office.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "To reset your password, click on 'Forgot Password' on the login page. You will receive an email with a link to reset your password securely. Make sure to choose a strong password and do not share it with anyone.",
  },
  {
    question: "Where can I find the academic calendar?",
    answer:
      "The official academic calendar is available on the university website under the 'Students' section. It includes important dates for registration, exams, holidays, and graduation ceremonies.",
  },
]

export default function FAQPage() {
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggle = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">

     

      <div className="max-w-4xl mx-auto px-6 py-16 mt-10">
        {/* Page Header */}
        <div className="text-center border-b border-zinc-300 dark:border-zinc-700 pb-12 mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <HelpCircle className="h-10 w-10 text-zinc-400" />
          </div>
          <div className="uppercase tracking-[4px] text-xs text-zinc-500 mb-3">ASK THE CAMPUS</div>
          <h1 className="text-6xl font-bold tracking-tight text-black dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Everything you need to know about life at MTI University
          </p>
        </div>

        {/* FAQ Items – Newspaper Style */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => {
            const isExpanded = expanded === idx

            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-zinc-300 dark:border-zinc-700 rounded-none overflow-hidden shadow-sm hover:shadow transition-all"
              >
                {/* Question */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-8 py-7 text-left flex items-center justify-between group hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-black dark:text-white pr-8">
                    {faq.question}
                  </h2>
                  <div className="text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0">
                    {isExpanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 px-8 pb-8 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <p className="text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Help CTA */}
        <div className="text-center mt-20 pt-12 border-t border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6">
            Still have questions?
          </p>
          <Button size="lg" className="border-2 border-black dark:border-white text-base px-10" asChild>
            <Link href="/contact">Contact Student Affairs →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}



