import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../../redux/auth/slice";
import Icon from "../../Icon/Icon";
import s from "./UserBar.module.css";

const UserBar = ({ className = "", showName = true }) => {
    const user = useSelector(selectUser);
    const name = user?.name || "User";
    const avatar = user?.avatar || user?.avatarURL || "";

    const onImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/fallback-avatar.png";
    };

    return (
        <NavLink to="/profile" className={`${s.userBar} ${className}`}>
            {avatar ? (
                <img src={avatar} alt={`${name} avatar`} className={s.avatar} onError={onImgError} />
            ) : (
                <div className={`${s.avatar} ${s.iconContainer}`}>
                    <Icon name="user" width={20} height={20} className={s.icon} />
                </div>
            )}
            
            {showName && <span className={s.name}>{name}</span>}
        </NavLink>
    );
};

export default UserBar;
