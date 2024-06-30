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

      <div className="question-result__options">
        {question.answers.map((option, i) => (
          <div
            className={`question-result__option${
              option === answer ? " question-result__option--selected" : ""
            }${
              question.correct_answer === option
                ? " question-result__option--correct"
                : " question-result__option--incorrect"
            }`}
            key={i}
          >
            {htmlDecode(option)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionResult;
