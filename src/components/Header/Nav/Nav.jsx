import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";

const Nav = ({ className = "" }) => {
    return (
        <nav className={`${s.menu} ${className}`}>
            <NavLink to="/news" className={({ isActive }) => `${s.link} ${isActive ? s.active : ""}`}>
                News
            </NavLink>
            <NavLink to="/notices" className={({ isActive }) => `${s.link} ${isActive ? s.active : ""}`}>
                Find pet
            </NavLink>
            <NavLink to="/friends" className={({ isActive }) => `${s.link} ${isActive ? s.active : ""}`}>
                Our friends
            </NavLink>
        </nav>
    );
};

export default Nav;
