// 'use client'

// import { Button } from '@/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Eye, EyeOff, Lock, Mail } from 'lucide-react' // ← add lucide-react icons
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { loginschema, loginschemaform } from '@/schema/login.schema'

// export default function Login() {
//   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)

//   const form = useForm<loginschemaform>({
//     resolver: zodResolver(loginschema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   const isLoading = form.formState.isSubmitting

//   async function onSubmit(data: loginschemaform) {
//     // TODO: replace with real auth call
//     console.log('Login attempt:', data)
//     await new Promise((r) => setTimeout(r, 1200)) // fake delay
//     router.push('/')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
//       <Card className="w-full mt-18 max-w-2xl shadow-xl border-slate-200/70 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
//         <CardHeader className="space-y-1 pb-6 text-center">
//           <CardTitle className="text-3xl font-bold tracking-tight text-slate-800">
//             Welcome back
//           </CardTitle>
//           <CardDescription className="text-base text-slate-500">
//             Enter your credentials to access your account
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <Input
//                           type="email"
//                           placeholder="name@example.com"
//                           className="pl-10 h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
//                           {...field}
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <Input
//                           type={showPassword ? 'text' : 'password'}
//                           autoComplete="current-password"
//                           className="pl-10 pr-10 h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
//                           {...field}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="h-4 w-4" />
//                           ) : (
//                             <Eye className="h-4 w-4" />
//                           )}
//                         </button>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex items-center justify-between text-sm pt-1">
//                 <a
//                   href="#"
//                   className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
//                 >
//                   Forgot password?
//                 </a>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all mt-2 shadow-md hover:shadow-lg active:scale-[0.98]"
//               >
//                 {isLoading ? 'Signing in...' : 'Sign in'}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>

//         <CardFooter className="flex flex-col items-center justify-center gap-4 border-t bg-slate-50/60 pt-6 text-sm text-slate-500">
//           <p>
//             Don't have an account?{' '}
//             <a
//               href="/register"
//               className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
//             >
//               Create one now
//             </a>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginschema, loginschemaform } from '@/schema/login.schema'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<loginschemaform>({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: loginschemaform) {
    console.log('Login attempt:', data)
    await new Promise((r) => setTimeout(r, 1200)) // fake delay

    // =======================
    // ⚡ FRONTEND-ONLY ROLE LOGIC
    // =======================
    let role = 'student' // default role
    const email = data.email.toLowerCase()

    if (email.includes('manager')) role = 'manager'
    else if (email.includes('guest')) role = 'guest'

    // Save user info in localStorage
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: email.split('@')[0],
        role,
      })
    )

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full mt-18 max-w-2xl shadow-xl border-slate-200/70 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-800">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base text-slate-500">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10 h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          className="pl-10 pr-10 h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between text-sm pt-1">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all mt-2 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center gap-4 border-t bg-slate-50/60 pt-6 text-sm text-slate-500">
          <p>
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Create one now
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}