import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Logo from '../../components/Logo/Logo';
import s from './MainPage.module.css';
// import logoUrl from '../../assets/logo.svg';

const MainPage = () => {
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

    const handleEnter = () => {
        if (showLoader) return;
        setShowLoader(true);

        setTimeout(() => {
            navigate('/home');
        }, 1200);
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleEnter();
    };

    return (
        <section className={s.wrapSplash} onClick={handleEnter}>
            {showLoader ? (
                <div className={s.loaderWrap}>
                    <Loader />
                </div>
            ) : (
                <Logo className={s.logoSplash} onClick={handleLogoClick} />
            )}
        </section>
    );
};

export default MainPage;