import { useEffect, useRef, useState } from "react";
import Setupinvest1 from "./Setup_invest1";
import Setupinvest2 from "./Setup_invest2";

export default function Setupinvestment({ onNext, onPrev }) {
    const invest1Ref = useRef(null);
    const invest2Ref = useRef(null);

    const [visibleStep2, setVisibleStep2] = useState(false);
    const title = visibleStep2? 
    <>투자 수익률을<br /> 설정해주세요</> : <>투자는<br/> 어떻게 하고 계신가요?</>;

    useEffect(() => {
    const observer = new IntersectionObserver(
        entries => {
        entries.forEach(entry => {
            if (entry.target === invest2Ref.current) {
            setVisibleStep2(entry.isIntersecting);
            }
        });
        },
        { threshold: 0.3 }
    );

    if (invest2Ref.current) observer.observe(invest2Ref.current);
    return () => observer.disconnect();
    }, []);

    const scrollToInvest2 = () => {
        if (invest2Ref.current) {
            const offset = window.innerHeight * 0.12; // 화면 높이의 25%
             const y =
                invest2Ref.current.getBoundingClientRect().top +
                window.pageYOffset -
                offset
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const scrollToInvest1 = () => {
        if (invest1Ref.current) {
            const offset = window.innerHeight * 0.25; // 화면 높이의 25%
            const y =
                invest1Ref.current.getBoundingClientRect().top +
                window.pageYOffset -
                offset; // 원하는 10px 오프셋
            window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    

    return (
    <div className="setup-page">
        <h1 className="setup-title">{title}</h1>
        <div className="setup-scroll-wrapper"> 
            <div ref={invest1Ref}>
                
                <Setupinvest1 onPrev={onPrev} onNext={scrollToInvest2} />
            </div>
            <div
                ref={invest2Ref}
                className={`step-container step-2 ${visibleStep2 ? "step-1" : ""}`}
            >
                <Setupinvest2 onPrev={scrollToInvest1} onNext={onNext} />
            </div>
    </div>
    </div>
    );
    }