import NewsItem from "../NewsItem/NewsItem";
import s from "./NewsList.module.css";

const NewsList = ({ items = [] }) => {
    if (!items.length) return <p>No results.</p>;

    return (
        <ul className={s.list}>
            {items.map(it => (
                <NewsItem
                    key={it.id || it._id}
                    id={it.id || it._id}
                    imgUrl={it.imgUrl}
                    title={it.title}
                    text={it.text}
                    date={it.date}
                    url={it.url}
                />
            ))}
        </ul>
    );
};

export default NewsList;
