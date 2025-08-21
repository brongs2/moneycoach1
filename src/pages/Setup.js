

import SetupPersonal from './Setup_Personal';
import SetupCheckAsset from './Setup_Checking';
import Setupsaving from './Setup_Savings';
import Setupinvestment from './Setup_Investment';
import SetupMyAsset from './Setup_Asset';
import SetupMyLoan from './Setup_Debt';
import { useState, useCallback } from 'react';
import { useWizard } from '../useWizard';
import { SetupDataProvider, useAllSetupData } from '../components/DataContext';

function SubmitStep({ onNext, onPrev }) {
  const { handleNext } = useWizard();
  const data = useAllSetupData();

  const submit = useCallback(async (debtList = []) => {
    const ensureArray = (v) => (Array.isArray(v) ? v : []);
    // 기존 데이터 컨텍스트 + 부채 리스트를 합쳐서 전송
    const payload = {
      ...data,
      debt: ensureArray(debtList),
    };

    console.log('[Submit] payload:', payload);

    try {
      await handleNext({ pageKey: 'data', data: payload, onSaved: onNext });
    } catch (err) {
      console.error('[Submit] handleNext error:', err);
      alert('저장 중 오류가 발생했습니다. 개발자 콘솔을 확인하세요.');
    }
  }, [data, handleNext, onNext]);
  
  return <SetupMyLoan onNext={submit} onPrev={onPrev} />;
}

export default function Setup({ onNext, onPrev }) {
  const [step, setStep] = useState(0);

  return (
    <SetupDataProvider>
      <div style={{ display: step === 0 ? 'block' : 'none' }}>
        <SetupPersonal onNext={() => setStep(1)} onPrev={onPrev} />
      </div>
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <SetupCheckAsset onNext={() => setStep(2)} onPrev={() => setStep(0)} />
      </div>
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <Setupsaving onNext={() => setStep(3)} onPrev={() => setStep(1)} />
      </div>
      <div style={{ display: step === 3 ? 'block' : 'none' }}>
        <Setupinvestment onNext={() => setStep(4)} onPrev={() => setStep(2)} />
      </div>
      <div style={{ display: step === 4 ? 'block' : 'none' }}>
        <SetupMyAsset onNext={() => setStep(5)} onPrev={() => setStep(3)} />
      </div>
      <div style={{ display: step === 5 ? 'block' : 'none' }}>
        <SubmitStep onNext={onNext} onPrev={() => setStep(4)} />
      </div>
    </SetupDataProvider>
  );
}