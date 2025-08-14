import { useState, useRef } from 'react';
import AddButton from '../components/AddButton';
import InputBlock from "../components/InputBlock";
import './Page.css';
import CategoryButton from '../components/CategoryButton';
import GotoButton from '../components/GotoButton';
import ResultButton from '../components/ResultButton';

export default function SetupAssets({ onPrev, onNext, assetList, setAssetList }) {
  const [showAssetInfo, setShowAssetInfo] = useState(false);
  const nextIdRef = useRef(2);

  function handleAddClick() {
    // 새 항목을 assetList에 추가하고 작성 화면으로 이동
    setAssetList(prev => [
      ...prev,
      {
        id: nextIdRef.current++,
        category: null,
        purchasePrice: '',
        currentPrice: '',
        hasLoan: false,
        loanPrice: '',
        interestRate: '',
        repayment: '',
        compound: false,
        unitName: ''
      }
    ]);
    setShowAssetInfo(true);
  }

  // 특정 항목의 특정 키 업데이트
  const updateAssetField = (id, key, value) => {
    setAssetList(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, [key]: value } : asset
      )
    );
  };

  function AssetInfo({ asset }) {
    const cat = { name: "자산", items: ["집", "귀금속", "부동산", "땅"] };
    const unit = { name: "단위", items: ["억원", "만원"] };

    return (
      <div className='setup-page'>
        <h1>어떤 자산을 <br /> 가지고 계신가요?</h1>

        <div style={{ marginLeft: "30px" }}>
          <InputBlock label='카테고리'>
            <CategoryButton
              items={cat.items}
              key={cat.name}
              size="medium"
              onSelect={(value) => updateAssetField(asset.id, 'category', value)}
              selected={asset.category}
            />
          </InputBlock>

          <InputBlock label='구매가'>
            <div className='inline-field'>
              <input
                type="number"
                placeholder="0"
                value={asset.purchasePrice}
                onChange={e => updateAssetField(asset.id, 'purchasePrice', e.target.value)}
              />
              <CategoryButton
                items={unit.items}
                key={unit.name}
                size="small"
                selected={asset.unitName}
                onSelect={value => updateAssetField(asset.id, 'unitName', value)}
              />
            </div>
          </InputBlock>

          <InputBlock label='현재 싯가'>
            <div className='inline-field'>
              <input
                type="number"
                placeholder="0"
                value={asset.currentPrice}
                onChange={e => updateAssetField(asset.id, 'currentPrice', e.target.value)}
              />
              <CategoryButton
                items={unit.items}
                key={unit.name}
                size="small"
                selected={asset.unitName}
                onSelect={value => updateAssetField(asset.id, 'unitName', value)}
              />
            </div>
          </InputBlock>

          <br /><br /><br />

          <div className='inline-field'>
            <div style={{ fontFamily: 'Pretendard', fontWeight: '400', fontSize: '24px' }}>대출 여부</div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={asset.hasLoan}
                onChange={e => updateAssetField(asset.id, 'hasLoan', e.target.checked)}
              />
              <span className="slider" />
              <span className="toggle-text">{asset.hasLoan ? '예' : '아니오'}</span>
            </label>
          </div>

          {asset.hasLoan && (
            <>
              <InputBlock label='대출금'>
                <div className='inline-field'>
                  <input
                    type="number"
                    placeholder="0"
                    value={asset.loanPrice}
                    onChange={e => updateAssetField(asset.id, 'loanPrice', e.target.value)}
                  />
                  <CategoryButton
                    items={unit.items}
                    key={unit.name}
                    size="small"
                    selected={asset.unitName}
                    onSelect={value => updateAssetField(asset.id, 'unitName', value)}
                  />
                </div>
              </InputBlock>

              <InputBlock label='이자율'>
                <div className='inline-field'>
                  <input
                    type="number"
                    placeholder="0"
                    value={asset.interestRate}
                    onChange={e => updateAssetField(asset.id, 'interestRate', e.target.value)}
                  />
                  %
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={asset.compound}
                      onChange={e => updateAssetField(asset.id, 'compound', e.target.checked)}
                    />
                    <span className="slider" />
                    <span className="toggle-text">{asset.compound ? '복리' : '단리'}</span>
                  </label>
                </div>
              </InputBlock>

              <InputBlock label='월 상환액'>
                <div className='inline-field'>
                  <input
                    type="number"
                    placeholder="0"
                    value={asset.repayment}
                    onChange={e => updateAssetField(asset.id, 'repayment', e.target.value)}
                  />
                  <CategoryButton
                    items={unit.items}
                    key={unit.name}
                    size="small"
                    selected={asset.unitName}
                    onSelect={value => updateAssetField(asset.id, 'unitName', value)}
                  />
                </div>
              </InputBlock>
            </>
          )}
        </div>

        <div className="nav-buttons">
          <div className='goto-container'>
            <GotoButton
              variant="complete"
              onClick={() => setShowAssetInfo(false)}
            >
              완료
            </GotoButton>
          </div>
        </div>
      </div>
    );
  }

  const editingAsset = assetList[assetList.length - 1];

  return (
    <div className='setup-page'>
      {showAssetInfo && editingAsset ? (
        <AssetInfo asset={editingAsset} />
      ) : (
        <>
          <h1>어떤 자산을 <br />가지고 계신가요?</h1>

          {assetList
            .filter(bundle => bundle.id > 1)
            .map(bundle => (
              <ResultButton
                key={bundle.id}
                purchasePrice={bundle.purchasePrice}
                currentPrice={bundle.currentPrice}
                hasLoan={bundle.hasLoan}
                loanPrice={bundle.loanPrice}
                interestRate={bundle.interestRate}
                repayment={bundle.repayment}
                compound={bundle.compound}
              />
            ))}

          <AddButton
            className='add link'
            onClick={handleAddClick}
          >
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
