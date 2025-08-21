import CategoryButton from "../components/CategoryButton";
import GotoButton from "../components/GotoButton";
import './Page.css';
import DatePickerComponent from "../components/DatePicker";
import { useBasic, useMergeObject } from "../components/DataContext";
import {useState} from "react";

export default function SetupPersonal({onNext, onPrev}){

  const cat =  { name: "생년월일", items: ["K-POP", "락", "재즈"]};
  const cat2 =  { name: "성별", items: ["남성", "여성"]};
  const cat3 =  { name: "사용목적", items: ["재무 설계", "노후 계획"]};
  
  const [personalList, setPersonalList] = useBasic();
  
  const mergePersonal = useMergeObject(setPersonalList);
  
  const handleSelectGender  = (v) => mergePersonal({ gender: v });
  const handleSelectPurpose = (v) => mergePersonal({ purpose: v });
  const handleBirthChange = (d) => {
  mergePersonal({ birth: d ? d.toISOString().slice(0, 10) : null });
};

  return(
    <>
    
    <div className = "setup-page">
    <h1> 000님 <br/>머니코치에 오신 것을 환영합니다. </h1>
    <DatePickerComponent 
      title={cat.name}
      key={cat.name}
      size="large"
      value={personalList?.birthDate ?? null}
      onChange={handleBirthChange}
    />
    <CategoryButton 
    items = {cat2.items}
    key={cat2.name} 
    title={cat2.name}
    size = "large"
    onSelect={handleSelectGender}
    />
    <CategoryButton 
    items = {cat3.items}
    key={cat3.name} 
    title={cat3.name}
    size = "large"
    onSelect={handleSelectPurpose}
    />
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
