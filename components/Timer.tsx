'use client'

import { useEffect } from 'react'
import { useTimer } from '@/hooks/useTimer'
import { useQuiz } from '@/context/QuizContext'

interface TimerProps {
  initialSeconds: number
  onExpire: () => void
}

export default function Timer({ initialSeconds, onExpire }: TimerProps) {
  const { quizState, saveQuizState } = useQuiz()
  const { timeRemaining, formattedTime, isWarning, start } = useTimer({
    initialSeconds,
    onExpire,
    autoStart: true,
    onTick: (time) => {
      // Update quiz state time remaining
      if (quizState) {
        quizState.timeRemaining = time
        saveQuizState()
      }
    },
  })

  useEffect(() => {
    start()
  }, [start])

  // Calculate progress percentage (0-100)
  const progress = (timeRemaining / initialSeconds) * 100
  const dashArray = 100
  const dashOffset = dashArray - (progress / 100) * dashArray

  return (
    <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-gray-200 shadow-sm">
      <div className="relative flex items-center justify-center size-12 rounded-full bg-gray-100">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={isWarning ? 'text-orange-500' : 'text-primary'}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray={`${progress}, 100`}
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
        <span className={`absolute material-symbols-outlined ${isWarning ? 'text-orange-500' : 'text-primary'}`}>
          timer
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Time Left
        </span>
        <span className={`text-xl font-bold font-display leading-none tabular-nums ${isWarning ? 'text-orange-500' : ''}`}>
          {formattedTime}
        </span>
      </div>
    </div>
  )
}