import { Link } from "react-router-dom";
import Modal from "../Modal";
import dogEmoji from "../../../assets/images/emoji-dog.png";
import s from "./ModalAttention.module.css";

const ModalAttention = ({ open, onClose }) => {
    return (
        <Modal isOpen={open} onClose={onClose} ariaLabel="Attention" className={s.modal}>
            <div className={s.content}>
                <div className={s.emojiContainer}>
                    <img src={dogEmoji} alt="Dog emoji" className={s.emoji} />
                </div>
    
                <h3 className={s.title}>Attention</h3>
    
                <p className={s.text}>
                    We would like to remind you that certain functionality is
                    available only to authorized users.If you have an account,
                    please log in with your credentials. If you do not already have
                    an account, you must register to access these features.
                </p>
    
                <div className={s.actions}>
                    <Link to="/login" className={`${s.btnLogIn} ${s.btn}`} onClick={onClose}>Log In</Link>
                    <Link to="/register" className={`${s.btnReg} ${s.btn}`} onClick={onClose}>Registration</Link>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAttention;
