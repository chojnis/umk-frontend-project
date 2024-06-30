import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import { QuestionParams } from "../types";
import CustomSelect from "./form/CustomSelect";
import { useTransition, animated } from "@react-spring/web";

const QuizForm = () => {
  const [advanced, setAdvanced] = useState(false);
  const [params, setParams] = useState<QuestionParams>({
    amount: 10,
  });
  let { data: categories } = useCategories();
  if (!categories) categories = [];
  const difficulties = ["easy", "medium", "hard"];
  const types = ["multiple", "boolean"];

  const navigate = useNavigate();

  const handleAdvanced = () => setAdvanced((prev) => !prev);

  const handleFetchQuiz = () => {
    const query = new URLSearchParams();
    if (params.amount !== 10) query.append("amount", params.amount.toString());
    if (params.category !== undefined)
      query.append("category", categories[params.category].id.toString());
    if (params.difficulty !== undefined)
      query.append("difficulty", difficulties[params.difficulty].toString());
    if (params.type !== undefined)
      query.append("type", types[params.type].toString());
    navigate(`/quiz?${query}`);
  };

  const transition = useTransition(advanced, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  });

  const advancedTriggerRef = useRef<HTMLButtonElement>(null);
  const advancedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (
          !advancedRef.current?.contains(e.target) &&
          !advancedTriggerRef.current?.contains(e.target)
        ) {
          setAdvanced(false);
        }
      }
    };

    if (advanced) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [advanced]);

  return (
    <div id="quiz-form">
      <h1>Welcome to the Quiz App!</h1>
      <h2>
        <span>Do you want to solve</span>
        {params.difficulty !== undefined ? (
          <span className="--text-italic --text-bold --text-lowercase">
            {` ${difficulties[params.difficulty]}`}
          </span>
        ) : null}
        <span className="--text-italic --text-bold">
          {params.category !== undefined
            ? ` ${categories[params.category].name}`
            : " random"}
        </span>
        <span> Quiz with</span>
        <span className="--text-italic --text-bold">
          {" "}
          {params.amount} questions
        </span>
        ?
      </h2>
      <div className="quiz-form__actions">
        <button className="btn" onClick={handleFetchQuiz}>
          Start Quiz
        </button>
        <button
          ref={advancedTriggerRef}
          className="btn quiz-form__advanced--trigger"
          onClick={handleAdvanced}
        >
          Settings
        </button>
        {transition(
          (style, advanced) =>
            advanced && (
              <animated.div
                style={{
                  ...style,
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  padding: "1rem",
                  boxSizing: "border-box",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <div ref={advancedRef} className="quiz-form__advanced">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <CustomSelect
                      id="category"
                      value={params.category}
                      defaultValue="All categories"
                      options={categories.map((cat, index) => ({
                        id: index,
                        value: cat.name,
                      }))}
                      onChange={(id) => setParams({ ...params, category: id })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="difficulty">Difficulty</label>
                    <CustomSelect
                      id="difficulty"
                      value={params.difficulty}
                      defaultValue="All difficulty"
                      options={difficulties.map((difficulty, index) => ({
                        id: index,
                        value: difficulty,
                      }))}
                      onChange={(id) =>
                        setParams({
                          ...params,
                          difficulty: id,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Answers type</label>
                    <CustomSelect
                      id="type"
                      value={params.type}
                      defaultValue="All types"
                      options={types.map((type, index) => ({
                        id: index,
                        value: type,
                      }))}
                      onChange={(id) =>
                        setParams({
                          ...params,
                          type: id,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      id="amount"
                      className="custom-input"
                      type="number"
                      value={params.amount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setParams({
                          ...params,
                          amount: Number(e.target.value),
                        });
                      }}
                      placeholder="Enter number of questions"
                    />
                  </div>
                  <button
                    className="btn quiz-form__advanced--close"
                    onClick={handleAdvanced}
                  >
                    Close
                  </button>
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
};

export default QuizForm;
