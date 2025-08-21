import { useState, useCallback, memo } from 'react';
import AddButton from '../components/AddButton';
import InputBlock from "../components/InputBlock";
import './Page.css';
import CategoryButton from '../components/CategoryButton';
import GotoButton from '../components/GotoButton';
import ResultButton from '../components/ResultButton';



const cat = { name: "부채", items: ["학자금대출", "신용대출", "생활자금대출"] };
const unit = { name: "단위", items: ["억원", "만원"] };


export default function SetupMyLoan({ onPrev, onNext }) {
  const [showLoanInfo, setShowLoanInfo] = useState(false);
const [loanList, setLoanList] = useState([]);
  const handleAddClick = () => {
    setShowLoanInfo(true);       // ✅ 부모는 입력 중에 state 안 바뀜 → 재렌더 안 됨
  };

  const handleComplete = useCallback((draft) => {
    setLoanList(prev => [...prev, draft]);  // ✅ 완료 시에만 부모 갱신
    setShowLoanInfo(false);
  }, [setLoanList]);

  return (
    <div className='setup-page'>
      {showLoanInfo ? (
        <LoanInfo onComplete={handleComplete} onCancel={() => setShowLoanInfo(false)} />
      ) : (
        <>
          <h1>현재 가지고 있는 <br />부채를 써주세요.</h1>

          {loanList.map(bundle => (
            <ResultButton
              key={bundle.id}
              variant="debt"
              category={bundle.category}
              loanPrice={bundle.loanPrice}
              interestRate={bundle.interestRate}
              repayment={bundle.repayment}
            />
          ))}

          <AddButton className='add link' onClick={handleAddClick}>
            + 부채 추가하기
          </AddButton>

          <div className="nav-buttons">
            <div className='goto-container'>
              <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
              <GotoButton variant="right" onClick={() => onNext(loanList)}>다음</GotoButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** ---- 입력 화면 (자식 내부에서 draft 관리) ---- */
const LoanInfo = memo(function LoanInfo({ onComplete, onCancel }) {
  const [draft, setDraft] = useState(() => ({
    id: Date.now(),
    category: null,
    loanPrice: {amount: 0, unit: unit.items[0]},
    interestRate: 0,
    repayment: {amount: 0, unit: unit.items[0]},
    compound: false,
    
  }));

  const update = useCallback((k, v) => {
    setDraft(prev => ({ ...prev, [k]: v }));
  }, []);

  const updateMoney = useCallback((field, key, value) => {
    setDraft(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [key]: value,
      },
    }));
  }, []);

  const onNumChange = useCallback((field, key) => (e) => {
    const n = e.target.valueAsNumber;
    const next = Number.isNaN(n) ? 0 : n; // empty -> 0
    updateMoney(field, key, next);
  }, [updateMoney]);

  const onRateChange = useCallback((e) => {
    const n = e.target.valueAsNumber;
    const next = Number.isNaN(n) ? 0 : n; // empty -> 0
    update('interestRate', next);
  }, [update]);


  return (
    <div className='setup-page'>
      <h1>어떤 부채를 <br /> 가지고 계신가요?</h1>

      <div style={{ marginLeft: 30 }}>
        <InputBlock label='카테고리'>
          <CategoryButton
            items={cat.items}
            size="medium"
            selected={draft.category}
            onSelect={v => update('category', v)}
          />
        </InputBlock>

        <InputBlock label='대출금'>
            <div className='inline-field'>
            <input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={draft.loanPrice.amount}
                onChange={onNumChange('loanPrice', 'amount')}
            />
            <CategoryButton
                items={unit.items}
                size="small"
                selected={draft.loanPrice.unit}
                onSelect={v => updateMoney('loanPrice', 'unit', v)}
            />
            </div>
        </InputBlock>

        <InputBlock label='이자율'>
            <div className='inline-field'>
            <input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={draft.interestRate}
                onChange={onRateChange}
            />
            %
            <label className="toggle">
                <input
                type="checkbox"
                checked={draft.compound}
                onChange={e => update('compound', e.target.checked)}
                />
                <span className="slider" />
                <span className="toggle-text">{draft.compound ? '복리' : '단리'}</span>
            </label>
            </div>
        </InputBlock>

        <InputBlock label='월 상환액'>
            <div className='inline-field'>
            <input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={draft.repayment.amount}
                onChange={onNumChange('repayment', 'amount')}
            />
            <CategoryButton
                items={unit.items}
                size="small"
                selected={draft.repayment.unit}
                onSelect={v => updateMoney('repayment', 'unit', v)}
            />
            </div>
        </InputBlock>
        
    
      </div>

      <div className="nav-buttons">
        <div className='goto-container'>
          <GotoButton variant="left" onClick={onCancel}>취소</GotoButton>
          <GotoButton variant="complete" onClick={() => onComplete(draft)}>완료</GotoButton>
        </div>
      </div>
    </div>
  );
});
