import GotoButton from "../components/GotoButton";

import './Page.css';

import { useState } from "react";


export default function Setupinvest2({ onPrev, onNext }) {
  

  function RateItems({menuName, unitName}){
    const [amount, setAmount] = useState('');
    return(
    <div className="rate-field">
      <label className="rate-label">{menuName}</label>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="0"
        style={{
          border: "none",
          color: "#333",
          marginLeft: "30px",
          textAlign: "right",
          fontSize: "30px",
          fontFamily: "Pretendard",
          fontWeight: "500",
        }}
      />
      <label className="rate-label">{unitName}</label>
    </div>
    );
  }

  return(
    <div style = {{display: "flex",
                        flexDirection: "column",
                        minHeight: "75vh",/* 화면 세로 전체 확보 */
                        paddingBottom: "20px", 
                        boxSizing: "border-box"}}>
    
    <h4>현재 수익률보다는<br/> 
    미래 종합적인 예상 수익률을 써주세요</h4>
    <RateItems menuName='수익률' unitName='%'/>
    <RateItems menuName='배당수익률' unitName='%'/>
    <RateItems menuName='인플레이션' unitName='%'/>

    
    <div className="nav-buttons">
      <div className="goto-container">
          <GotoButton variant="up" onClick={onPrev}>이전</GotoButton>
          <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
      </div>
    </div>

    </div>
  );




}