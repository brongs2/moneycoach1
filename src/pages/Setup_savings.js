import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";

import './Page.css';

import { useState } from "react";


export default function SetupSaving({ onPrev, onNext }) {
  const [savinglists, setSavingLists] = useState([
    {
      id : Date.now(), category : "일반 예금", amount: "", unit: "₩"
    }
  ]); 


  const categories = ['일반 예금', '정기 예금', '적금'];
  const units = ['₩', '$', '€'];
  const handleAddSavings = () => {
    setSavingLists([
      ...savinglists,
      {id : Date.now(), caegory : "일반 예금", amount : "", unit : "₩"}
    ]);
  }
    const handleRemove = (idx) => {
    setSavingLists(savinglists.filter((_, i) => i !== idx));
  };

  
  return (
    <>
   
    
    <div className = "setup-page">
         <h1>
          어떤 방식으로<br />
          저축하고 있나요?
        </h1>
        {savinglists.map((bundle, idx) => (
          <div key={bundle.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CategoryBundle
              menuItems={categories}
              unitItems={units}
              onRemove={() => handleRemove(idx)}
            />

          </div>
        ))}


        <AddButton
                className="add-link"
                onClick = {handleAddSavings} 
            >
                + 저축 종류 추가하기</AddButton>
        
          <div className="nav-buttons">
            <div className = 'goto-container'>
                <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
                <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
            </div>
          </div>
    </div>
    </>
  );
}