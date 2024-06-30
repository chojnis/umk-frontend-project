import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import { QuestionDifficulty, QuestionParams } from "../types";

const QuizForm = () => {
  const [advanced, setAdvanced] = useState(false);
  const [params, setParams] = useState<QuestionParams>({
    amount: 10,
  });
  let { data: categories } = useCategories();
  if (!categories) categories = [];
  const difficulties = ["easy", "medium", "hard"];

  const navigate = useNavigate();

  const handleFetchQuiz = () => {
    const query = new URLSearchParams();
    if (params.amount !== 10) query.append("amount", params.amount.toString());
    if (params.category)
      query.append("category", categories[params.category].id.toString());
    if (params.difficulty) query.append("difficulty", params.difficulty);
    navigate(`/quiz?${query}`);
  };

  return (
    <div id="quiz-form">
      <h2>
        Do you want to solve{" "}
        {params.difficulty ? (
          <span className="--text-italic">{params.difficulty}</span>
        ) : (
          ""
        )}{" "}
        <span className="--text-italic">
          {params.category
            ? categories[params.category].name
            : "General Knowledge"}
        </span>{" "}
        Quiz with{" "}
        <span className="--text-italic">{params.amount} questions</span>?
      </h2>
      <div className="quiz-form__actions">
        <button className="btn" onClick={handleFetchQuiz}>
          Start Quiz
        </button>
        <a className="btn-text" onClick={() => setAdvanced(!advanced)}>
          {advanced ? "Hide" : "Show"} advanced options
        </a>
        {advanced && (
          <div className="quiz-form__advanced">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="quiz-form__input"
                value={params.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setParams({ ...params, category: Number(e.target.value) });
                }}
              >
                <option value={""}>All categories</option>
                {categories?.map((cat, index) => (
                  <option key={index} value={index}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                className="quiz-form__input"
                value={params.difficulty}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setParams({
                    ...params,
                    difficulty: e.target.value as QuestionDifficulty,
                  })
                }
              >
                <option value={""}>All difficulty</option>
                {difficulties?.map((difficulty, index) => (
                  <option key={index} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                className="quiz-form__input"
                type="number"
                value={params.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setParams({ ...params, amount: Number(e.target.value) });
                }}
                placeholder="Enter number of questions"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
