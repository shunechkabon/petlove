import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import s from "./Logo.module.css";

const Logo = ({ className = "", style = {}, onClick }) => {
    return (
        <Link
            to="/home"
            className={`${s.logo} ${className}`}
            style={style}
            aria-label="PetLove home"
            onClick={onClick} 
        >
            <span className={s.text}>
                petl
                <Icon
                    name="heart"
                    width="var(--logo-icon-w)"
                    height="var(--logo-icon-h)"
                    className={s.icon}
                />
                ove
            </span>
        </Link>
    );
};

export default Logo;
