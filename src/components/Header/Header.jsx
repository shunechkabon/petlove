import { useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo/Logo";
import Nav from "./Nav/Nav";
import AuthNav from "./AuthNav/AuthNav";
import Burger from "./Burger/Burger";
import Icon from "../Icon/Icon";
import s from "./Header.module.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { pathname } = useLocation();
    const isHome = pathname === "/home";
    
    return (
        <header className={`${s.header} ${isHome ? s.homeHeader : ""}`}>
            <div className={`${s.container} ${isHome ? s.homeContainer : ""}`}>
                {/* Logo */}
                <Logo className={`${s.logoHeader} ${isHome ? s.homeLogo : ""}`} />

                <div className={s.right}>
                    {/* Navigation */}
                    <div className={s.navInline}>
                        <Nav />
                    </div>
    
                    {/* Auth buttons */}
                    <div className={s.authInline}>
                        <AuthNav />
                    </div>
    
                    <button
                        type="button"
                        className={s.burgerBtn}
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(true)}
                    >
                        <Icon
                        name="menu"
                        width="32"
                        height="32"
                        className={`${s.burgerIcon} ${isHome ? s.homeBurgerIcon : ""}`}
                    />
                    </button>
                    
                    <Burger open={menuOpen} onClose={() => setMenuOpen(false)} className={`${isHome ? s.homeBurger : ""}`}/>
                </div>
            </div>
        </header>
    );
};

export default Header;
