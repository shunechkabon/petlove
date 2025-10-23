import { useEffect } from "react";
import s from "./Burger.module.css";
import Icon from "../../Icon/Icon";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";

const Burger = ({ className = "", open, onClose }) => {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    const closeOnLink = (e) => {
        if (e.target.closest("a")) onClose();
    };

    if (!open) return null;

    return (
        <div className={`${s.burger} ${className}`}>
            <div className={s.backdrop} onClick={onClose} />
            <div
                id="mobile-menu"
                className={s.panel}
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
                        width="32"
                        height="32"
                        className={s.icon}
                    />
                </button>

                <Nav className={s.nav} />
                <AuthNav className={s.authNav} />
            </div>
        </div>
    );
};

export default Burger;
