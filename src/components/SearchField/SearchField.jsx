import { useState } from "react";
import Icon from "../Icon/Icon";
import s from "./SearchField.module.css";

const SearchField = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value.trim());
    };

    const handleClear = () => {
        setValue("");
        onSearch("");
    };

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={s.input}
            />

            {value && (
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
