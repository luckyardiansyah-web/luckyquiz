'use client'

import type { Difficulty } from '@/types/quiz'
import { DIFFICULTY_LABELS } from '@/utils/constants'

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty
  onSelect: (difficulty: Difficulty) => void
}

export default function DifficultySelector({ selectedDifficulty, onSelect }: DifficultySelectorProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

  return (
    <div className="flex-1">
      <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4">
        2. Difficulty Level
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {difficulties.map((difficulty) => {
          const isSelected = selectedDifficulty === difficulty
          const config = DIFFICULTY_LABELS[difficulty]

          return (
            <label key={difficulty} className="cursor-pointer relative">
              <input
                className="peer sr-only"
                name="difficulty"
                type="radio"
                value={difficulty}
                checked={isSelected}
                onChange={() => onSelect(difficulty)}
              />
              <div className="flex flex-col gap-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark p-4 items-center text-center transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-lg dark:peer-checked:shadow-[0_0_20px_0_rgba(19,127,236,0.6)] peer-hover:border-primary/50">
                <div className={`flex gap-0.5 ${config.color}`}>
                  {Array.from({ length: config.stars }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined font-bold">
                      star
                    </span>
                  ))}
                </div>
                <h4 className="text-gray-900 dark:text-white font-bold">{config.label}</h4>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
