'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { loginschema, loginschemaform } from '@/schema/login.schema'
import { useRouter } from 'next/navigation' // <-- correct import

export default function Login() {
    const router = useRouter() // <-- use the hook

    const form = useForm<loginschemaform>({
        resolver: zodResolver(loginschema),
        defaultValues: {
            email:'',
            password:'',
        }
    })

    function onsubmit(data: loginschemaform) {
        console.log(data)
        // TODO: check email & password against backend or static data
        router.push('/') // <-- navigate to home page
    }

    return (
        <div className='mt-30 mb-30'>
            <h2 className='text-green-700 text-2xl text-center mb-6'>Login Now</h2>
            <Form {...form}>
                <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onsubmit)}>
                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                
                        name='password'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' autoComplete='off' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='bg-blue-600 text-white my-5'>
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    )
}
