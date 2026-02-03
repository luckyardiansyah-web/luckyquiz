'use client'

import type { Category } from '@/types/quiz'

interface CategorySelectorProps {
  categories: Category[]
  selectedCategory: Category | null
  onSelect: (category: Category) => void
}

export default function CategorySelector({ categories, selectedCategory, onSelect }: CategorySelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
        1. Select Category
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {categories.map((category) => {
          const isSelected = selectedCategory?.id === category.id
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category)}
              className={`cursor-pointer group flex flex-col gap-3 rounded-xl p-4 items-center justify-center text-center transition-all duration-200 ${
                isSelected
                  ? 'border-2 border-primary bg-primary/10 dark:bg-primary/20 shadow-md shadow-primary/10'
                  : 'border border-gray-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10'
              }`}
            >
              <div
                className={`p-3 rounded-full transition-colors ${
                  isSelected
                    ? 'bg-surface-light dark:bg-white/10 text-primary dark:text-white'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                  {category.icon}
                </span>
              </div>
              <h2 className="text-gray-900 dark:text-white text-base font-bold leading-tight">{category.name}</h2>
            </button>
          )
        })}
      </div>
    </div>
  )
}
