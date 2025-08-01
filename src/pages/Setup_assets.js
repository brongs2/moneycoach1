import AssetButton from "../components/Assetbutton";
import {useState} from 'react';
import { FaPiggyBank, FaChartLine, FaGem, FaArrowDown } from 'react-icons/fa';
export default function Setup_assets(){
  const [selectedList, setSelectedList] = useState([]);

  const toggleSelection = (title) => {
    if (selectedList.includes(title)) {
      // 이미 선택된 항목이면 제거
      setSelectedList(selectedList.filter((item) => item !== title));
    } else {
      // 선택되지 않은 항목이면 추가
      setSelectedList([...selectedList, title]);
    }
  };
    return (
        
    <div style={{ padding: '20px', background: '#eee', height: '100vh' }}>
        <h1> 가지고 있는 자산을 모두 체크해주세요 </h1>
      <AssetButton
        icon={<FaPiggyBank />}
        title="저축"
        description="가지고 있는 현금, 예금 등의 현금성 자산"
        isSelected={selectedList.includes('저축')}
        onClick={() => toggleSelection('저축')}
      />
      <AssetButton
        icon={<FaChartLine />}
        title="투자"
        description="주식, 부동산, 암호화폐 등 투자성 자산"
        isSelected={selectedList.includes('투자')}
        onClick={() => toggleSelection('투자')}
      />
      <AssetButton
        icon={<FaGem />}
        title="유형자산"
        description="보석, 미술품 등 실물 자산"
        isSelected={selectedList.includes('유형자산')}
        onClick={() => toggleSelection('유형자산')}
      />
      <AssetButton
        icon={<FaArrowDown />}
        title="부채"
        description="학자금 대출, 신용 대출 등 부채"
        isSelected={selectedList.includes('부채')}
        onClick={() => toggleSelection('부채')}
      />
    </div>
  );
}