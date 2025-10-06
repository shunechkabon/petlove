import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
    return (
        <nav className={s.authNav} aria-label="Auth">
            <NavLink
                to="/login"
                className={({ isActive }) => `${s.logIn} ${isActive ? s.activeLogIn : ""}`}
            >
                LOG IN
            </NavLink>
            <NavLink
                to="/register"
                className={({ isActive }) => `${s.register} ${isActive ? s.activeRegister : ""}`}
            >
                REGISTRATION
            </NavLink>
        </nav>
    );
};

export default AuthNav;
