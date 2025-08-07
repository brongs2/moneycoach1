import '../App.css';
import Setupbasic from './Setup_basic';
import Setupassets from './Setup_assets';
import Setupsaving from './Setup_savings'; 
import Setupinvestment from './Setup_investment'
import {useState} from 'react';



export default function Setup() {
  const [state, setState] = useState(0);
  return (
    <div>
      {state === 0 && <Setupbasic onNext = {() => setState(1)} onPrev = {() => setState(0)} />}
      {state === 1 && <Setupassets onNext = {() => setState(2)} onPrev = {() => setState(0)} />}
      {state === 2 && <Setupsaving onNext = {() => setState(3)} onPrev = {() => setState(1)} /> }
      {state === 3 && <Setupinvestment onNext = {() => setState(4)} onPrev = {() => setState(2)} /> }


    </div>
  );
}
