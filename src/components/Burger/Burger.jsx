import { useEffect, useState } from "react";
import s from "./Burger.module.css";
import Icon from "../Icon/Icon";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";

const Burger = ({ className = "" }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    const closeOnLink = (e) => {
        if (e.target.closest("a")) setOpen(false);
    };

    return (
        <div className={`${s.burger} ${className}`}>
            <button
                type="button"
                className={s.btn}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
            >
                {open ?
                    <Icon
                        name="cross"
                        width="var(--burger-icon-w)"
                        height="var(--burger-icon-h)"
                        className={s.icon}
                    /> :
                    <Icon
                        name="menu"
                        width="var(--burger-icon-w)"
                        height="var(--burger-icon-h)"
                        className={s.icon}
                    />
                }
            </button>

            {open && (
                <>
                    <div className={s.backdrop} onClick={() => setOpen(false)} />
                    <div id="mobile-menu" className={s.panel} onClickCapture={closeOnLink}>
                        <Nav />
                        <AuthNav />
                    </div>
                </>
            )}
        </div>
    );
};

export default Burger;
