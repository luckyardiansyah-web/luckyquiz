'use client'

import type { Category } from '@/types/quiz'

interface CategorySelectorProps {
  categories: Category[]
  selectedCategory: Category | null
  onSelect: (category: Category) => void
}

export default function CategorySelector({ categories, selectedCategory, onSelect }: CategorySelectorProps) {
  return (
    <div className="mb-0">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</span>
        <h2 className="text-xl font-bold text-slate-800">Select Category</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => {
          const isSelected = selectedCategory?.id === category.id
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category)}
              className={`group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-center flex flex-col items-center gap-4 ${isSelected
                ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5'
                : 'border-slate-100'
                }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isSelected
                  ? 'bg-primary text-white'
                  : 'bg-slate-50 text-slate-500 icon-bg'
                  }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                  {category.icon}
                </span>
              </div>
              <span className={`font-semibold ${isSelected ? 'text-primary' : 'text-slate-700'}`}>
                {category.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}