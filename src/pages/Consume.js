import { useState } from "react";
import InputBlock from "../components/InputBlock";
import CategoryBundle from "../components/CategoryBundle";
import GotoButton from "../components/GotoButton";
import Input from "../components/Input";
import "./Page.css";

export default function Consume({ title, setTitle, onPrev, onNext }) {
  const [consumes, setConsumes] = useState([
    { id: Date.now(), category: "생활비", amount: "", frequency: "월" }
  ]);

  const categories = ["생활비", "교통비", "주거비"];
  const frequencies = ["/주", "/월", "/년"];

  const handleAddConsume = () => {
    setConsumes([
      ...consumes,
      { id: Date.now(), category: "생활비", amount: "", frequency: "월" }
    ]);
  };

  const handleChange = (idx, key, value) => {
    const copy = [...consumes];
    copy[idx][key] = value;
    setConsumes(copy);
  };

  const handleRemove = (idx) => {
    setConsumes(consumes.filter((_, i) => i !== idx));
  };

  return (
    <div className="setup-page plan-consume-page">
      {/* 제목 입력 */}
      <input
        className="title-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={title}
      />

      {/* 페이지 헤딩 */}
      <h1>소비를 작성해주세요</h1>

      {/* 콘텐츠 영역 */}
      <div className="consume-main">
        {consumes.map((item, idx) => (
          <InputBlock key={item.id} label={idx === 0 ? "" : undefined}>
            <div className="goal-line">
              <CategoryBundle
                menuItems={categories}
                unitItems={frequencies}
                category={item.category}
                amount={item.amount}
                frequency={item.frequency}
                onCategoryChange={v => handleChange(idx, "category", v)}
                onAmountChange={v => handleChange(idx, "amount", v)}
                onFrequencyChange={v => handleChange(idx, "frequency", v)}
              />
              {consumes.length > 1 && (
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
        <div className="add-goal-link" onClick={handleAddConsume}>
          + 소비 종류 추가하기
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
