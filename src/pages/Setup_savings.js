// src/pages/SetupSaving.jsx
import GotoButton from "../components/GotoButton";
import CategoryBundle from "../components/CategoryBundle";
import AddButton from "../components/AddButton";
import { useWizard } from "../useWizard";   // ✅ 공용 훅
import "./Page.css";

import { useState } from "react";

export default function SetupSaving({ onPrev, onNext }) {
  const { handleNext } = useWizard();

  const [savinglists, setSavingLists] = useState([
    { id: Date.now(), category: "일반 예금", amount: "", unit: "₩" },
  ]);

  const categories = ["일반 예금", "정기 예금", "적금"];
  const units = ["₩", "$", "€"];

  const updateField = (idx, field, value) => {
    setSavingLists((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  };

  const handleAddSavings = () => {
    setSavingLists((prev) => [
      ...prev,
      { id: Date.now(), category: "일반 예금", amount: "", unit: "₩" },
    ]);
  };

  const handleRemove = (idx) => {
    setSavingLists((prev) => prev.filter((_, i) => i !== idx));
  };

  // ✅ 다음 단계: 저장 → onNext
  const submit = async () => {
    // 간단한 전처리/검증: 빈 항목 제거 + 금액 숫자화
    console.log("send")
    const payload = savinglists
      .map(({ id, category, amount, unit }) => ({
        category,
        unit,
        amount: Number(amount) || 0,
      }))
      .filter((row) => row.category && row.unit);
       console.log("📦 보내는 데이터:", payload); 
    await handleNext({
      pageKey: "savings",
      data: payload,
      onSaved: onNext,
    });
  };

  return (
    <div className="setup-page">
      <h1>
        어떤 방식으로
        <br />
        저축하고 있나요?
      </h1>

      {savinglists.map((row, idx) => (
        <div key={row.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CategoryBundle
            // ✅ 컨트롤드 props
            category={row.category}
            amount={row.amount}
            unit={row.unit}
            menuItems={categories}
            unitItems={units}
            onChangeCategory={(v) => updateField(idx, "category", v)}
            onChangeAmount={(v) => updateField(idx, "amount", v)}
            onChangeUnit={(v) => updateField(idx, "unit", v)}
            onRemove={() => handleRemove(idx)}
          />
        </div>
      ))}

      <AddButton className="add-link" onClick={handleAddSavings}>
        + 저축 종류 추가하기
      </AddButton>

      <div className="nav-buttons">
        <div className="goto-container">
          <GotoButton variant="left" onClick={onPrev}>
            이전
          </GotoButton>
          <GotoButton variant="right" onClick={submit}>
            다음
          </GotoButton>
        </div>
      </div>
    </div>
  );
}
