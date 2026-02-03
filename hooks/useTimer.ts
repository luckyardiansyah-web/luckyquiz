import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerOptions {
  initialSeconds: number
  onTick?: (timeRemaining: number) => void
  onExpire?: () => void
  autoStart?: boolean
}

interface UseTimerReturn {
  timeRemaining: number
  isRunning: boolean
  isWarning: boolean
  formattedTime: string
  start: () => void
  pause: () => void
  resume: () => void
  reset: (seconds?: number) => void
  setTime: (seconds: number) => void
}

export function useTimer({
  initialSeconds,
  onTick,
  onExpire,
  autoStart = false,
}: UseTimerOptions): UseTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasExpiredRef = useRef(false)

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Check if timer is in warning state (< 2 minutes)
  const isWarning = timeRemaining < 120 && timeRemaining > 0

  const start = useCallback(() => {
    setIsRunning(true)
    hasExpiredRef.current = false
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resume = useCallback(() => {
    setIsRunning(true)
  }, [])

  const reset = useCallback((seconds?: number) => {
    setTimeRemaining(seconds ?? initialSeconds)
    setIsRunning(false)
    hasExpiredRef.current = false
  }, [initialSeconds])

  const setTime = useCallback((seconds: number) => {
    setTimeRemaining(seconds)
  }, [])

  // Timer effect
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1

        if (newTime <= 0) {
          setIsRunning(false)
          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true
            onExpire?.()
          }
          return 0
        }

        onTick?.(newTime)
        return newTime
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, onTick, onExpire])

  return {
    timeRemaining,
    isRunning,
    isWarning,
    formattedTime: formatTime(timeRemaining),
    start,
    pause,
    resume,
    reset,
    setTime,
  }
}

export default useTimer
