import CategoryButton from "./CategoryButton";
import "../pages/Page.css";
import "./CategoryBundle.css";

export default function CategoryBundle({
  category,
  amount,
  unit,
  menuItems,
  unitItems,
  onChangeCategory,
  onChangeAmount,
  onChangeUnit,
  onRemove,
}) {
  return (
    <div className="input-group">
      <CategoryButton
        items={menuItems}
        size="medium"
        selected={category}
        onSelect={(val) => onChangeCategory?.(val)}
      />

      <input
        type="number"
        inputMode="decimal"
        value={amount}
        onChange={(e) => onChangeAmount?.(e)}
        className="amount-input control"
        placeholder="0"
      />

      {unitItems && unitItems.length > 0 ? (
        <CategoryButton
          items={unitItems}
          size="small"
          selected={unit}
          onSelect={(val) => onChangeUnit?.(val)}
        />
      ) : (
        <span className="unit-text">{unit}</span>
      )}

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
  );
}