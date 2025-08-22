import SetupPersonal from './Setup_Personal';
import SetupCheckAsset from './Setup_Checking';
import Setupsaving from './Setup_Savings';
import Setupinvestment from './Setup_Investment';
import SetupMyAsset from './Setup_Asset';
import SetupMyLoan from './Setup_Debt';
import { useState, useCallback } from 'react';
import { useWizard } from '../useWizard';
import { SetupDataProvider, useAllSetupData } from '../components/DataContext';

// Bit map: saving=8 (bit3), investment=4 (bit2), asset(tangible)=2 (bit1), debt=1 (bit0)
const isStepEnabled = (step, type) => {
  switch (step) {
    case 2: return ((type >> 3) & 1) === 1; // saving
    case 3: return ((type >> 2) & 1) === 1; // investment
    case 4: return ((type >> 1) & 1) === 1; // asset
    case 5: return ((type >> 0) & 1) === 1; // debt
    default: return false;
  }
};

const getNextStep = (current, type) => {
  for (let i = current + 1; i <= 5; i++) {
    if (isStepEnabled(i, type)) return i;
  }
  return null; // no further enabled step
};

const getPrevStep = (current, type) => {
  for (let i = current - 1; i >= 1; i--) {
    if (i === 1) return 1; // back to check page
    if (isStepEnabled(i, type)) return i;
  }
  return 1;
};

function SetupFlow({ onNext, onPrev }) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(0);

  const { handleNext } = useWizard();
  const data = useAllSetupData(); // ✅ inside provider

  const submit = useCallback(async (debtList = []) => {
    const ensureArray = (v) => (Array.isArray(v) ? v : []);
    const payload = { ...data, debt: ensureArray(debtList) };
    console.log('[Submit] payload:', payload);
    try {
      await handleNext({ pageKey: 'data', data: payload, onSaved: onNext });
    } catch (err) {
      console.error('[Submit] handleNext error:', err);
      alert('저장 중 오류가 발생했습니다. 개발자 콘솔을 확인하세요.');
    }
  }, [data, handleNext, onNext]);

  return (
    <>
      {/* 0. Personal */}
      <div style={{ display: step === 0 ? 'block' : 'none' }}>
        <SetupPersonal
          onNext={() => setStep(1)}
          onPrev={onPrev}
        />
      </div>

      {/* 1. Check selections */}
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <SetupCheckAsset
          type={type}
          setType={setType}
          onNext={() => {
            const next = getNextStep(1, type);
            if (next) setStep(next); else submit([]);
          }}
          onPrev={() => setStep(0)}
        />
      </div>

      {/* 2. Saving */}
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <Setupsaving
          onNext={() => {
            const next = getNextStep(2, type);
            if (next) setStep(next); else submit([]);
          }}
          onPrev={() => setStep(1)}
        />
      </div>

      {/* 3. Investment */}
      <div style={{ display: step === 3 ? 'block' : 'none' }}>
        <Setupinvestment
          onNext={() => {
            const next = getNextStep(3, type);
            if (next) setStep(next); else submit([]);
          }}
          onPrev={() => setStep(getPrevStep(3, type))}
        />
      </div>

      {/* 4. Asset */}
      <div style={{ display: step === 4 ? 'block' : 'none' }}>
        <SetupMyAsset
          onNext={() => {
            const next = getNextStep(4, type);
            if (next) setStep(next); else submit([]);
          }}
          onPrev={() => setStep(getPrevStep(4, type))}
        />
      </div>

      {/* 5. Debt */}
      <div style={{ display: step === 5 ? 'block' : 'none' }}>
        <SetupMyLoan
          onNext={submit}
          onPrev={() => setStep(getPrevStep(5, type))}
        />
      </div>
    </>
  );
}

export default function Setup({ onNext, onPrev }) {
  return (
    <SetupDataProvider>
      <SetupFlow onNext={onNext} onPrev={onPrev} />
    </SetupDataProvider>
  );
}
