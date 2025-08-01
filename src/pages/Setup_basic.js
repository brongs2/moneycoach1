import CategoryButton from "../components/CategoryButton";
import GotoButton from "../components/GotoButton";

export default function Setupbasic({onNext, onPrev}){

  const cat =  { name: "음악", items: ["K-POP", "락", "재즈"]};
  const cat2 =  { name: "성별", items: ["남성", "여성"]};
  const cat3 =  { name: "사용목적", items: ["재무 설계", "노후 계획"]};
  

  return(
    <>
    <h1> 머니코치에 오신 것을 환영합니다. </h1>
    <CategoryButton 
    items = {cat.items}
    key={cat.name} 
    title={cat.name}
    size = "small"
    />
    <CategoryButton 
    items = {cat2.items}
    key={cat2.name} 
    title={cat2.name}
    size = "medium"
    />
    <CategoryButton 
    items = {cat3.items}
    key={cat3.name} 
    title={cat3.name}
    size = "large"
    />
    <div className = 'goto-container'>
        <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
        <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
      </div>
    </>
  );
}
