import s from "./NewsItem.module.css";

const NewsItem = ({ id, imgUrl, title, text, date, url }) => {
    const formattedDate = new Date(date)
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .replaceAll(".", "/");
    
    return (
        <li id={id} className={s.item}>
            <img src={imgUrl} className={s.img} alt="News Image" />

            <div className={s.content}>
                <h3 className={s.title}>{title}</h3>
                <p className={s.text}>{text}</p>
                <div className={s.add}>
                    <p className={s.date}>{formattedDate}</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={s.link}
                    >
                        Read more
                    </a>
                </div>
            </div>
        </li>
    );
};

export default NewsItem;
