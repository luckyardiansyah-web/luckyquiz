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
        // Purple gradient color scheme
        'primary': '#7C3AED', // Updated to match user request
        'primary-dark': '#6D28D9',
        'primary-light': '#A78BFA',
        'primary-lighter': '#C4B5FD',
        'primary-lightest': '#EDE9FE',
        'primary-soft': '#8B5CF6', // Added from HTML template

        // Accent purples

        // Accent purples
        'accent': '#6366F1', // Indigo
        'accent-dark': '#4F46E5',
        'accent-light': '#818CF8',

        // Success/Danger (purple tinted)
        'success': '#A78BFA', // Light purple for correct
        'success-dark': '#8B5CF6',
        'danger': '#C084FC', // Purple-pink for incorrect
        'danger-dark': '#A855F7',

        // Background colors
        'bg-light': '#FEFEFE', // Almost white
        'bg-light-secondary': '#F9FAFB',

        // Text colors
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',

        // Legacy colors (for compatibility)
        'electric-blue': '#8B5CF6',
        'deep-navy': '#1E1B4B',
        'charcoal': '#312E81',
        'emerald-accent': '#A78BFA',
        'crimson-accent': '#C084FC',
      },
      fontFamily: {
        'display': ['Lexend', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '1.5rem', // From HTML template
        '4xl': '2rem',   // From HTML template
        '2.5xl': '2.5rem', // For the rounded-[2.5rem] usage
      },
      boxShadow: {
        'glow': '0 0 30px rgba(139, 92, 246, 0.3)',
        'glow-light': '0 0 20px rgba(139, 92, 246, 0.2)',
        'card': '0 10px 30px -5px rgba(139, 92, 246, 0.1)',
        'card-hover': '0 20px 40px -10px rgba(139, 92, 246, 0.2)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}


