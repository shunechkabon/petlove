import s from "./Title.module.css";

const Title = ({ children, className = "" }) => {
    return <h1 className={`${s.title} ${className}`}>{children}</h1>;
};

export default Title;