import { useState } from "react";
import ModalApproveAction from "../../Modals/ModalApproveAction/ModalApproveAction";
import s from "./LogOutBtn.module.css";

const LogOutBtn = ({ className = ""}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`${s.btn} ${className}`}
            >
                LOG OUT
            </button>

            <ModalApproveAction
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default LogOutBtn;