import s from "./HomePage.module.css";

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
                        srcSet="/src/assets/images/home-desktop.jpg 1x, /src/assets/images/home-desktop@2x.jpg 2x"
                        media="(min-width: 1280px)"
                    />
                    <source
                        srcSet="/src/assets/images/home-tablet.jpg 1x, /src/assets/images/home-tablet@2x.jpg 2x"
                        media="(min-width: 768px)"
                    />
                    <source
                        srcSet="/src/assets/images/home-mobile.jpg 1x, /src/assets/images/home-mobile@2x.jpg 2x"
                        media="(max-width: 767px)"
                    />
                    <img
                        className={s.image}
                        src="/src/assets/images/home-desktop.jpg"
                        alt="Happy pet and owner"
                    />
                </picture>
            </div>
        </section>
    );
};

export default HomePage;
