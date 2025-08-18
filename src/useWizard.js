// src/hooks/useWizard.js
const API = "http://127.0.0.1:8000";

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${text}`);
  }
  return res.json();
}

export function useWizard() {
  /**
   * pageKey: 저장할 페이지 키 (예: "savings")
   * data   : 페이지에서 넘긴 데이터 (배열/객체)
   * onSaved: 저장 성공 시 실행할 콜백(보통 onNext)
   */
  const handleNext = async ({ pageKey, data, onSaved }) => {
    if (pageKey === "savings") {
      // 백엔드가 /savings 에서 { savings: [...] }를 받는다고 가정(A안)
      await postJSON(`${API}/savings`, { savings: data });
    }
    // 다른 페이지 키들도 이 패턴으로 추가 가능
    await onSaved?.();
  };

  return { handleNext };
}
