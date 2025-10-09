import s from "./NewsItem.module.css";

const NewsItem = ({ id, imgUrl, title, text, date, url }) => {
    return (
        <li id={id} className={s.item}>
            <img src={imgUrl} alt="News Image" />
            <h3 className={s.title}>{title}</h3>
            <p>{text}</p>
            <p>{date}</p>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={s.link}
            >
                Read more
            </a>
        </li>
    );
};

export default NewsItem;
