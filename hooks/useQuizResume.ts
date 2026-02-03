import { useEffect, useState } from 'react'
import { useQuiz } from '@/context/QuizContext'
import type { QuizState } from '@/types/quiz'

interface UseQuizResumeReturn {
  hasResumableQuiz: boolean
  resumableQuiz: QuizState | null
  checkForResumableQuiz: () => void
}

export function useQuizResume(): UseQuizResumeReturn {
  const { loadQuizState } = useQuiz()
  const [hasResumableQuiz, setHasResumableQuiz] = useState(false)
  const [resumableQuiz, setResumableQuiz] = useState<QuizState | null>(null)

  const checkForResumableQuiz = () => {
    const savedQuiz = loadQuizState()
    
    if (savedQuiz && savedQuiz.isActive && !savedQuiz.isCompleted) {
      setHasResumableQuiz(true)
      setResumableQuiz(savedQuiz)
    } else {
      setHasResumableQuiz(false)
      setResumableQuiz(null)
    }
  }

  useEffect(() => {
    checkForResumableQuiz()
  }, [])

  return {
    hasResumableQuiz,
    resumableQuiz,
    checkForResumableQuiz,
  }
}

export default useQuizResume
