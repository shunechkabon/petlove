import Icon from "../../Icon/Icon";
import s from "./EditUserBtn.module.css";

const EditUserBtn = ({ loading, onClick }) => {
    return (
        <>
            <button type="button" className={s.btn} onClick={onClick} disabled={loading}>
                <Icon name="edit" width={18} height={18} className={s.icon} />
            </button>
        </>
    );
};

export default EditUserBtn;