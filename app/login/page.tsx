'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/home')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="bg-deep-navy text-text-primary font-display min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-deep-navy text-text-primary font-display min-h-screen flex flex-col antialiased selection:bg-electric-blue selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[100px] opacity-70"></div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="glass-card w-full max-w-[440px] flex flex-col rounded-2xl p-8 md:p-10 shadow-card">
          <div className="flex flex-col items-center gap-5 mb-8 text-center">
            <div className="size-14 bg-gradient-to-br from-electric-blue to-blue-700 rounded-xl flex items-center justify-center shadow-glow mb-1">
              <svg className="size-8 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Quiz Master</h1>
              <p className="text-text-secondary text-sm md:text-base font-normal">
                Enter your credentials to access your dashboard
              </p>
            </div>
          </div>

          <LoginForm />

          <div className="mt-8 text-center border-t border-charcoal-lighter/30 pt-6">
            <p className="text-text-secondary text-sm">
              Don&apos;t have an account?
              <a className="text-white font-semibold hover:text-electric-blue transition-colors ml-1" href="#">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
