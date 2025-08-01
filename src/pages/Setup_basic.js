import CategoryButton from "../components/CategoryButton";

export default function Setupbasic({ onNext, onPrev }) {
  const categories = [
    { name: "음악", items: ["K-POP", "락", "재즈"] },
    { name: "영화", items: ["액션", "로맨스", "코미디"] },
    { name: "운동", items: ["헬스", "요가", "러닝"] },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>머니코치에 오신 것을 환영합니다.</h1>

      {categories.map((cat, index) => (
        <CategoryButton
          key={index}
          items={cat.items}
          title={cat.name}
          size = "large"
        />
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
        <button onClick={onPrev}>← 이전</button>
        <button onClick={onNext}>다음 →</button>
      </div>
    </div>
  );
}
