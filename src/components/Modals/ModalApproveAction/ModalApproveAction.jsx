import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../../../redux/auth/operations";
import Modal from "../Modal";
import catEmoji from "../../../assets/images/emoji-cat.png";
import s from "./ModalApproveAction.module.css";

const ModalApproveAction = ({
    isOpen,
    onClose,
    title = "Already leaving?",
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleApprove = async () => {
        await dispatch(logoutUser())
            .unwrap()
            .catch((msg) => toast.error(msg));
        onClose?.();
        navigate("/home");
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} ariaLabel={title} className={s.modal}>
            <div className={s.content}>
                <div className={s.emojiContainer}>
                    <img src={catEmoji} alt="Cat emoji" className={s.emoji} />
                </div>

                <h3 className={s.title}>{title}</h3>

                <div className={s.actions}>
                    <button type="button" className={`${s.approve} ${s.btn}`} onClick={handleApprove}>
                        Yes
                    </button>
                    <button type="button" className={`${s.cancel} ${s.btn}`} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalApproveAction;
