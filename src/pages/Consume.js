// Revenue.jsx
import { useState } from "react";
import InputBlock from "../components/InputBlock";
import CategoryButton from "../components/CategoryButton";
import GotoButton from "../components/GotoButton";
import Input from "../components/Input";
import "./Page.css";

export default function Consume({ title, setTitle, onPrev, onNext }) {
  const [revenues, setRevenues] = useState([
    { id: Date.now(), category: "생활비", amount: "", frequency: "월" }
  ]);

  const categories = ["생활비", "교통비", "주거비"];
  const frequencies = ["/주", "/월", "/년"];

  const handleAddRevenue = () => {
    setRevenues([
      ...revenues,
      { id: Date.now(), category: "임금", amount: "", frequency: "월" }
    ]);
  };

  const handleChange = (idx, key, value) => {
    const copy = [...revenues];
    copy[idx][key] = value;
    setRevenues(copy);
  };

  const handleRemove = (idx) => {
    setRevenues(revenues.filter((_, i) => i !== idx));
  };

  return (
    <div className="setup-page">
      <div className="consume-main">
      <input
        className="title-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={title}
      />

      <h1>소비를 작성해주세요</h1>

      {revenues.map((rev, idx) => (
        <InputBlock key={rev.id} label={idx === 0 ? "" : undefined}>
          <div className="goal-line">
            {/* 카테고리 드롭다운 */}
            <CategoryButton
              items={categories}
              size="medium"
              selected={rev.category}
              onSelect={v => handleChange(idx, "category", v)}
            />

            {/* 금액 입력 */}
            <div className="input-with-suffix">
              <Input
                width="120px"
                height="36px"
                type="number"
                placeholder="0"
                value={rev.amount}
                style={{ paddingRight: '1.5rem' }} 
                onChange={e => handleChange(idx, "amount", e.target.value)}
              />
              <span className="suffix">만원</span>
            </div>

            {/* 주기 드롭다운 */}
            <CategoryButton
              items={frequencies}
              size="small"
              selected={rev.frequency}
              onSelect={v => handleChange(idx, "frequency", v)}
            />

            {/* 삭제 버튼 */}
            {revenues.length > 1 && (
              <button
                className="remove-goal-button"
                onClick={() => handleRemove(idx)}
              >
                ❌
              </button>
            )}
          </div>
        </InputBlock>
      ))}

      <div className="add-goal-link" onClick={handleAddRevenue}>
        + 소비 종류 추가하기
      </div>
      </div>
      <div className="nav-buttons">
        <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
        <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
      </div>
    </div>
  );
}
