import { Link } from "react-router-dom";
import Modal from "../Modal";
import catEmoji from "../../../assets/images/emoji-cat.png";
import s from "./ModalCongrats.module.css";

const ModalCongrats = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <Modal isOpen={open} onClose={onClose} ariaLabel="Congratulations" className={s.modal}>
            <div className={s.container}>
                <div className={s.emojiContainer}>
                    <img src={catEmoji} alt="Cat emoji" className={s.emoji} />
                </div>

                <h3 className={s.title}>Congrats</h3>

                <p className={s.text}>
                    The first fluff in the favorites! May your friendship be the happiest and filled with fun.
                </p>

                <Link to="/profile" className={s.btn} onClick={onClose}>
                    Go to profile
                </Link>
            </div>
        </Modal>
    );
};

export default ModalCongrats;
