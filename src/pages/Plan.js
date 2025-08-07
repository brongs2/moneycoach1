import AddPlan from "./Add_plan";
import Revenue from "./Revenue";
import Consume from "./Consume";
import Priority from "./Priority";
import {useState} from 'react';
export default function Plan(){
    const [state, setState] = useState(0);
    const [title, setTitle] = useState("제목1");
      return (
        <div>
          {state === 0 && <AddPlan title = {title} setTitle = {setTitle} onNext = {() => setState(1)} onPrev = {() => setState(0)} />}
          {state === 1 && <Revenue title = {title} setTitle = {setTitle} onNext = {() => setState(2)} onPrev = {() => setState(0)} />}
          {state === 2 && <Consume title = {title} setTitle = {setTitle} onNext = {() => setState(3)} onPrev = {() => setState(1)} />}
          {state === 3 && <Priority title = {title} setTitle = {setTitle} onNext = {() => setState(4)} onPrev = {() => setState(2)} />}

        </div>
      );
}