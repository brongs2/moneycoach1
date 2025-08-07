import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";

import './Page.css';

import { useState } from "react";


export default function SetupSaving({ onPrev, onNext }) {
  const [savinglists, setSavingLists] = useState([{ id: 1, amount: '' }]);

  let nextId = 2;  


    function handleSavings(){
        setSavingLists(prev => [...prev, { id: nextId++, amount: '' }])
    }

  
  return (
    <>
   
    
    <div className = "setup-page">
         <h1>
          어떤 방식으로<br />
          저축하고 있나요?
        </h1>
        {savinglists.map(bundle => (
          <CategoryBundle
            key={bundle.id}
            menuItems={['일반 예금', '정기 예금', '적금']}
            unitItems={['₩', '$', '€']}
            amount={bundle.amount}
          />
        ))}

        <AddButton
                className="add-link"
                onClick = {handleSavings} 
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