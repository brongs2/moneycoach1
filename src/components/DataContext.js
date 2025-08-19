import { createContext, useContext, useMemo, useState, useCallback } from 'react';



const BasicCtx = createContext();        // [value, setValue]
const CheckingCtx = createContext();
const SavingsCtx = createContext();
const InvestmentsCtx = createContext();
const AssetsCtx = createContext();
const DebtsCtx = createContext();

export function SetupDataProvider({ children }) {
  const [basic, setBasic] = useState({});
  const [checking, setChecking] = useState({});
  const [savings, setSavings] = useState([]);         // 배열은 통째 교체 권장
  const [investments, setInvestments] = useState([]); // 배열은 통째 교체 권장
  const [assets, setAssets] = useState([]);  // changed from {} to []
  const [debts, setDebts] = useState({});

  // 읽기 전용 전체 데이터 필요할 때 사용(제출 등)
  const all = useMemo(
    () => ({ basic, checking, savings, investments, assets, debts }),
    [basic, checking, savings, investments, assets, debts]
  );

  return (
    <BasicCtx.Provider value={[basic, setBasic]}>
      <CheckingCtx.Provider value={[checking, setChecking]}>
        <SavingsCtx.Provider value={[savings, setSavings]}>
          <InvestmentsCtx.Provider value={[investments, setInvestments]}>
            <AssetsCtx.Provider value={[assets, setAssets]}>
              <DebtsCtx.Provider value={[debts, setDebts]}>
                {/* all 을 하위에서 쓸 수 있게 children에 prop으로 전달하는 대신,
                    훅으로 노출 */}
                {children}
                {/* hidden portal 없음 */}
              </DebtsCtx.Provider>
            </AssetsCtx.Provider>
          </InvestmentsCtx.Provider>
        </SavingsCtx.Provider>
      </CheckingCtx.Provider>
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
  const [basic] = useBasic();
  const [checking] = useChecking();
  const [savings] = useSavings();
  const [investments] = useInvestments();
  const [assets] = useAssets();
  const [debts] = useDebts();
  return useMemo(
    () => ({ basic, checking, savings, investments, assets, debts }),
    [basic, checking, savings, investments, assets, debts]
  );
}

/** 편의: 객체 조각은 병합 set */
export function useMergeObject(setter) {
  return useCallback((patch) => setter(prev => ({ ...(prev || {}), ...(patch || {}) })), [setter]);
}
