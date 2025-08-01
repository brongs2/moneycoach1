import './App.css';
import Setupbasic from './pages/Setup_basic';
import Setupassets from './pages/Setup_assets';
import {useState} from 'react';



export default function MyApp() {
  const [state, setState] = useState(0);
  return (
    <div>
      {state === 0 && <Setupbasic onNext = {() => setState(1)} onPrev = {() => setState(0)} />}
      {state === 1 && <Setupassets onNext = {() => setState(2)} onPrev = {() => setState(0)} />}
    </div>
  );
}
