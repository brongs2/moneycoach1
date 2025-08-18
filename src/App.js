import './App.css';
import Setup from './pages/Setup';
import Plan from './pages/Plan';
import { useState } from 'react';
import Test from './Test';
export default function MyApp() {
  const [state, setState] = useState(0);

  const onNext = () => setState(state + 1);
  const onPrev = () => setState(state - 1);

  return (
    <>
      {state === 0 && <Setup onNext={onNext} onPrev={onPrev} />}
      {state === 1 && <Plan onNext={onNext} onPrev={onPrev} />}
    </>
  );
  // return <Test/>;
}
