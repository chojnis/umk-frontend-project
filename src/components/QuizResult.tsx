import { Question, QuizState } from "../types";
import QuestionResult from "./QuestionResult";

const QuizResult = ({
  questions,
  quizState,
}: {
  questions: Question[];
  quizState: QuizState;
}) => {
  return (
    <div id="quiz-result">
      <h2>Quiz finished!</h2>
      <p>
        You got {quizState.points} out of {quizState.answers.length} correct!
      </p>
      <div className="quiz-result__questions">
        {questions.map((question, index) => (
          <QuestionResult
            key={index}
            question={question}
            answer={quizState.answers[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizResult;
