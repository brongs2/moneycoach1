import { useState } from "react";
import CategoryBundle from "../components/CategoryBundle";
import GotoButton from "../components/GotoButton";
import AddButton from "../components/AddButton";
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
      {consumes.map((bundle, idx) => (
        <div key={bundle.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CategoryBundle
            menuItems={categories}
            unitItems={frequencies}
            onRemove={() => handleRemove(idx)}
          />

        </div>
      ))}


      <AddButton
              className="add-link"
              onClick = {handleAddConsume} 
          >
              + 저축 종류 추가하기</AddButton>
      
        <div className="nav-buttons">
          <div className = 'goto-container'>
              <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
              <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
          </div>
        </div>
    </div>
  );
}
