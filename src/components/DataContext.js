import { createContext, useContext, useMemo, useState, useCallback } from 'react';



const BasicCtx = createContext();        // [value, setValue]
const CheckingCtx = createContext();
const SavingsCtx = createContext();
const InvestmentsCtx = createContext();
const AssetsCtx = createContext();
const DebtsCtx = createContext();

export function SetupDataProvider({ children }) {
  const [personal, setPersonal] = useState({});
  const [saving, setSaving] = useState([]);         // 배열은 통째 교체 권장
  const [investment, setInvestment] = useState([]); // 배열은 통째 교체 권장
  const [asset, setAsset] = useState([]);  // changed from {} to []
  const [debt, setDebt] = useState({});

  // 읽기 전용 전체 데이터 필요할 때 사용(제출 등)
  const all = useMemo(
    () => ({ personal, saving, investment, asset, debt }),
    [personal, saving, investment, asset, debt]
  );

  return (
    <BasicCtx.Provider value={[personal, setPersonal]}>
        <SavingsCtx.Provider value={[saving, setSaving]}>
          <InvestmentsCtx.Provider value={[investment, setInvestment]}>
            <AssetsCtx.Provider value={[asset, setAsset]}>
              <DebtsCtx.Provider value={[debt, setDebt]}>
                {/* all 을 하위에서 쓸 수 있게 children에 prop으로 전달하는 대신,
                    훅으로 노출 */}
                {children}
                {/* hidden portal 없음 */}
              </DebtsCtx.Provider>
            </AssetsCtx.Provider>
          </InvestmentsCtx.Provider>
        </SavingsCtx.Provider>
    </BasicCtx.Provider>
  );
}

/** 개별 조각 훅 (자식이 props 없이 직접 씀) */
export const useBasic = () => useContext(BasicCtx);
export const useChecking = () => useContext(CheckingCtx);
export const useSavings = () => useContext(SavingsCtx);
export const useInvestments = () => useContext(InvestmentsCtx);
export const useAssets = () => useContext(AssetsCtx);
export const useDebts = () => useContext(DebtsCtx);




/** 제출용: 전체 읽기 */
export function useAllSetupData() {
  const [personal] = useBasic();
  const [saving] = useSavings();
  const [investment] = useInvestments();
  const [asset] = useAssets();
  const [debt] = useDebts();

  const cleanSaving = saving.map(({ id, ...rest }) => rest);
  const cleanInvestment = investment.map(({ id, ...rest }) => rest);
  const cleanAsset = asset.map(({ id, ...rest }) => rest);
  const cleanDebt = Array.isArray(debt) 
    ? debt.map(({ id, ...rest }) => rest) 
    : debt; // debt가 배열인지 객체인지에 따라 조정
  return useMemo(
    () => ({ personal,  saving, investment, asset, debt }),
    [personal,  saving, investment, asset, debt]
  );
}

/** 편의: 객체 조각은 병합 set */
export function useMergeObject(setter) {
  return useCallback((patch) => setter(prev => ({ ...(prev || {}), ...(patch || {}) })), [setter]);
}
