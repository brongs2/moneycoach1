import { useState } from "react";
import InputBlock from "../components/InputBlock";
import CategoryButton from "../components/CategoryButton";
import GotoButton from "../components/GotoButton";
import './Page.css';
import './Plan.css';
import './Priority.css';
function Priority_setup({ title, setTitle, onPrev, onNext, priorities, setPriorities }){

  const categories =["저축", "빚", "소비"];
  const handleAddPrioiriy = () => {
    setPriorities([
        ...priorities,
        {id : Date.now(), category : "저축", ratio : 0}
    ]);
  };
    const handleChange = (idx, key, value) => {
    const copy = [...priorities];
    copy[idx][key] = value;
    setPriorities(copy);
  };
    const handleRemove = (idx) => {
    setPriorities(priorities.filter((_, i) => i !== idx));
  };
    return (
        <div className="setup-page priority-setup">
            <input
                className="title-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={title}
            />
            <h1>남는 생활비는 어떻게 사용할까요?</h1>
            {
                priorities.map((pri, idx) => (
                    <InputBlock key={pri.id} label={idx === 0 ? "" : undefined}>
                        <div className = "priority-line">
                            <span className="priority-index">{idx + 1} :</span>
                            <CategoryButton
                                items={categories}
                                size="medium"
                                selected={pri.category}
                                onSelect={v => handleChange(idx, "category", v)}
                            />
                            <button
                                className="remove-goal-button"
                                onClick={() => handleRemove(idx)}
                            >
                                ❌
                            </button>
                        </div>
                    
                    </InputBlock>
                ))
            }
            <div className="add-goal-link" onClick={handleAddPrioiriy}>
                + 소비 종류 추가하기
            </div>
            <div className="nav-buttons">
                <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
                <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
            </div>
        </div>
    )
}
function Priority_ratio({ title, setTitle, onPrev, onNext, priorities, setPriorities }){
    const handleRatioChange = (idx, value) => {
    const copy = [...priorities];
    copy[idx].ratio = Number(value);
    setPriorities(copy);
  };
    const categories =["저축", "빚", "소비"];
    console.log(priorities)
    return (
        <div className="setup-page priority-main">
            <input 
                className="title-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={title}
            />
            <h1>세부 비율을 작성해주세요</h1>
            {
                priorities.map((pri, idx) => (
                    <InputBlock key={pri.id} label={idx === 0 ? "" : undefined}>
                        <div className = "priority-line">
                            <span className="priority-index">{idx + 1} :</span>
                            <CategoryButton
                            items={categories}
                            size="medium"
                            selected={pri.category}
                            
                            />                            
                            <input
                            className="priority-ratio-input"
                            type="number"
                            min={0}
                            max={100}
                            value={pri.ratio}
                            onChange={e => handleRatioChange(idx, e.target.value)}
                            />
                            <span className="suffix">%</span>
  
                        </div>
                    
                    </InputBlock>
                ))
            }

            <div className="nav-buttons">
                <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
                <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
            </div>
        </div>
    )
} 
export default function Priority({ title, setTitle, onPrev, onNext }){
    const [state, setState] = useState(0);
    const [priorities, setPriorities] = useState([
    { id: Date.now(), category: "저축" , ratio : 0}
  ]);
    return (
    <div>
        {state === 0 && <Priority_setup title = {title} setTitle = {setTitle} onNext = {() => setState(1)} onPrev = {onPrev} priorities = {priorities} setPriorities = {setPriorities} />}
        {state === 1 && <Priority_ratio title = {title} setTitle = {setTitle} onNext = {onNext} onPrev = {() => setState(0)} priorities = {priorities} setPriorities = {setPriorities}/>}
    </div>
    );
}