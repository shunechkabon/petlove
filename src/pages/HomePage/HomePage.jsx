import s from "./HomePage.module.css";
import homeDesktop1x from "../../assets/images/home-desktop.jpg";
import homeDesktop2x from "../../assets/images/home-desktop@2x.jpg";
import homeTablet1x from "../../assets/images/home-tablet.jpg";
import homeTablet2x from "../../assets/images/home-tablet@2x.jpg";
import homeMobile1x from "../../assets/images/home-mobile.jpg";
import homeMobile2x from "../../assets/images/home-mobile@2x.jpg";

const HomePage = () => {
    return (
        <section className={s.section}>
            <div className={s.container}>
                <div className={s.homeContainer}>
                    <h1 className={s.title}>
                        Take good <span className={s.span}>care</span> of your small pets
                    </h1>
                    <p className={s.text}>
                        Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.
                    </p>
                </div>

                <picture>
                    <source
                        srcSet={`${homeDesktop1x} 1x, ${homeDesktop2x} 2x`}
                        media="(min-width: 1280px)"
                    />
                    <source
                        srcSet={`${homeTablet1x} 1x, ${homeTablet2x} 2x`}
                        media="(min-width: 768px)"
                    />
                    <source
                        srcSet={`${homeMobile1x} 1x, ${homeMobile2x} 2x`}
                        media="(max-width: 767px)"
                    />
                    <img
                        className={s.image}
                        src={homeDesktop1x}
                        alt="Happy pet and owner"
                    />
                </picture>
            </div>
        </section>
    );
};

export default HomePage;
