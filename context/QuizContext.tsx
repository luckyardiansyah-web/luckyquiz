'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Question, QuizState, QuizConfig, Answer, QuizResults } from '@/types/quiz'
import { quizService } from '@/services/quizService'
import { historyService } from '@/services/historyService'
import storage from '@/utils/localStorage'
import { STORAGE_KEYS, QUIZ_DURATION } from '@/utils/constants'
import { useAuth } from './AuthContext'

interface QuizContextType {
  quizState: QuizState | null
  isLoading: boolean
  error: string | null
  startQuiz: (config: QuizConfig) => Promise<void>
  answerQuestion: (answer: string) => void
  skipQuestion: () => void
  endQuiz: () => QuizResults
  clearQuiz: () => void
  saveQuizState: () => void
  loadQuizState: () => QuizState | null
  hasActiveQuiz: () => boolean
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user } = useAuth()
  const [quizState, setQuizState] = useState<QuizState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Save quiz state to localStorage whenever it changes
  useEffect(() => {
    if (quizState && quizState.isActive) {
      storage.set(STORAGE_KEYS.QUIZ_STATE, quizState)
    }
  }, [quizState])

  const startQuiz = async (config: QuizConfig) => {
    if (!user) {
      setError('User not authenticated')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const questions = await quizService.fetchQuestions(config.category, config.difficulty)

      const newQuizState: QuizState = {
        quizId: `quiz-${Date.now()}`,
        userId: user.id,
        config,
        questions,
        currentIndex: 0,
        answers: [],
        timeRemaining: QUIZ_DURATION,
        startTime: Date.now(),
        lastUpdated: Date.now(),
        isActive: true,
        isCompleted: false,
      }

      setQuizState(newQuizState)
      storage.set(STORAGE_KEYS.QUIZ_STATE, newQuizState)

      router.push('/quiz')
    } catch (err) {
      console.error('Error starting quiz:', err)
      setError('Failed to load quiz questions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const answerQuestion = useCallback((selectedAnswer: string) => {
    if (!quizState || !quizState.isActive) return

    const currentQuestion = quizState.questions[quizState.currentIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: 0, // Could track time per question if needed
    }

    const updatedAnswers = [...quizState.answers, newAnswer]
    const nextIndex = quizState.currentIndex + 1

    if (nextIndex >= quizState.questions.length) {
      // Quiz completed
      const completedState: QuizState = {
        ...quizState,
        answers: updatedAnswers,
        isActive: false,
        isCompleted: true,
        lastUpdated: Date.now(),
      }

      setQuizState(completedState)

      // Save completed state to localStorage before navigating
      storage.set(STORAGE_KEYS.QUIZ_STATE, completedState)

      // Use setTimeout to ensure state is saved before navigation
      setTimeout(() => {
        router.push('/results')
      }, 100)
    } else {
      // Move to next question
      setQuizState({
        ...quizState,
        currentIndex: nextIndex,
        answers: updatedAnswers,
        lastUpdated: Date.now(),
      })
    }
  }, [quizState, router])

  const skipQuestion = useCallback(() => {
    if (!quizState || !quizState.isActive) return

    const currentQuestion = quizState.questions[quizState.currentIndex]

    const skippedAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer: null,
      isCorrect: false,
      timeSpent: 0,
    }

    const updatedAnswers = [...quizState.answers, skippedAnswer]
    const nextIndex = quizState.currentIndex + 1

    if (nextIndex >= quizState.questions.length) {
      // Quiz completed
      const completedState: QuizState = {
        ...quizState,
        answers: updatedAnswers,
        isActive: false,
        isCompleted: true,
        lastUpdated: Date.now(),
      }

      setQuizState(completedState)

      // Save completed state to localStorage before navigating
      storage.set(STORAGE_KEYS.QUIZ_STATE, completedState)

      // Use setTimeout to ensure state is saved before navigation
      setTimeout(() => {
        router.push('/results')
      }, 100)
    } else {
      // Move to next question
      setQuizState({
        ...quizState,
        currentIndex: nextIndex,
        answers: updatedAnswers,
        lastUpdated: Date.now(),
      })
    }
  }, [quizState, router])

  const endQuiz = useCallback((): QuizResults => {
    if (!quizState) {
      throw new Error('No active quiz')
    }

    const totalQuestions = quizState.questions.length
    const answeredCount = quizState.answers.filter(a => a.selectedAnswer !== null).length
    const correctCount = quizState.answers.filter(a => a.isCorrect).length
    const incorrectCount = answeredCount - correctCount
    const unansweredCount = totalQuestions - answeredCount
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100)
    const timeTaken = QUIZ_DURATION - quizState.timeRemaining


    const results: QuizResults = {
      quizId: quizState.quizId,
      totalQuestions,
      answeredCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      scorePercentage,
      timeTaken,
      category: quizState.config.category.name,
      difficulty: quizState.config.difficulty,
    }

    // Save to history
    historyService.saveQuizResult({
      quizId: quizState.quizId,
      userId: quizState.userId,
      category: quizState.config.category.name,
      categoryIcon: quizState.config.category.icon,
      difficulty: quizState.config.difficulty,
      totalQuestions,
      correctCount,
      incorrectCount,
      unansweredCount,
      scorePercentage,
      completedAt: Date.now(),
      timeTaken,
    })

    // Clear quiz state
    setQuizState(null)
    storage.remove(STORAGE_KEYS.QUIZ_STATE)

    return results
  }, [quizState])

  const clearQuiz = useCallback(() => {
    setQuizState(null)
    storage.remove(STORAGE_KEYS.QUIZ_STATE)
  }, [])

  const saveQuizState = useCallback(() => {
    if (quizState) {
      storage.set(STORAGE_KEYS.QUIZ_STATE, {
        ...quizState,
        lastUpdated: Date.now(),
      })
    }
  }, [quizState])

  const loadQuizState = useCallback((): QuizState | null => {
    return storage.get<QuizState>(STORAGE_KEYS.QUIZ_STATE)
  }, [])

  const hasActiveQuiz = useCallback((): boolean => {
    const savedState = storage.get<QuizState>(STORAGE_KEYS.QUIZ_STATE)
    return savedState?.isActive === true && !savedState?.isCompleted
  }, [])

  return (
    <QuizContext.Provider
      value={{
        quizState,
        isLoading,
        error,
        startQuiz,
        answerQuestion,
        skipQuestion,
        endQuiz,
        clearQuiz,
        saveQuizState,
        loadQuizState,
        hasActiveQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
