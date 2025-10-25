import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = ({ className = "" }) => {
    return (
        <nav className={`${s.authNav} ${className}`} aria-label="Auth">
            <NavLink
                to="/login"
                className={({ isActive }) => `${s.logIn} ${s.link} ${isActive ? s.activeLogIn : ""}`}
            >
                LOG IN
            </NavLink>
            
            <NavLink
                to="/register"
                className={({ isActive }) => `${s.register} ${s.link} ${isActive ? s.activeRegister : ""}`}
            >
                REGISTRATION
            </NavLink>
        </nav>
    );
};

export default AuthNav;
