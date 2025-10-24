import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import s from "./UserNav.module.css";

const UserNav = ({ className = "" }) => {
    return (
        <nav className={`${s.userNav} ${className}`} aria-label="User">
            <LogOutBtn />
            <UserBar />
        </nav>
    );
};

export default UserNav;
