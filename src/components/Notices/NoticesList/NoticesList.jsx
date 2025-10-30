import NoticesItem from "../NoticesItem/NoticesItem";
import s from "./NoticesList.module.css";

const NoticesList = ({
    items = [],
    showRemove = false,
    onRemove,
    mode = "catalog",
    favIds,
    onToggleFavorite,
    onLearnMore,
    className = "",
    itemClassName = ""
}) => {
    if (!items.length) return <p>No results.</p>;

    return (
        <ul className={`${s.list} ${className}`}>
            {items.map((it) => (
                <NoticesItem
                    className={itemClassName}
                    key={it.id || it._id}
                    id={it.id || it._id}
                    imgURL={it.imgURL}
                    title={it.title}
                    popularity={it.popularity}
                    name={it.name}
                    birthday={it.birthday}
                    sex={it.sex}
                    species={it.species}
                    category={it.category}
                    comment={it.comment}
                    price={it.price}
                    showRemove={showRemove}
                    mode={mode}
                    isFavorite={favIds ? favIds.has(it._id || it.id) : false}
                    onToggleFavorite={onToggleFavorite}
                    onRemove={onRemove}
                    onLearnMore={onLearnMore}
                />
            ))}
        </ul>
    );
};

export default NoticesList;
