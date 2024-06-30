import { Question, QuizState } from "../types";
import QuestionResult from "./QuestionResult";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizResult = ({
  questions,
  quizState,
}: {
  questions: Question[];
  quizState: QuizState;
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const navigate = useNavigate();

  return (
    <div id="quiz-result">
      <h2 className="quiz-title">Quiz finished!</h2>
      <p className="quiz-subtitle">
        You got {quizState.points} out of {quizState.answers.length} correct!
      </p>
      <div className="quiz-result__actions">
        <button className="btn" onClick={() => navigate("/")}>
          Play again
        </button>
        <button
          className="btn quiz-result__actions-answers"
          onClick={() => setShowAnswers(!showAnswers)}
        >
          {showAnswers ? "Hide" : "Show"} answers
        </button>
      </div>
      {showAnswers && (
        <div className="quiz-result__questions">
          {questions.map((question, index) => (
            <QuestionResult
              key={index}
              question={question}
              answer={quizState.answers[index]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizResult;
