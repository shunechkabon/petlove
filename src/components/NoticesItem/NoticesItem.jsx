import s from "./NoticesItem.module.css";

const NoticesItem = ({
    id,
    imgUrl,
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
            <img src={imgUrl} className={s.img} alt={title || name || "Pet"} />

            <div className={s.content}>
                <div className={s.head}>
                    <h3 className={s.title}>{title}</h3>
                    <div>{popularity}</div>
                </div>

                <ul className={s.features}>
                    <li>
                        <p>Name</p>
                        <p>{name}</p>
                    </li>
                    <li>
                        <p>Birthday</p>
                        <p>{formattedBirthday}</p>
                    </li>
                    <li>
                        <p>Sex</p>
                        <p>{sex}</p>
                    </li>
                    <li>
                        <p>Species</p>
                        <p>{species}</p>
                    </li>
                    <li>
                        <p>Category</p>
                        <p>{category}</p>
                    </li>
                </ul>

                {comment ? <p className={s.text}>{comment}</p> : null}
                <p>{price ? `$${price}` : "Free"}</p>
                <div className={s.add}>
                    <button type="button">Learn more</button>
                    <button type="button">Favorite</button>
                </div>
            </div>
        </li>
    );
};

export default NoticesItem;
