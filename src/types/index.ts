export type QuestionType = "multiple" | "boolean";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface Question {
  type: QuestionType;
  difficulty: QuestionDifficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}

export interface QuestionResponse {
  response_code: number;
  results: Question[];
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryResponse {
  trivia_categories: Category[];
}

export interface QuestionParams {
  amount: number;
  category?: number;
  difficulty?: number;
  type?: number;
}

export type QuizState = {
  points: number;
  answers: string[];
  finished: boolean;
};
