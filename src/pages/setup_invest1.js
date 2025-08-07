
import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";

import './Page.css';

import { useState } from "react";

export default function Setupinvest1({onPrev, onNext}){  
    const [savinglists, setSavingLists] = useState([{ id: 1, amount: '' }]);

    
    let nextId = 2;  


        function handleSavings(){
            setSavingLists(prev => [...prev, { id: nextId++, amount: '' }])
        }

    
    return (
        <div style = {{display: "flex",
                        flexDirection: "column",
                        minHeight: "68.5vh",/* 화면 세로 전체 확보 */
                        paddingBottom: "10vh", 
                        boxSizing: "border-box"}}>
            
            {savinglists.map(bundle => (
            <CategoryBundle
                key={bundle.id}
                menuItems={['주식', '채권', '암호 화폐', '펀드']}
                unitItems={['₩', '$', '€']}
                amount={bundle.amount}
            />
            ))}

            <AddButton
                    className="add-link"
                    onClick = {handleSavings} 
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