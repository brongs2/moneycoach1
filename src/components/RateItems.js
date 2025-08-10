import { useState } from "react";


export default function RateItems({menuName, unitName}){

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