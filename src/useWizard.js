// src/hooks/useWizard.js
const API = "https://a4bca7db2aa0.ngrok-free.app";

async function postJSON(url, body) {
  console.log('[API] POST', url, body);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => '');
  if (!res.ok) {
    console.error('[API] Error', res.status, text);
    throw new Error(`HTTP ${res.status} ${text}`);
  }
  try {
    const json = text ? JSON.parse(text) : null;
    console.log('[API] OK', json);
    return json;
  } catch {
    console.log('[API] OK (non-JSON)', text);
    return text;
  }
}

export function useWizard() {
  /**
   * pageKey: 저장할 페이지 키 (예: "savings", "investments")
   * data   : 페이지에서 넘긴 데이터 (배열/객체)
   * onSaved: 저장 성공 시 실행할 콜백(보통 onNext)
   */
  const handleNext = async ({ pageKey, data, onSaved }) => {
    console.log('[Wizard] handleNext', { pageKey, data });
    if (pageKey === 'data') {
      await postJSON(`${API}/data`, {data});
    } else if (pageKey === 'investments') {
      await postJSON(`${API}/investments`, { investments: data });
    } else {
      console.warn('[Wizard] Unknown pageKey, no API call performed:', pageKey);
    }
    await onSaved?.();
  };

  return { handleNext };
}
