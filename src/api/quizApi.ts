import {
  CategoryResponse,
  Category,
  QuestionDifficulty,
  QuestionResponse,
  QuestionType,
  Question,
} from "../types";

const BASE_URL = "https://opentdb.com";

export const fetchQuestions = async (
  amount: number,
  category?: string,
  difficulty?: QuestionDifficulty,
  type?: QuestionType
): Promise<Question[]> => {
  const params = new URLSearchParams();
  params.append("amount", amount.toString());
  if (category) params.append("category", category.toString());
  if (difficulty) params.append("difficulty", difficulty);
  if (type) params.append("type", type);

  const response = await fetch(`${BASE_URL}/api.php?` + params);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: QuestionResponse = await response.json();

  if (data.response_code !== 0 && data.response_code !== 1) {
    throw new Error("Invalid response code");
  }

  data.results.map((question) => {
    question.answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    return question;
  });

  return data.results;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/api_category.php`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: CategoryResponse = await response.json();

  return data.trivia_categories;
};

// const retrieveToken = async () => {
//   const response = await fetch(`${BASE_URL}/api_token.php?command=request`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return await response.json();
// };
