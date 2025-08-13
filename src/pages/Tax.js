// Revenue.jsx
import { useState } from "react";
import InputBlock from "../components/InputBlock";
import CategoryBundle from "../components/CategoryBundle";
import GotoButton from "../components/GotoButton";
import Input from "../components/Input";
import AddButton from "../components/AddButton";
import "./Page.css";

export default function Revenue({ title, setTitle, onPrev, onNext }) {
  const [taxes, setTaxes] = useState([
    { id: Date.now(), category: "임금", amount: "", frequency: "월" }
  ]);

  const categories = ["소득세", "양도소득세", "자본세"];

  const handleAddRevenue = () => {
    setTaxes([
      ...taxes,
      { id: Date.now(), category: "소득세", amount: "", frequency: "월" }
    ]);
  };

  const handleChange = (idx, key, value) => {
    const copy = [...taxes];
    copy[idx][key] = value;
    setTaxes(copy);
  };

  const handleRemove = (idx) => {
    setTaxes(taxes.filter((_, i) => i !== idx));
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
      <h1>세금을 작성해주세요</h1>

      {/* 콘텐츠 영역 */}
      {taxes.map((bundle, idx) => (
                <div key={bundle.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CategoryBundle
                    menuItems={categories}
                    unit="%"
                    onRemove={() => handleRemove(idx)}
                  />
      
                </div>
              ))}
      <AddButton
          className="add-link"
          onClick = {handleAddRevenue} 
      >
          + 세금 종류 추가하기</AddButton>
  
    <div className="nav-buttons">
      <div className = 'goto-container'>
          <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
          <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
      </div>
    </div>
    </div>
  );
}