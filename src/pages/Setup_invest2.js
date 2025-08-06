import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";

import './Page.css';

import { useState } from "react";


export default function Setupinvest2({ onPrev, onNext }) {
  const [amount, setAmount] = useState('');
  return(
    <div>
    
    <h4>현재 수익률보다는<br/> 
    미래 종합적인 예상 수익률을 써주세요</h4>


    <div className="rate-field">
      <label className="rate-label">수익률</label>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="0"
        style={{
          border: "none",
          color: "#333",
          marginLeft: "30px",
          textAlign: "left",
          fontSize: "30px",
          fontFamily: "Pretendard",
          fontWeight: "500",
        }}
      />
    </div>
    <div className="nav-buttons">
      <div className="goto-container">
          <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
          <GotoButton variant="down" onClick={onNext}>다음</GotoButton>
      </div>
    </div>

    </div>
  );




}