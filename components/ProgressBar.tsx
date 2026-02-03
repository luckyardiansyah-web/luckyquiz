'use client'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="flex flex-col gap-3 mb-10">
      <div className="flex justify-between items-end">
        <p className="text-base font-medium text-gray-600 dark:text-gray-300">
          Question {current}{' '}
          <span className="text-gray-400 dark:text-gray-600 font-normal">of {total}</span>
        </p>
        <span className="text-sm font-bold text-primary">{percentage}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-surface-dark overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
