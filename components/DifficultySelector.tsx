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
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</span>
        <h2 className="text-xl font-bold text-slate-800">Difficulty Level</h2>
      </div>
      <div className="space-y-4">
        {difficulties.map((difficulty) => {
          const isSelected = selectedDifficulty === difficulty
          const config = DIFFICULTY_LABELS[difficulty]

          return (
            <label key={difficulty} className="block cursor-pointer relative">
              <input
                className="peer sr-only"
                name="difficulty"
                type="radio"
                value={difficulty}
                checked={isSelected}
                onChange={() => onSelect(difficulty)}
              />
              <div
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isSelected
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white border-slate-100 hover:border-primary/50 text-slate-700'
                  }`}
              >
                <span className={`font-semibold ${isSelected ? 'text-white' : ''} capitalize`}>{config.label}</span>
                <div className={`flex gap-1 ${isSelected ? 'text-white' : config.color}`}>
                  {Array.from({ length: config.stars }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg">
                      star
                    </span>
                  ))}
                </div>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}