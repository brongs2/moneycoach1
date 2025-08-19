import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function Test() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // GET: 목록 불러오기
  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`${API}/items`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // POST: 아이템 추가 (버튼으로 실행)
  const addItem = async () => {
    const name = form.name.trim();
    const price = Number(form.price);
    if (!name || Number.isNaN(price)) {
      setErr("name과 price를 올바르게 입력하세요.");
      return;
    }
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`${API}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json(); // 응답은 사용 안 하지만 확인용
      setForm({ name: "", price: "" });
      await load(); // 리스트 갱신
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 640, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>React ⇄ FastAPI</h1>

      <section style={{ marginBottom: 20 }}>
        <h3>새 아이템 추가</h3>
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr auto" }}>
          <input
            placeholder="name (e.g. Orange)"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          <input
            placeholder="price (e.g. 1.5)"
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
          />
          <button onClick={addItem}>Add</button>
        </div>
      </section>

      <section>
        <h3>목록</h3>
        {loading && <p>Loading…</p>}
        {err && <p style={{ color: "crimson" }}>에러: {err}</p>}
        <ul>
          {items.map((it, i) => (
            <li key={i}>
              {it.name} — ${it.price}
            </li>
          ))}
        </ul>
        <button onClick={load} style={{ marginTop: 12 }}>Refresh</button>
      </section>
    </main>
  );
}
