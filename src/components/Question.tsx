import { htmlDecode } from "../utils";

const Question = ({
  question,
  answers,
  handleAnswer,
}: {
  question: string;
  answers: string[];
  handleAnswer: (answer: string) => void;
}) => {
  return (
    <div className="quiz__question">
      <h3>{htmlDecode(question)}</h3>
      <div className="quiz__question-options">
        {answers.map((answer, index) => (
          <div
            className="quiz__question-option"
            key={index}
            onClick={() => handleAnswer(answer)}
          >
            {htmlDecode(answer)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
