import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";

import './Page.css';

import { useState } from "react";


export default function Setupassets({ onPrev, onNext }) {
  const [Assetslists, setAssetsLists] = useState([{ id: 1, amount: '' }]);

  let nextId = 2;  


    function handleAssetss(){
        setAssetsLists(prev => [...prev, { id: nextId++, amount: '' }])
    }

  
  return (
    <>
    <h1>
          어떤 자산을<br />
          가지고 계신가요?
        </h1>
    
    <div className = "setup-page">
        
        {Assetslists.map(bundle => (
          (bundle.id>= 2) && <CategoryBundle
            key={bundle.id}
            menuItems={['일반 예금', '정기 예금', '적금']}
            unitItems={['₩', '$', '€']}
            amount={bundle.amount}
          />
        ))}

        <AddButton
                className="add-link"
                onClick = {handleAssetss} 
            >
                + 자산 종류 추가하기</AddButton>
        
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