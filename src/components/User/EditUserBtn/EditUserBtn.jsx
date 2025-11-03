import Icon from "../../Icon/Icon";
import s from "./EditUserBtn.module.css";

const EditUserBtn = ({ loading, onClick, className }) => {
    return (
        <>
            <button type="button" className={`${s.btn} ${className}`} onClick={onClick} disabled={loading}>
                <Icon name="edit" width={18} height={18} className={s.icon} />
            </button>
        </>
    );
};

export default EditUserBtn;