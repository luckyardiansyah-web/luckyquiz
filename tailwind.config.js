/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#3b82f6',
        'electric-blue-hover': '#2563eb',
        'deep-navy': '#0f172a',
        'charcoal': '#1e293b',
        'charcoal-lighter': '#334155',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'primary': '#137fec',
        'background-light': '#f6f7f8',
        'background-dark': '#101922',
        'surface-dark': '#1c232d',
        'surface-light': '#ffffff',
        'emerald-accent': '#10B981',
        'crimson-accent': '#DC2626',
      },
      fontFamily: {
        'display': ['Lexend', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(59, 130, 246, 0.25)',
        'card': '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

