import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../../redux/auth/slice";
import Icon from "../../Icon/Icon";
import s from "./UserBar.module.css";

const UserBar = ({ className = "" }) => {
    const user = useSelector(selectUser);
    const name = user?.name || "User";
    const avatar = user?.avatarURL || "/src/assets/icons/user.svg";

    return (
        <NavLink to="/profile" className={`${s.userBar} ${className}`}>
            <img src={avatar} alt={`${name} avatar`} className={s.avatar} />
            <span className={s.name}>{name}</span>
            <Icon name="chevron-right" width={16} height={16} className={s.chev} />
        </NavLink>
    );
};

export default UserBar;
