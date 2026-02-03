# LuckyQuiz - Interactive Quiz Application

A modern, full-featured quiz application built with Next.js, TypeScript, and Tailwind CSS. Challenge yourself with quizzes across multiple categories powered by the Open Trivia Database API.

## ✨ Features

### 🔐 Authentication
- **Mock Authentication System** with admin/admin credentials
- Protected routes with automatic redirects
- Session persistence with localStorage

### 🎯 Quiz Functionality
- **10 Categories**: Computers, History, Sports, Geography, Film, Science, Art, Animals, Music, Games
- **3 Difficulty Levels**: Easy, Medium, Hard
- **Fixed 10 Questions** per quiz
- **Mixed Question Types**: Multiple choice (4 options) and True/False (2 options)
- **Dynamic Layout**: Adaptive UI based on question type
- **Auto-advance**: Seamless transition after answer selection
- **Skip Option**: Mark questions as unanswered

### ⏱️ Timer System
- **15-Minute Countdown** that runs continuously
- **Visual Progress Indicator** with circular timer
- **Warning State** when less than 2 minutes remain
- **Auto-submit** when timer expires
- **Persistent Timer** across page reloads

### 💾 State Persistence
- **Auto-save** after each answer
- **Resume Quiz Modal** on page reload
- **Choose to Resume or Start New**
- **Multi-tab Support** with timestamp-based sync
- **Browser Close Recovery** - never lose progress

### 📊 Results & History
- **Comprehensive Results** with score percentage
- **Statistics Display**: Correct, Incorrect, Total questions
- **Quiz History** tracking in localStorage
- **Leaderboard** with rankings based on average scores
- **Detailed History View** with all past quizzes

### 🎨 Beautiful UI
- **Glassmorphism Design** on login page
- **Dark Mode** throughout the app
- **Smooth Animations** and transitions
- **Responsive Design** for all screen sizes
- **Material Symbols Icons**
- **Custom Color Palettes** per page

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd kuis
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔑 Login Credentials

**Username:** admin  
**Password:** admin

## 📁 Project Structure

