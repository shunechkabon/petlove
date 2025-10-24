import { useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon/Icon";
import s from "./Modal.module.css";

const modalRoot = document.body;

const Modal = ({ isOpen, onClose, children, ariaLabel = "Dialog", className = "" }) => {
    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e) => e.key === "Escape" && onClose?.();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const onBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose?.();
    };

    return createPortal(
        <div className={s.backdrop} onClick={onBackdrop}>
            <div
                className={`${s.modal} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
            >
                <button
                    type="button"
                    className={s.closeBtn}
                    aria-label="Close dialog"
                    onClick={onClose}
                >
                    <Icon name="cross" width={24} height={24} className={s.closeIcon} />
                </button>

                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
