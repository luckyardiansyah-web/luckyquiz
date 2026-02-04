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
    <div className="gradient-bg-light min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white overflow-hidden relative">
      {/* Animated floating shapes */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute top-[20%] right-[10%] w-[20rem] h-[20rem] bg-primary-light/30 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[30%] left-[15%] w-[15rem] h-[15rem] bg-primary-lighter/25 rounded-full blur-[60px] animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="glass-card w-full max-w-[440px] flex flex-col rounded-3xl p-8 md:p-10 shadow-card-hover animate-slide-up">
          <div className="flex flex-col items-center gap-5 mb-8 text-center">
            {/* Logo with gradient */}
            <div className="size-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow mb-1 animate-bounce-slow">
              <svg className="size-9 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LuckyQuiz ✨
              </h1>
              <p className="text-text-secondary text-sm md:text-base font-normal">
                Sign in to start your quiz adventure!
              </p>
            </div>
          </div>

          <LoginForm />

          <div className="mt-8 text-center border-t border-gray-200 pt-6">
            <p className="text-text-secondary text-sm">
              Don't have an account?
              <a className="text-primary font-semibold hover:text-primary-dark transition-colors ml-1" href="#">
                Sign Up Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
