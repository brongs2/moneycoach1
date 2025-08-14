import { useState } from 'react';
import AddButton from '../components/AddButton';
import InputBlock from "../components/InputBlock";

import './Page.css';
import CategoryButton from '../components/CategoryButton';
import GotoButton from '../components/GotoButton';
import ResultButton from '../components/ResultButton';




export default function SetupAssets({onPrev, onNext, assetList, setAssetList}){
    const[showAssetInfo, setShowAssetInfo] = useState(false);

    const[purchasePrice, setPurchasePrice] = useState('');
    const[currentPrice, setCurrentPrice] = useState('');
    const[loanPrice, setLoanPrice] = useState('');
    
    const[hasLoan, setHasLoan] = useState(false);
    const[interest,setInterest] = useState(false);
    const[interestRate,setInterestRate] = useState('');
    const[repayment,setRepayment] = useState('');
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [unitName, setUnitName] = useState("");

    const cat =  { name: "자산", items: ["집", "귀금속", "부동산", "땅"]};
    const unit = { name: "단위", items: ["억원", "만원"]};

    let nextId = 2;

    function handleAddClick(){
        setShowAssetInfo(true);
    }
    function handleComplete(){
        const id = Date.now();
        setAssetList(prev => [
            ...prev,
            {
                id,
                category: selectedCategory,
                purchasePrice,
                currentPrice,
                hasLoan,
                loanPrice,
                interestRate,
                repayment,
                compound: interest,
                unitName,
            }
        ]);
        setShowAssetInfo(false);
    }


    function AssetInfo(){
        
        return(
            <div className='setup-page'>

                <h1>어떤 자산을 <br /> 가지고 계신가요?</h1>
                
                <div  style={{marginLeft: "30px"}}>
                    <InputBlock label = '카테고리'>
                        <CategoryButton
                        items={cat.items}
                        key={cat.name}
                        size="medium"
                        onSelect={(value) => setSelectedCategory(value)}

                        />
                    </InputBlock>
                    <InputBlock label = '구매가'>
                        <div className = 'inline-field' >
                        <input
                        type="number"
                        placeholder="0"
                        value={purchasePrice}
                        onChange={e => setPurchasePrice(e.target.value)}
                        />
                        <CategoryButton
                        items = {unit.items}
                        key={unit.name} 
                        size = "small"
                        />
                        </div>
                    </InputBlock>
                    <InputBlock label = '현재 싯가'>
                        <div className = 'inline-field' >
                            <input
                            type="number"
                            placeholder="0"
                            value={currentPrice}
                            onChange={e => setCurrentPrice(e.target.value)}
                            />
                            <CategoryButton
                            items = {unit.items}
                            key={unit.name} 
                            size = "small"
                            />
                        </div>
                    </InputBlock>

                    <br /><br /><br />

                    <div className='inline-field'>
                        <div style = {{ fontFamily:'Pretendard', fontWeight:'400', fontSize:'24px'}}>대출 여부</div>
                        <label className="toggle">
                            <input
                            type="checkbox"
                            checked={hasLoan}
                            onChange={e => setHasLoan(e.target.checked)}
                            />
                            <span className="slider" />
                            <span className="toggle-text">{hasLoan ? '예' : '아니오'}</span>
                        </label>
                    </div>
                    {hasLoan && 
                        <>
                            <InputBlock label = '대출금'>
                                <div className = 'inline-field' >
                                    <input
                                    type="number"
                                    placeholder="0"
                                    value={loanPrice}
                                    onChange={e => setLoanPrice(e.target.value)}
                                    />
                                    <CategoryButton
                                    items = {unit.items}
                                    key={unit.name} 
                                    size = "small"
                                    />
                                </div>
                            </InputBlock>
                            <InputBlock label = '이자율'>
                                <div className = 'inline-field' >
                                <input
                                type="number"
                                placeholder="0"
                                value={interestRate}
                                onChange={e => setInterestRate(e.target.value)}
                                />
                                %
                                <label className="toggle">
                                    <input
                                    type="checkbox"
                                    checked={interest}
                                    onChange={e => setInterest(e.target.checked)}
                                    />
                                    <span className="slider" />
                                    <span className="toggle-text">{interest ? '복리' : '단리'}</span>
                                </label>
                                </div>
                            </InputBlock>
                            <InputBlock label = '월 상환액'>
                                <div className = 'inline-field' >
                                    <input
                                    type="number"
                                    placeholder="0"
                                    value={repayment}
                                    onChange={e => setRepayment(e.target.value)}
                                    />
                                    <CategoryButton
                                    items = {unit.items}
                                    key={unit.name} 
                                    size = "small"
                                    />
                                </div>
                            </InputBlock>
                        </>
                    }
                </div>

            <div className="nav-buttons">
                <div className = 'goto-container'>
                    <GotoButton variant="complete" onClick={(handleComplete)}>완료</GotoButton>
                </div>
            </div>
        </div>
        );
    }


    return (
        <div className='setup-page'>
            {showAssetInfo? 
                <AssetInfo/> :
                (
                <><h1>어떤 자산을 <br />가지고 계신가요?</h1>
                    
                    {assetList                   
                      .filter(bundle => bundle.id > 1)
                      .map(bundle => (
                       
                        <ResultButton
                            key = {bundle.id}
                            purchasePrice={bundle.purchasePrice}
                            currentPrice={bundle.currentPrice}
                            hasloan={bundle.hasLoan}
                            loanPrice={bundle.loanPrice}
                            interestRate={bundle.interestRate}
                            repayment={bundle.repayment}
                            compound={bundle.compound}
                        />
                    ))}
                    <AddButton
                        className = 'add link'
                        onClick = {handleAddClick}
                    >
                            + 자산 추가하기
                    </AddButton>
                <div className="nav-buttons">
                    <div className = 'goto-container'>
                        <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
                        <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
                    </div>
                </div>
            </>
            )   
            }
            
        </div>
    );
}