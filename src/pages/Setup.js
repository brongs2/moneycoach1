import '../App.css';
import Setupbasic from './Setup_Basic';
import SetupCheckAsset from './Setup_Checking';
import Setupsaving from './Setup_Savings'; 
import Setupinvestment from './Setup_Investment';
import SetupMyAsset from './Setup_Asset';
import SetupMyLoan from './Setup_Debt';
import {useState} from 'react';
import { useWizard } from '../useWizard';



export default function Setup({onNext, onPrev}) {
  const { handleNext } = useWizard();
  const [state, setState] = useState(0);
  const [data, setData] = useState([
    {}
  ]);

    const submit = async () => {
      // 간단한 전처리/검증: 빈 항목 제거 + 금액 숫자화
      console.log("send")
      const savingpayload = savinglists
        .map(({ id, category, amount, unit }) => ({
          id,
          category,
          unit,
          amount: Number(amount) || 0,
        }))
        .filter((row) => row.category && row.unit);
         console.log("📦 보내는 데이터:", savingpayload); 
      const investpayload = investlists
      .map(({ id, category, amount, unit }) => ({
        id,
        category,
        unit,
        amount: Number(amount) || 0,
      }))
      .filter((row) => row.category && row.unit);
       console.log("📦 보내는 데이터:", investpayload); 
      await handleNext({
        pageKey: "savings",
        data: savingpayload,
        onSaved: onNext,
      });
      await handleNext({
        pageKey: "savings",
        data: investpayload,
        onSaved: onNext,
      })
    };
  
  return (
    <div>
      <div style={{ display: state === 0 ? 'block' : 'none' }}>
        <Setupbasic onNext={() => setState(1)} onPrev={onPrev} />
      </div>

      <div style={{ display: state === 1 ? 'block' : 'none' }}>
        <SetupCheckAsset onNext={() => setState(2)} onPrev={() => setState(0)} />
      </div>

      <div style={{ display: state === 2 ? 'block' : 'none' }}>
        <Setupsaving onNext={() => setState(3)} onPrev={() => setState(1)} savinglists={savinglists} setSavingLists={setSavingLists}/>
      </div>

      <div style={{ display: state === 3 ? 'block' : 'none' }}>
        <Setupinvestment onNext={() => setState(4)} onPrev={() => setState(2)} investlists={investlists} setInvestlists = {setInvestlists} />
      </div>

      <div style={{ display: state === 4 ? 'block' : 'none' }}>
        <SetupMyAsset onNext={() => setState(5)} onPrev={() => setState(3)} />
      </div>
      
      <div style={{ display: state === 5 ? 'block' : 'none' }}>
        <SetupMyLoan onNext={submit} onPrev={() => setState(4)} />
      </div>

    </div>
  );
}
