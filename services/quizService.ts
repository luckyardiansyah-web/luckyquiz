import type { Question, OpenTDBResponse, OpenTDBQuestion, Difficulty, Category } from '@/types/quiz'
import { decodeHTML } from '@/utils/htmlDecode'
import { shuffleArray } from '@/utils/shuffleArray'
import { QUESTION_COUNT } from '@/utils/constants'

const OPENTDB_API = process.env.NEXT_PUBLIC_OPENTDB_API || 'https://opentdb.com/api.php'

export const quizService = {
  async fetchQuestions(
    category: Category,
    difficulty: Difficulty
  ): Promise<Question[]> {
    try {
      const url = `${OPENTDB_API}?amount=${QUESTION_COUNT}&category=${category.id}&difficulty=${difficulty}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }

      const data: OpenTDBResponse = await response.json()

      if (data.response_code !== 0) {
        throw new Error(`OpenTDB error: ${data.response_code}`)
      }

      return data.results.map((q: OpenTDBQuestion, index: number) => 
        this.parseQuestion(q, index)
      )
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  },

  parseQuestion(openTDBQuestion: OpenTDBQuestion, index: number): Question {
    const { type, difficulty, category, question, correct_answer, incorrect_answers } = openTDBQuestion

    // Decode HTML entities
    const decodedQuestion = decodeHTML(question)
    const decodedCorrectAnswer = decodeHTML(correct_answer)
    const decodedIncorrectAnswers = incorrect_answers.map(decodeHTML)

    // Combine and shuffle answers
    const allAnswers = shuffleArray([decodedCorrectAnswer, ...decodedIncorrectAnswers])
    const correctIndex = allAnswers.indexOf(decodedCorrectAnswer)

    return {
      id: `q-${Date.now()}-${index}`,
      type: type === 'boolean' ? 'boolean' : 'multiple',
      difficulty: difficulty as Difficulty,
      category: decodeHTML(category),
      question: decodedQuestion,
      correctAnswer: decodedCorrectAnswer,
      incorrectAnswers: decodedIncorrectAnswers,
      allAnswers,
      correctIndex,
    }
  },
}
