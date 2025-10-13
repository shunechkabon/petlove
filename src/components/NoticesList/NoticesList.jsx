import NoticesItem from "../NoticesItem/NoticesItem";
import s from "./NoticesList.module.css";

const NoticesList = ({ items = [] }) => {
    if (!items.length) return <p>No results.</p>;

    return (
        <ul className={s.list}>
            {items.map((it) => (
                <NoticesItem
                    key={it.id || it._id}
                    id={it.id || it._id}
                    imgUrl={it.imgURL}
                    title={it.title}
                    popularity={it.popularity}
                    name={it.name}
                    birthday={it.birthday}
                    sex={it.sex}
                    species={it.species}
                    category={it.category}
                    comment={it.comment}
                    price={it.price}
                />
            ))}
        </ul>
    );
};

export default NoticesList;
