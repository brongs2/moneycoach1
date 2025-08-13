import CategoryButton from "./CategoryButton";
import "../pages/Page.css";
import "./CategoryBundle.css"
import { useState } from "react";


export default function CategoryBundle({menuItems,  unit, unitItems, onRemove}){
    
    const [amount, setAmount] = useState('');
    
    
    
    return(
        <div className="input-group">
            {/* CategoryButton을 저축 종류 선택용으로 사용 */}
            <CategoryButton
                items={menuItems}
                title=""
                size = "medium"
            />

            <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input control"
                placeholder="0"
            />
            {/* 단위: 드롭다운 > 텍스트 우선순위 분기 */}
            {unit ? (
                // unit이 문자열이면 텍스트만
                <span className="unit-text">{unit}</span>
            ) : unitItems ? (
                // unitItems가 오면 드롭다운
                <CategoryButton items={unitItems} title="" size="small" />
            ) : null}
            {/* 삭제 버튼 */}
            {onRemove && (
                <button
                onClick={onRemove}
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: 'red'
                }}
                >
                ✕
                </button>
            )}
            
        </div>
    )
}