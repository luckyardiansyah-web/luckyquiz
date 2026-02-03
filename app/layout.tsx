import type { Metadata } from 'next'
import { Lexend, Noto_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { QuizProvider } from '@/context/QuizContext'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LuckyQuiz - Test Your Knowledge',
  description: 'Challenge yourself with quizzes across multiple categories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${lexend.variable} ${notoSans.variable} font-display`}>
        <AuthProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
