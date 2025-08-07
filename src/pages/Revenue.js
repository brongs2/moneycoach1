// Revenue.jsx
import { useState } from "react";
import InputBlock from "../components/InputBlock";
import CategoryBundle from "../components/CategoryBundle";
import GotoButton from "../components/GotoButton";
import Input from "../components/Input";
import "./Page.css";
import "./Revenue.css";

export default function Revenue({ title, setTitle, onPrev, onNext }) {
  const [revenues, setRevenues] = useState([
    { id: Date.now(), category: "임금", amount: "", frequency: "월" }
  ]);

  const categories = ["임금", "사업소득", "기타"];
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
    <div className="setup-page plan-revenue-page">
      {/* 제목 입력 */}
      <input
        className="title-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={title}
      />

      {/* 페이지 헤딩 */}
      <h1>수입을 작성해주세요</h1>

      {/* 콘텐츠 영역 */}
      <div className="revenue-main">
        {revenues.map((rev, idx) => (
          <InputBlock key={rev.id} label={idx === 0 ? "" : undefined}>
            {/* CategoryBundle + 삭제 버튼 */}
            <div className="goal-line">
              <CategoryBundle
                menuItems={categories}
                unitItems={frequencies}
                category={rev.category}
                amount={rev.amount}
                frequency={rev.frequency}
                onCategoryChange={v => handleChange(idx, "category", v)}
                onAmountChange={v => handleChange(idx, "amount", v)}
                onFrequencyChange={v => handleChange(idx, "frequency", v)}
              />
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

        {/* 항목 추가 링크 */}
        <div className="add-goal-link" onClick={handleAddRevenue}>
          + 수입 종류 추가하기
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      <div className="nav-buttons">
        <GotoButton variant="left" onClick={onPrev}>
          이전
        </GotoButton>
        <GotoButton variant="right" onClick={onNext}>
          다음
        </GotoButton>
      </div>
    </div>
  );
}
