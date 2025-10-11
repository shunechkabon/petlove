import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <section className={s.section}>
            <div className={s.container}>
                <h1 className={s.title}>
                    4
                    <div className={s.imgContainer}>
                        <img
                            srcSet="/src/assets/not-found.png 1x, /src/assets/not-found@2x.png 2x"
                            src="/src/assets/not-found.png"
                            alt="Red cat" />
                    </div>
                    4
                </h1>
                <p className={s.text}>Ooops! This page not found :(</p>
                <Link to="/home" className={s.link}>
                    To home page
                </Link>
            </div>
        </section>
    );
};

export default NotFoundPage;
