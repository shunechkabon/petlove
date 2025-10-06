import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import s from "./Header.module.css";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                {/* Logo */}
                <Logo className={s.logoHeader} />

                {/* Navigation */}
                <Nav />

                {/* Auth buttons */}
                <AuthNav />
            </div>
        </header>
    );
};

export default Header;
