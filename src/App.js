import './App.css';
import Setup from './pages/Setup';
import Plan from './pages/Plan';
import { useState } from 'react';
import Test from './test';
export default function MyApp() {
  const [state, setState] = useState(0);

  const onNext = () => setState(state + 1);
  const onPrev = () => setState(state - 1);

  return (
  <>
    <div style={{ display: state === 0 ? 'block' : 'none' }}>
      <Setup onNext={onNext} onPrev={onPrev} />
    </div>
    <div style={{ display: state === 1 ? 'block' : 'none' }}>
      <Plan onNext={onNext} onPrev={onPrev} />
    </div>
  </>
);
}
