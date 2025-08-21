import AssetButton from "../components/Assetbutton";
import GotoButton from "../components/GotoButton";
import {useState} from 'react';
import { FaPiggyBank, FaChartLine, FaGem, FaArrowDown } from 'react-icons/fa';
import './Page.css'



export default function SetupCheckAsset({onPrev, onNext, type, setType}){
  const [selectedList, setSelectedList] = useState([]);
  const MASK = { saving: 8, investment: 4, tangible: 2, debt: 1 };


  const toggleWithType = (title, mask) => {
    const exists = selectedList.includes(title);
    // 1) update the visual selection list
    setSelectedList(prev => (
      exists ? prev.filter(item => item !== title) : [...prev, title]
    ));
    // 2) update the accumulated type outside of setSelectedList
    setType(prev => prev + (exists ? -mask : mask));
    console.log(type)
  };

    return (
    <div style={{background: '#eee'}}>
      
    <div className="setup-page" >
        <h1> 가지고 있는 자산을<br/> 모두 체크해주세요 </h1>
        <AssetButton
          icon={<FaPiggyBank />}
          title="저축"
          description="가지고 있는 현금, 예금 등의 현금성 자산"
          isSelected={selectedList.includes('저축')}
          onClick={() => toggleWithType('저축', MASK.saving)}
        />
        <AssetButton
          icon={<FaChartLine />}
          title="투자"
          description="주식, 부동산, 암호화폐 등 투자성 자산"
          isSelected={selectedList.includes('투자')}
          onClick={() => toggleWithType('투자', MASK.investment)}
        />
        <AssetButton
          icon={<FaGem />}
          title="유형자산"
          description="보석, 미술품 등 실물 자산"
          isSelected={selectedList.includes('유형자산')}
          onClick={() => toggleWithType('유형자산', MASK.tangible)}
        />
        <AssetButton
          icon={<FaArrowDown />}
          title="부채"
          description="학자금 대출, 신용 대출 등 부채"
          isSelected={selectedList.includes('부채')}
          onClick={() => toggleWithType('부채', MASK.debt)}
        />
         <div className="nav-buttons">
          <div className = 'goto-container'>
            
            <GotoButton variant="left" onClick={onPrev}>이전</GotoButton>
            <GotoButton variant="right" onClick={onNext}>다음</GotoButton>
          </div>
        </div>
    </div>
    </div>
  );
}