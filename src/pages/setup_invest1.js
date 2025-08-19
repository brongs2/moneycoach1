
import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";
import { useWizard } from "../useWizard";

import './Page.css';

import { useState } from "react";

export default function Setupinvest1({onPrev, onNext, investlists=[], setInvestlists}){
    
    const categories = ['주식', '채권', '암호 화폐', '펀드'];
    const units = ['₩', '$', '€'];

    const updateField = (idx, field, value) => {
      setInvestlists((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
      );
    };

    const handleAddInvests = () => {
    setInvestlists([
      ...investlists,
      {
      id : Date.now(), category : "주식", amount: "", unit: "₩"
    }
    ]);
  }
    const handleRemove = (idx) => {
    setInvestlists(investlists.filter((_, i) => i !== idx));
  };
   
    
    return (
        <div style = {{display: "flex",
                        flexDirection: "column",
                        minHeight: "68.5vh",/* 화면 세로 전체 확보 */
                        paddingBottom: "10vh", 
                        boxSizing: "border-box"}}>
            
            {investlists.map((row, idx) => (
            <div key={row.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CategoryBundle
              category={row.category}
              amount = {row.amount}
              unit=  {row.unit}
                key={row.id}
                menuItems={categories}
                unitItems={units}
                onChangeCategory={(v) => updateField(idx,'category',v)}
                onChangeAmount={(v) => updateField(idx, 'amount',v)}
                onChangeUnit={(v) => updateField(idx,'unit',v)}
                onRemove={() => handleRemove(idx)}
            />
            </div>
            ))}

            <AddButton
                    className="add-link"
                    onClick = {handleAddInvests} 
                >
                    + 투자 종류 추가하기</AddButton>
            <div className="nav-buttons">
                <div className="goto-container">
                    <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
                    <GotoButton variant="down" onClick={onNext}>다음</GotoButton>
                </div>
            </div>
        </div>
        
            
    );
}