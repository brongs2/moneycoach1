
import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";

import './Page.css';

import { useState } from "react";

export default function Setupinvest1({onPrev, onNext}){  
    const [investlists, setInvestlists] = useState([
    {
      id : Date.now(), category : "주식", amount: "", unit: "₩"
    }
  ]); 
    const categories = ['주식', '채권', '암호 화폐', '펀드'];
    const units = ['₩', '$', '€'];
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
            
            {investlists.map((bundle, idx) => (
            <CategoryBundle
                key={bundle.id}
                menuItems={categories}
                unitItems={units}
                onRemove={() => handleRemove(idx)}
            />
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