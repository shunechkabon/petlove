import Icon from "../Icon/Icon";
import s from "./Rating.module.css";

const Rating = ({ value = 0, max = 5, className = "" }) => {
    let filled = value > 0 ? Math.min(Math.ceil(value / 100), max) : 0;

    const stars = Array.from({ length: max }, (_, i) => (
        <Icon
            key={i}
            name="star"
            width={18}
            height={18}
            className={`${s.star} ${i < filled ? s.filled : s.empty}`}
        />
    ));

    return (
        <div className={`${s.rating} ${className}`}>
            <div className={s.stars}>{stars}</div>
            <span className={s.value}>{value}</span>
        </div>
    );
};

export default Rating;
