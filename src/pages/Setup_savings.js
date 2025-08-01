import CategoryButton from "../components/CategoryButton";
import GotoButton from "../components/GotoButton";


import { useState } from "react";
export default function Setupsaving({ onNext, onPrev }) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('₩');

  return (
    <div className="container">
      <h1 className="title">
        어떤 방식으로<br />
        저축하고 있나요?
      </h1>

      <div className="input-group">
        {/* CategoryButton을 저축 종류 선택용으로 사용 */}
        <CategoryButton
          items={['일반 예금', '정기 예금', '적금']}
          title=""
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
          placeholder="0"
        />

        <CategoryButton
          items={['₩', '$', '€']}
          title=""
        />
      </div>

      <p className="add-link">+ 저축 종류 추가하기</p>

      <div className="bottom">
        <div className = 'goto-container'>
                <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
                <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
              </div>

        <div className="hint">
          <span className="icon">❓</span>
          어떤 저축을 하고 있는지 잘 모르겠어요
        </div>
      </div>
    </div>
  );
}