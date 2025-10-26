import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/slice";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import Icon from "../../Icon/Icon";
import s from "./Burger.module.css";

const ANIM_MS = 300;

const Burger = ({ className = "", open, onClose }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const prevLoggedIn = useRef(isLoggedIn);
    const [shouldRender, setShouldRender] = useState(open);
    const [isClosing, setIsClosing] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    const panelRef = useRef(null);

    // Animation
    useLayoutEffect(() => {
        if (open) {
            setShouldRender(true);
            setIsClosing(false);
            setAnimateIn(false);
            requestAnimationFrame(() => {
                if (panelRef.current) panelRef.current.getBoundingClientRect();
                requestAnimationFrame(() => setAnimateIn(true));
            });
        } else if (shouldRender) {
            setIsClosing(true);
            const t = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, ANIM_MS);
            return () => clearTimeout(t);
        }
    }, [open, shouldRender]);

    // Esc + scroll lock
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = (open || isClosing) ? "hidden" : "";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose, isClosing]);

    // Close on logout
    useEffect(() => {
        if (prevLoggedIn.current && !isLoggedIn && open) {
            onClose();
        }
        prevLoggedIn.current = isLoggedIn;
    }, [isLoggedIn, open, onClose]);

    const closeOnLink = (e) => {
        if (e.target.closest("a")) onClose();
    };

    if (!shouldRender) return null;

    const panelStateClass = isClosing
        ? s.panelClosing
        : (open && animateIn ? s.panelOpen : "");

    return createPortal(
        <div className={`${s.burger} ${className}`}>
            <div className={s.backdrop} onClick={onClose} />
            <div
                id="mobile-menu"
                className={`${s.panel} ${panelStateClass}`}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                onClickCapture={closeOnLink}
            >
                <button
                    type="button"
                    className={s.closeBtn}
                    aria-label="Close menu"
                    onClick={onClose}
                >
                    <Icon
                        name="cross"
                        width={32}
                        height={32}
                        className={s.icon}
                    />
                </button>

                <Nav className={s.nav} />
                {isLoggedIn ? <LogOutBtn /> : <AuthNav />}
            </div>
        </div>
        , document.body);
};

export default Burger;
