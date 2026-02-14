'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

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
]

export default function FAQPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggle = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 space-y-6 mb-24">
      <h1 className="text-3xl font-bold mb-8 text-center underline text-gray-900">
        Frequently Asked Questions
      </h1>

      {faqs.map((faq, idx) => {
        const isExpanded = expanded === idx
        const el = contentRefs.current[idx]
        const fullHeight = el ? el.scrollHeight : 0

        return (
          <div
            key={idx}
            className="bg-white border border-zinc-200 rounded-2xl shadow-md overflow-hidden transition-all duration-500"
          >
            {/* Question */}
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggle(idx)}
            >
              <h2 className="text-xl font-semibold">
                {faq.question}
              </h2>
            </div>

            {/* Answer */}
            <div
              ref={(el) => {
                contentRefs.current[idx] = el
              }}
              className="px-6 transition-all duration-500"
              style={{
                height: isExpanded
                  ? fullHeight
                  : Math.floor(fullHeight * 0.6),
                overflow: "hidden",
              }}
            >
              <p className="text-gray-700 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>


            {/* Button */}
            <div className="px-6 py-4 text-right">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => toggle(idx)}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}



