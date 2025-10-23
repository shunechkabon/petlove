import Icon from "../../Icon/Icon";
import s from "./NoticesItem.module.css";

const NoticesItem = ({
    id,
    imgURL,
    title,
    popularity,
    name,
    birthday,
    sex,
    species,
    category,
    comment,
    price
}) => {
    const formattedBirthday = birthday
        ? new Date(birthday)
            .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replaceAll("/", ".")
        : "—";
    
    return (
        <li id={id} className={s.item}>
            <img src={imgURL} loading="lazy" className={s.img} alt={title || name || "Pet"} />

            <div className={s.content}>
                <div className={s.head}>
                    <h3 className={s.title}>{title}</h3>
                    <div className={s.rate}>
                        <Icon
                            name="star"
                            width="var(--logo-icon-w)"
                            height="var(--logo-icon-h)"
                            className={s.iconRate}
                        />
                        {popularity}
                    </div>
                </div>

                <ul className={s.features}>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Name</p>
                        <p className={s.featureValue}>{name}</p>
                    </li>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Birthday</p>
                        <p className={s.featureValue}>{formattedBirthday}</p>
                    </li>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Sex</p>
                        <p className={s.featureValue}>{sex}</p>
                    </li>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Species</p>
                        <p className={s.featureValue}>{species}</p>
                    </li>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Category</p>
                        <p className={s.featureValue}>{category}</p>
                    </li>
                </ul>

                {comment ? <p className={s.text}>{comment}</p> : null}
                <p className={s.price}>{price ? `$${price}` : "Free"}</p>
                
                <div className={s.btn}>
                    <button className={s.btnMore} type="button">Learn more</button>
                    <button className={s.btnFav} type="button">
                        <Icon
                            name="heart"
                            width="var(--logo-icon-w)"
                            height="var(--logo-icon-h)"
                            className={s.iconFav}
                        />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default NoticesItem;
