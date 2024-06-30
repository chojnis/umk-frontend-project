import { Question } from "../types";
import { htmlDecode } from "../utils";

const QuestionResult = ({
  question,
  answer,
}: {
  question: Question;
  answer: string;
}) => {
  return (
    <div className="question-result">
      <h3>{htmlDecode(question.question)}</h3>

      {question.answers.map((option, i) => (
        <div
          className={`question-result__option${
            option === answer ? " quiz-result__option--selected" : ""
          }${
            question.correct_answer === option
              ? " question-result__option--correct"
              : " question-result__option-incorrect"
          }`}
          key={i}
        >
          {htmlDecode(option)}{" "}
          {question.correct_answer === option && (
            <span
              className="question-result__option--correct"
              style={{ color: "green" }}
            >
              ✅
            </span>
          )}
          {question.correct_answer !== option && answer === option && (
            <span className="" style={{ color: "red" }}>
              ❌
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionResult;
