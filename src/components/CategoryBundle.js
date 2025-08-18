import CategoryButton from "./CategoryButton";
import "../pages/Page.css";
import "./CategoryBundle.css"
import { useState } from "react";


export default function CategoryBundle({
  // ✅ 부모(SetupSaving)에서 내려오는 값들
  category,
  amount,
  unit,
  menuItems,
  unitItems,
  // ✅ 변경 콜백들 (부모로 올려보냄)
  onChangeCategory,
  onChangeAmount,
  onChangeUnit,
  onRemove,
}){
    
    
    
    
    return(
        <div className="input-group">
            {/* CategoryButton을 저축 종류 선택용으로 사용 */}
            <CategoryButton
                items={menuItems}
                size="medium"
                onSelect={(val) => onChangeCategory?.(val)}  // ← 부모에 변경 전달
            />

            <input
                type="number"
                value={amount}
                onChange={(e) => onChangeAmount?.(e.target.value)}  // ← 부모에 변경 전달
                className="amount-input control"
                placeholder="0"
            />

            
             {/* 통화 단위: 문자열이면 그대로 표시, 드롭다운이면 선택 가능 */}
            {unitItems && unitItems.length > 0 ? (
                <CategoryButton
                items={unitItems}
                size="small"
                onSelect={(val) => onChangeUnit?.(val)}     // ← 부모에 변경 전달
                />
            ) : (
                <span className="unit-text">{unit}</span>
            )}
            {/* 삭제 버튼 */}
        {/* 삭제 버튼 */}
            {onRemove && (
                <button
                type="button"
                onClick={onRemove}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "red",
                }}
                aria-label="삭제"
                title="삭제"
                >
                ✕
                </button>
            )}
            
        </div>
    )
}