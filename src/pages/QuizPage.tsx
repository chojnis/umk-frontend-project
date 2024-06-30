import Quiz from "../components/Quiz";
import { useLocation, useNavigate } from "react-router-dom";
import useQuestions from "../hooks/useQuestions";
import { QuestionDifficulty, QuestionType } from "../types";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const amount = Number(params.get("amount") || "10");
  const category = params.get("category") || undefined;
  const difficulty =
    (params.get("difficulty") as QuestionDifficulty) || undefined;
  const type = (params.get("type") as QuestionType) || undefined;

  const {
    data: questions,
    error,
    isLoading,
  } = useQuestions(amount, category, difficulty, type);

  if (isLoading) return <span className="loader"></span>;
  if (error) {
    return (
      <>
        <h1>There was an error while reading questions</h1>
        <button className="btn" onClick={() => navigate("/")}>
          Go back to home page
        </button>
      </>
    );
  }

  if (!questions || questions.length === 0) return <p>No questions found</p>;

  return <Quiz questions={questions} />;
};

export default QuizPage;