\`\`\`
kuis/
├── app/                        # Next.js App Router pages
│   ├── api/auth/              # Authentication API routes
│   ├── login/                 # Login page
│   ├── home/                  # Dashboard
│   ├── config/                # Quiz configuration
│   ├── quiz/                  # Quiz question page
│   ├── results/               # Results summary
│   ├── history/               # Quiz history
│   ├── leaderboard/           # Top performers
│   ├── layout.tsx             # Root layout with providers
│   └── globals.css            # Global styles
├── components/                 # React components
│   ├── LoginForm.tsx
│   ├── Header.tsx
│   ├── CategorySelector.tsx
│   ├── DifficultySelector.tsx
│   ├── QuestionCard.tsx
│   ├── Timer.tsx
│   ├── ProgressBar.tsx
│   ├── ResultsSummary.tsx
│   ├── ResumeQuizModal.tsx
│   ├── QuizHistoryCard.tsx
│   └── ProtectedRoute.tsx
├── context/                    # React Context
│   ├── AuthContext.tsx
│   └── QuizContext.tsx
├── hooks/                      # Custom hooks
│   ├── useAuth.ts
│   ├── useTimer.ts
│   ├── useLocalStorage.ts
│   └── useQuizResume.ts
├── services/                   # API services
│   ├── authService.ts
│   ├── quizService.ts
│   └── historyService.ts
├── types/                      # TypeScript types
│   ├── auth.ts
│   ├── quiz.ts
│   └── history.ts
├── utils/                      # Utility functions
│   ├── constants.ts
│   ├── htmlDecode.ts
│   ├── shuffleArray.ts
│   └── localStorage.ts
└── public/                     # Static assets
\`\`\`

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Storage**: localStorage
- **API**: OpenTDB (Open Trivia Database)
- **Icons**: Material Symbols Outlined
- **Fonts**: Lexend, Noto Sans (Google Fonts)

## 📱 Key Pages

### Login Page
- Glassmorphism card design
- Form validation
- Mock authentication
- Auto-redirect if already logged in

### Home Dashboard
- Quick actions: Start Quiz, View History, Leaderboard
- Resume quiz modal if incomplete quiz exists
- Clean, modern card-based layout

### Quiz Configuration
- Select from 10 categories with icons
- Choose difficulty level (Easy/Medium/Hard)
- Fixed 10 questions display
- Start quiz button

### Quiz Page
- One question per page
- Timer with circular progress
- Progress bar (Question X of 10)
- Dynamic layout (2 or 4 answer options)
- Auto-advance on answer selection
- Skip question option
- Resumed badge if quiz was resumed

### Results Page
- Large circular score percentage
- Statistics grid (Correct/Incorrect/Total)
- Category and difficulty display
- Restart quiz or back to home options
- Beautiful gradient background with glow effects

### History Page
- List of all completed quizzes
- Score percentage, date, category
- Circular progress indicators
- Correct/incorrect counts

### Leaderboard Page
- Rankings by average score
- Medal icons for top 3 performers
- Statistics: Average score, total quizzes, best score
- Sorted by performance

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

\`\`\`env
NEXT_PUBLIC_OPENTDB_API=https://opentdb.com/api.php
\`\`\`

### Quiz Settings

Modify in \`utils/constants.ts\`:

- \`QUIZ_DURATION\`: Quiz timer duration (default: 900 seconds / 15 minutes)
- \`TIMER_WARNING_THRESHOLD\`: When to show warning (default: 120 seconds / 2 minutes)
- \`QUESTION_COUNT\`: Number of questions per quiz (default: 10)
- \`CATEGORIES\`: Quiz categories with OpenTDB IDs

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - Click Deploy

3. **Environment Variables**
   - Add environment variables in Vercel dashboard if needed
   - NEXT_PUBLIC_OPENTDB_API is optional (uses default)

### Manual Deployment

\`\`\`bash
npm run build
\`\`\`

Upload the \`.next\` folder and \`package.json\` to your hosting provider.

## 🎮 How to Play

1. **Login** with admin/admin credentials
2. **Choose a category** from 10 available options
3. **Select difficulty** (Easy, Medium, or Hard)
4. **Start the quiz** - 10 questions with 15-minute timer
5. **Answer questions** - auto-advance after selection
6. **Skip if needed** - questions marked as unanswered
7. **Complete or timeout** - view your results
8. **Check history** - see all past quizzes
9. **Leaderboard** - compete for top scores

## 🌟 Features in Detail

### Resume Quiz
- Automatically detects incomplete quizzes on page load
- Shows modal with quiz details (category, difficulty, progress, time left)
- Choose to resume from where you left off or start a new quiz
- Works even after browser close or page refresh

### Timer Always Running
- Timer continues even when tab is inactive
- Saves time remaining to localStorage every second
- Restores exact time when resuming quiz
- Warning color when less than 2 minutes remain

### Multi-tab Sync
- Last write wins approach with timestamps
- Quiz state synchronized across tabs
- Prevents conflicts with timestamp checks

### Question Types
- **Multiple Choice**: 4 options in 2x2 grid, labeled A-D
- **True/False**: 2 options in 1-2 column layout
- Dynamic UI adapts to question type automatically

### Leaderboard Calculation
- Aggregates all quiz history from localStorage
- Calculates average score per user
- Sorts by average score descending
- Shows total quizzes taken and best score

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Credits

- Quiz questions powered by [Open Trivia Database](https://opentdb.com/)
- Icons from [Google Material Symbols](https://fonts.google.com/icons)
- Fonts: Lexend and Noto Sans from Google Fonts

## 🐛 Known Issues

- None currently! Report issues if you find any.

## 🔮 Future Enhancements

- [ ] User registration and multiple user accounts
- [ ] Real-time multiplayer quiz mode
- [ ] Custom quiz creation
- [ ] Social sharing of results
- [ ] Dark/light theme toggle
- [ ] Sound effects and animations
- [ ] Achievement badges
- [ ] Mobile app version

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
