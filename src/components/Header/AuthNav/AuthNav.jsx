import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/slice";
import { logoutUser } from "../../../redux/auth/operations";
import Icon from "../../Icon/Icon";
import s from "./AuthNav.module.css";

const AuthNav = ({ className = "" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className={`${s.authNav} ${className}`} aria-label="Auth">
            {isLoggedIn ? (
                <>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className={`${s.logOut} ${s.link}`}
                    >
                        LOG OUT
                    </button>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `${s.profile} ${s.link} ${isActive ? s.activeProfile : ""}`
                        }
                    >
                        <Icon name="user" width={20} height={20} className={s.userIcon} />
                        PROFILE
                    </NavLink>
                </>
            ) : (
                <>
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
                </>
            )}
        </nav>
    );
};

export default AuthNav;
