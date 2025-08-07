import { useState } from "react";
import InputBlock from "../components/InputBlock";
import CategoryButton from "../components/CategoryButton";
import GotoButton from "../components/GotoButton";
import './Page.css';
import './Plan.css';

export default function AddPlan({ title, setTitle, onPrev, onNext }) {
  const [description, setDescription] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");

  const goalItems = ["총 소비", "직접 입력"];
  const [goals, setGoals] = useState([
    { age: "", type: "총 소비", multiplier: "" }
  ]);

  const handleAddGoal = () => {
    setGoals([...goals, { aid: Date.now(), age: "", type: "총 소비", multiplier: ""  }]);
  };

  const handleGoalChange = (index, key, value) => {
    const updatedGoals = [...goals];
    updatedGoals[index][key] = value;
    setGoals(updatedGoals);
  };

  const handleRemoveGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  return (
    <div className="setup-page">
      <input
        className="title-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={title}
      />

      <InputBlock label="간단한 설명">
        <textarea
          className="description-textarea"
          placeholder="설명을 입력하세요"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </InputBlock>

      <InputBlock label="은퇴 나이">
        <input
          type="number"
          placeholder="0"
          value={retirementAge}
          onChange={e => setRetirementAge(e.target.value)}
        />세 ,2053년
      </InputBlock>

      <InputBlock label="기대 수명">
        <input
          type="number"
          placeholder="0"
          value={lifeExpectancy}
          onChange={e => setLifeExpectancy(e.target.value)}
        />세 ,2053년
      </InputBlock>

      {goals.map((goal, index) => (
        <InputBlock key={index} label={index === 0 ? "목표" : undefined}>
          <div className="goal-line">
            <input
              type="number"
              placeholder="0"
              value={goal.age}
              onChange={e => handleGoalChange(index, "age", e.target.value)}
            />
            세까지&nbsp;
            <CategoryButton
              items={goalItems}
              size="small"
              selected={goal.type}
              onSelect={(selected) => handleGoalChange(index, "type", selected)}
            />
            &nbsp;의&nbsp;
            <input
              type="number"
              placeholder="0"
              value={goal.multiplier}
              onChange={e => handleGoalChange(index, "multiplier", e.target.value)}
            />
            배 벌기

            {/* 제거 버튼 */}
            {goals.length > 1 && (
              <button
                onClick={() => handleRemoveGoal(index)}
                className="remove-goal-button"
              >
                ❌
              </button>
            )}
          </div>
        </InputBlock>
      ))}

      <div className="add-goal-link" onClick={handleAddGoal}>
        + 목표 추가하기
      </div>

      <div className="nav-buttons">
        <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
      </div>
    </div>
  );
}
