import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/slice";
import Icon from "../../Icon/Icon";
import s from "./UserBlock.module.css";

const UserBlock = ({ onUploadPhoto }) => {
    const user = useSelector(selectUser);
    const name  = user?.name  || "User";
    const email = user?.email || "name@gmail.com";
    const phone = user?.phone || "+380";
    const avatar = user?.avatar || user?.avatarURL || "";

    const onImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/fallback-avatar.png";
    };

    return (
        <div className={s.block}>
            <div>
                {avatar ? (
                    <div className={s.avatar}>
                        <img
                            className={s.avatarImg}
                            src={avatar}
                            alt={`${name} avatar`}
                            onError={onImgError}
                        />
                    </div>
                ) : (
                    <div className={s.avatarDef}>
                        <div className={s.iconContainer}>
                            <Icon name="user" width={40} height={40} className={s.icon} />
                        </div>
                        <button type="button" className={s.uploadBtn} onClick={onUploadPhoto}>Upload photo</button>
                    </div>
                )}
            </div>

            <div className={s.info}>
                <h2 className={s.title}>My information</h2>

                <ul className={s.inputs}>
                    <li>
                        <input
                            className={`${s.input} ${name === "User" ? s.empty : s.filled}`}
                            type="text"
                            value={name}
                            disabled
                            readOnly />
                    </li>
                    <li>
                        <input
                            className={`${s.input} ${email === "name@gmail.com" ? s.empty : s.filled}`}
                            type="email"
                            value={email}
                            disabled
                            readOnly />
                    </li>
                    <li>
                        <input
                            className={`${s.input} ${phone === "+380" ? s.empty : s.filled}`}
                            type="tel"
                            value={phone}
                            disabled
                            readOnly />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserBlock;