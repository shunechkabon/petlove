import { useState } from "react";
import ModalEditUser from "../../Modals/ModalEditUser/ModalEditUser";
import Icon from "../../Icon/Icon";
import s from "./EditUserBtn.module.css";

const EditUserBtn = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <>
            <button type="button" className={s.btn} onClick={handleOpen}>
                <Icon name="edit" width={18} height={18} className={s.icon} />
            </button>

            {open && <ModalEditUser onClose={handleClose} />}
        </>
    );
};

export default EditUserBtn;