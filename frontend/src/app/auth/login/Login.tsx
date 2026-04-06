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
// import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
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
//     console.log('Login attempt:', data)
//     await new Promise((r) => setTimeout(r, 1200)) // fake delay

//     // =======================
//     // ⚡ FRONTEND-ONLY ROLE LOGIC
//     // =======================
//     let role = 'student' // default role
//     const email = data.email.toLowerCase()

//     if (email.includes('manager')) role = 'manager'
//     else if (email.includes('guest')) role = 'guest'

//     // Save user info in localStorage
//     localStorage.setItem(
//       'user',
//       JSON.stringify({
//         name: email.split('@')[0],
//         role,
//       })
//     )

//     router.push('/dashboard')
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
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
//               href="/auth/register"
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
// import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { loginschema, loginschemaform } from '@/schema/login.schema'

// export default function Login() {
//   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState('')

//   const form = useForm<loginschemaform>({
//     resolver: zodResolver(loginschema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   const isLoading = form.formState.isSubmitting

//   async function onSubmit(data: loginschemaform) {
//     setError('')
//     await new Promise((r) => setTimeout(r, 800)) // fake delay

//     // =======================
//     // ⚡ FRONTEND-ONLY MOCK LOGIN
//     // =======================
//     const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
//     const user = registeredUsers.find((u: { email: string }) => u.email.toLowerCase() === data.email.toLowerCase())

//     if (!user) {
//       setError('User not found. Please register first.')
//       return
//     }

//     if (user.password !== data.password) {
//       setError('Incorrect password.')
//       return
//     }

//     // Successful login → save user info
//     localStorage.setItem(
//       'user',
//       JSON.stringify({
//         name: user.name,
//         role: user.role,
//         email: user.email,
//       })
//     )

//     router.push('/dashboard')
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
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Error message */}
//               {error && <p className="text-red-500 text-sm">{error}</p>}

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
//               href="/auth/register"
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
import axiosInstance from '@/lib/axiosInstance'

// ============================================================
// 🔧 BACKEND INTEGRATION POINT
// Confirm these route names with your backend team and adjust
// if any route path is different.
// ============================================================
const ROLE_ROUTES: Record<string, string> = {
  student:         '/dashboard',
  admin:           '/dashboard',
  manager:         '/dashboard',
  council:         '/dashboard',
  supreme_council: '/dashboard',
  naqaae:          '/dashboard',
  media_adviser:   '/dashboard',
  quality:   '/dashboard',
  ministry:   '/dashboard',
  president:   '/dashboard',
}

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const form = useForm<loginschemaform>({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: loginschemaform) {
    setApiError(null)

    // ============================================================
    // 🔧 BACKEND INTEGRATION POINT
    // Payload sent to the backend.
    // Confirm field names with your backend team.
    // ============================================================
    const payload = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    }

    try {
      // --- MOCK START (delete this block when backend is ready) ---
      await new Promise((r) => setTimeout(r, 800)) // simulate network delay
      console.log("📦 Login payload (ready for backend):", payload)

      // Simulate a backend response for testing the role-based redirect.
      // Change the role below to test different dashboards:
      //   'student' | 'admin' | 'manager' | 'council' |
      //   'supreme_council' | 'naqaae' | 'media_adviser'
      const mockResponse = {
        token: 'mock-token-123',
        user: {
          name: 'Ahmed Mohamed',
          email: payload.email,
          role: 'manager', // ← change this to test other roles
        },
      }
      // Treat mock as a successful response
      const { token, user } = mockResponse
      // --- MOCK END ---

      // --- REAL AXIOS CALL (uncomment when backend is ready) ---
      // const response = await axiosInstance.post('/auth/login', payload)
      // const { token, user } = response.data
      // ============================================================
      // 🔧 BACKEND INTEGRATION POINT
      // Adjust the destructuring above to match your backend's
      // response shape. Common patterns:
      //   { token, user: { name, email, role } }
      //   { access_token, user: { name, email, role } }
      // ============================================================

      // ✅ Save token and user info for use across the app
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      }))

      // ✅ Redirect based on role
      const route = ROLE_ROUTES[user.role]
      if (route) {
        router.push(route)
      } else {
        // Unknown role → fallback, backend team should never send an unlisted role
        setApiError('Your account role is not recognized. Please contact support.')
      }

    } catch (error: any) {
      // ============================================================
      // 🔧 BACKEND INTEGRATION POINT
      // Adjust field names to match your backend's error response:
      //   { message: "Invalid credentials" }
      //   { error: "Invalid credentials" }
      // ============================================================
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid email or password. Please try again.'
      setApiError(errorMessage)
    }
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

              {/* API Error message */}
              {apiError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {apiError}
                </div>
              )}

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
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all mt-2 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
              href="/auth/register"
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