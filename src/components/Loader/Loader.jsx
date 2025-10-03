import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Circle } from 'rc-progress';
import s from "./Loader.module.css";

const Loader = () => {
    const [percent, setPercent] = useState(0);
    const rafId = useRef(null);

    useEffect(() => {
        const tick = () => {
            setPercent(p => {
                if (p < 60) return p + 2.5;
                if (p < 85) return p + 1.2;
                if (p < 90) return p + 0.4;
                return p;
            });
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, []);

    const clamped = Math.min(100, Math.round(percent));

    return createPortal(
        <div className={s.backdrop} role="status" aria-live="polite">
            <div className={s.box}>

                <div className={s.ringWrap}>
                    <Circle
                        percent={clamped}
                        strokeWidth={0.5}
                        trailWidth={0.5}
                        strokeColor="#fff"
                        trailColor="rgba(255,255,255,0.25)"
                        strokeLinecap="round"
                    />
                    <div className={s.value}>{clamped}%</div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Loader;
