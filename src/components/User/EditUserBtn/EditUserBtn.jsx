import s from "./EditUserBtn.module.css";

const EditUserBtn = () => {
    return <button
        type="button"
        className={s.editBtn}
        aria-label="Edit user"
    >
        EditUserBtn
    </button>;
};

export default EditUserBtn;