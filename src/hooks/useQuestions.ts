import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../api/quizApi";
import { QuestionDifficulty, QuestionType } from "../types";

const useQuestions = (
  amount: number,
  category?: string,
  difficulty?: QuestionDifficulty,
  type?: QuestionType
) => {
  return useQuery({
    queryKey: ["questions", amount, category, difficulty, type],
    queryFn: async () =>
      await fetchQuestions(amount, category, difficulty, type),
  });
};

export default useQuestions;
