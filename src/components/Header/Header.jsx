import { useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import Burger from "../Burger/Burger";
import s from "./Header.module.css";

const Header = () => {
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
                        <Nav className={`${isHome ? s.homeNav : ""}`} />
                    </div>
    
                    {/* Auth buttons */}
                    <div className={s.authInline}>
                        <AuthNav className={`${isHome ? s.homeAuth : ""}`}/>
                    </div>
    
                    <Burger className={`${isHome ? s.homeBurger : ""}`}/>
                </div>
            </div>
        </header>
    );
};

export default Header;
