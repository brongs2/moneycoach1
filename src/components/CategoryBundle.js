import CategoryButton from "./CategoryButton";
import "../pages/Page.css";

import { useState } from "react";


export default function CategoryBundle({menuItems, unitItems}){
    
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
                className="amount-input"
                placeholder="0"
            />

            <CategoryButton
                items={unitItems}
                title=""
                size = "small"
            />

            
        </div>
    )
}