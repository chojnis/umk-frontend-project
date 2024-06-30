import { useEffect, useState } from "react";
import { Question as QuestionType, QuizState } from "../types";
import Question from "./Question";
import QuizResult from "./QuizResult";
import {
  useTransition,
  animated,
  useSpringRef,
  useSpring,
} from "@react-spring/web";

const colors = ["#826AED", "#C879FF", "#FFB7FF", "#3BF4FB", "#7BE000"];

const Quiz = ({ questions }: { questions: QuestionType[] }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    points: 0,
    answers: [],
    finished: false,
  });

  const handleAnswer = (index: number, answer: string) => {
    setQuizState((prev) => {
      const isCorrect = questions[index].correct_answer === answer;
      const isFinished = index === questions.length - 1;

      return {
        points: isCorrect ? prev.points + 1 : prev.points,
        answers: [...prev.answers, answer],
        finished: isFinished,
      };
    });
  };

  const transRef = useSpringRef();
  const transitions = useTransition(quizState.answers.length, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  useEffect(() => {
    transRef.start();
  }, [quizState.answers]);

  if (quizState.finished)
    return (
      // <animated.div style={springs}>
      <QuizResult questions={questions} quizState={quizState} />
      // </animated.div>
    );

  return (
    <div id="quiz">
      {transitions((style, item) => (
        <animated.div
          style={{
            ...style,
            backgroundColor: colors[item % colors.length],
          }}
          className="quiz__question-container"
        >
          <Question
            key={item}
            question={questions[item].question}
            answers={questions[item].answers}
            handleAnswer={(answer: string) => handleAnswer(item, answer)}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default Quiz;
