import { useState, useCallback, memo, useRef } from 'react';
import AddButton from '../components/AddButton';
import InputBlock from "../components/InputBlock";
import './Page.css';
import CategoryButton from '../components/CategoryButton';
import GotoButton from '../components/GotoButton';
import ResultButton from '../components/ResultButton';



const cat = { name: "자산", items: ["집", "귀금속", "부동산", "땅"] };
const unit = { name: "단위", items: ["억원", "만원"] };


export default function SetupAssets({ onPrev, onNext, assetList = [], setAssetList = () => {} }) {
  const [showAssetInfo, setShowAssetInfo] = useState(false);

  const handleAddClick = () => {
    setShowAssetInfo(true);       // ✅ 부모는 입력 중에 state 안 바뀜 → 재렌더 안 됨
  };

  const handleComplete = useCallback((draft) => {
    setAssetList(prev => [...prev, draft]);  // ✅ 완료 시에만 부모 갱신
    setShowAssetInfo(false);
  }, [setAssetList]);

  return (
    <div className='setup-page'>
      {showAssetInfo ? (
        <AssetInfo onComplete={handleComplete} onCancel={() => setShowAssetInfo(false)} />
      ) : (
        <>
          <h1>어떤 자산을 <br />가지고 계신가요?</h1>

          {assetList
            .filter(bundle => bundle.id > 1)
            .map(bundle => (
              <ResultButton
                key={bundle.id}
                purchasePrice={bundle.purchasePrice.price + bundle.purchasePrice.unit}
                currentPrice={bundle.currentPrice.price + bundle.currentPrice.unit}
                hasLoan={bundle.hasLoan}
                loanPrice={bundle.loanPrice.price + bundle.loanPrice.unit}
                interestRate={bundle.interestRate}
                repayment={bundle.repayment.price + bundle.repayment.unit}
                compound={bundle.compound}
              />
            ))}

          <AddButton className='add link' onClick={handleAddClick}>
            + 자산 추가하기
          </AddButton>

          <div className="nav-buttons">
            <div className='goto-container'>
              <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
              <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** ---- 입력 화면 (자식 내부에서 draft 관리) ---- */
const AssetInfo = memo(function AssetInfo({ onComplete, onCancel }) {
  const [draft, setDraft] = useState(() => ({
    id: Date.now(),
    category: null,
    purchasePrice: {price: '', unit: unit.items[0]},
    currentPrice: {price: '', unit: unit.items[0]},
    hasLoan: false,
    loanPrice: {price: '', unit: unit.items[0]},
    interestRate: '',
    repayment: {price: '', unit: unit.items[0]},
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



  return (
    <div className='setup-page'>
      <h1>어떤 자산을 <br /> 가지고 계신가요?</h1>

      <div style={{ marginLeft: 30 }}>
        <InputBlock label='카테고리'>
          <CategoryButton
            items={cat.items}
            size="medium"
            selected={draft.category}
            onSelect={v => update('category', v)}
          />
        </InputBlock>

        <InputBlock label='구매가'>
          <div className='inline-field'>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={draft.purchasePrice.price}
              onChange={e => updateMoney('purchasePrice', 'price', e.target.value)}
            />
            <CategoryButton
              items={unit.items}
              size="small"
              selected={draft.purchasePrice.unit}
              onSelect={v => updateMoney('purchasePrice', 'unit', v)}
            />
          </div>
        </InputBlock>

        <InputBlock label='현재 싯가'>
          <div className='inline-field'>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={draft.currentPrice.price}
              onChange={e => updateMoney('currentPrice', 'price', e.target.value)}
            />
            <CategoryButton
              items={unit.items}
              size="small"
              selected={draft.currentPrice.unit}
              onSelect={v => updateMoney('currentPrice', 'unit', v)}
            />
          </div>
        </InputBlock>

        <br /><br /><br />

        <div className='inline-field'>
          <div style={{ fontFamily: 'Pretendard', fontWeight: 400, fontSize: 24 }}>대출 여부</div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={draft.hasLoan}
              onChange={e => update('hasLoan', e.target.checked)}
            />
            <span className="slider" />
            <span className="toggle-text">{draft.hasLoan ? '예' : '아니오'}</span>
          </label>
        </div>

        {draft.hasLoan && (
          <>
            <InputBlock label='대출금'>
              <div className='inline-field'>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={draft.loanPrice.price}
                  onChange={e => updateMoney('loanPrice', 'price', e.target.value)}
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
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={draft.interestRate}
                  onChange={e => update('interestRate', e.target.value)}
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
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={draft.repayment.price}
                  onChange={e => updateMoney('repayment', 'price', e.target.value)}
                />
                <CategoryButton
                  items={unit.items}
                  size="small"
                  selected={draft.repayment.unit}
                  onSelect={v => updateMoney('repayment', 'unit', v)}
                />
              </div>
            </InputBlock>
          </>
        )}
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
