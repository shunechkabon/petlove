import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import s from "./SearchField.module.css";

const SearchField = ({ value = "", className = "", onSearch }) => {
    const [text, setText] = useState(value);

    useEffect(() => {
        setText(value || "");
    }, [value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(text.trim());
    };

    const handleClear = () => {
        setText("");
        onSearch("");
    };

    return (
        <form className={`${s.form} ${className}`} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={s.input}
            />

            {text && (
                <button type="button" onClick={handleClear} className={s.iconBtn}>
                    <Icon name="cross" width={18} height={18} />
                </button>
            )}

            <button type="submit" className={s.iconBtn}>
                <Icon name="search" width={18} height={18} />
            </button>
        </form>
    );
};

export default SearchField;
