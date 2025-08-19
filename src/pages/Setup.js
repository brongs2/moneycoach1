import '../App.css';
import Setupbasic from './Setup_Basic';
import SetupCheckAsset from './Setup_CheckAsset';
import Setupsaving from './Setup_Savings'; 
import Setupinvestment from './Setup_Investment';
import SetupMyAsset from './Setup_Asset';
import SetupMyLoan from './Setup_Loan';
import {useState} from 'react';




export default function Setup({onNext, onPrev}) {
  const [state, setState] = useState(0);
  return (
    <div>
      <div style={{ display: state === 0 ? 'block' : 'none' }}>
        <Setupbasic onNext={() => setState(1)} onPrev={onPrev} />
      </div>

      <div style={{ display: state === 1 ? 'block' : 'none' }}>
        <SetupCheckAsset onNext={() => setState(2)} onPrev={() => setState(0)} />
      </div>

      <div style={{ display: state === 2 ? 'block' : 'none' }}>
        <Setupsaving onNext={() => setState(3)} onPrev={() => setState(1)} />
      </div>

      <div style={{ display: state === 3 ? 'block' : 'none' }}>
        <Setupinvestment onNext={() => setState(4)} onPrev={() => setState(2)} />
      </div>

      <div style={{ display: state === 4 ? 'block' : 'none' }}>
        <SetupMyAsset onNext={() => setState(5)} onPrev={() => setState(3)} />
      </div>
      
      <div style={{ display: state === 5 ? 'block' : 'none' }}>
        <SetupMyLoan onNext={onNext} onPrev={() => setState(4)} />
      </div>

    </div>
  );
}
