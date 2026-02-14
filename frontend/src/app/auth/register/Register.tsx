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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
      major: "",
      interests: [],
    },
  })

  const goNext = async () => {
    const isValid = await form.trigger([
      "name",
      "phone",
      "date",
      "email",
      "password",
      "repassword",
      "major",
    ])
    if (isValid) setStep(2)
  }

  function onsubmit(data: registerschemaform) {
    console.log("FINAL DATA:", data)

    // Save interests to localStorage for profile page
    localStorage.setItem('userNewsPreferences', JSON.stringify(data.interests || []))
    localStorage.setItem('userProfile', JSON.stringify({
    name: data.name.trim(),
    major: data.major,
  }))

    router.push('/auth/login')
  }

  return (
    <div className='mt-20 pb-12'>
      <h2 className='text-green-700 text-2xl font-bold text-center mb-8'>Register Now</h2>

      <Form {...form}>
        <form className='w-full max-w-2xl mx-auto px-4' onSubmit={form.handleSubmit(onsubmit)}>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <FormField name='name' control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name='phone' control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl><Input type='tel' placeholder="+20 1XX XXX XXXX" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name='date' control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl><Input type='date' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name='email' control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type='email' placeholder="example@domain.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name='password' control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' autoComplete='new-password' placeholder="At least 8 characters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name='repassword' control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' autoComplete='new-password' placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="major" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Major</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your major" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="computer_science">Computer Science</SelectItem>
                      <SelectItem value="information_systems">Information Systems</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="pt-4">
                <Button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                  onClick={goNext}
                >
                  Continue to Interests →
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center text-slate-800">
                Choose the news you care about
              </h3>

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categories.map((category) => {
                          const checked = field.value?.includes(category.id)
                          return (
                            <div
                              key={category.id}
                              onClick={() => {
                                if (checked) {
                                  field.onChange(field.value.filter((v) => v !== category.id))
                                } else {
                                  field.onChange([...(field.value || []), category.id])
                                }
                              }}
                              className={
                                "cursor-pointer rounded-xl border p-10 text-center transition-all " +
                                (checked
                                  ? "border-blue-400 bg-blue-500 shadow-sm"
                                  : "border-slate-200 hover:border-blue-400 hover:shadow")
                              }
                            >
                              <input type="checkbox" checked={checked} readOnly className="hidden" />
                              <p className="font-bold text-slate-700">{category.label}</p>
                            </div>
                          )
                        })}
                      </div>
                    </FormControl>
                    <FormMessage className="text-center pt-2" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-6 text-lg"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                >
                  Finish Registration
                </Button>
              </div>
            </div>
          )}

        </form>
      </Form>
    </div>
  )
}
