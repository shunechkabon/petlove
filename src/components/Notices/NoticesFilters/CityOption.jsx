import { components as RSComponents } from "react-select";
import s from "./NoticesFilters.module.css";

const CityOption = (props) => {
    const { data, selectProps } = props;
    const input = (selectProps.inputValue || "").toLowerCase();
    const { state, city, matchTarget, matchLen } = data.meta;

    const wrapHL = (text, len) => (
        <>
            <span className={s.optMatch}>{text.slice(0, len)}</span>
            {text.slice(len)}
        </>
    );

    return (
        <RSComponents.Option {...props}>
            <span className={s.optState}>
                {matchTarget === "state" && input ? wrapHL(state, matchLen) : state}
            </span>
            <span className={s.optComma}>,&nbsp;</span>
            <span className={s.optCity}>
                {matchTarget === "city" && input ? wrapHL(city, matchLen) : city}
            </span>
        </RSComponents.Option>
    );
};

export default CityOption;
