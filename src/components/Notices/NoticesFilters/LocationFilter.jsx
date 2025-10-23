import { useEffect, useState, useRef } from "react";
import { components as RSComponents } from "react-select";
import AsyncSelect from "react-select/async";
import { searchCities } from "../../../api/dictionaries";
import CityOption from "./CityOption";
import Icon from "../../Icon/Icon";
import s from "./NoticesFilters.module.css";

const LocationFilter = ({ valueId, valueLabel, onChange }) => {
    const [locOption, setLocOption] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [isFocused, setFocused] = useState(false);
    const canOpenMenu = inputVal.trim().length >= 3;

    const debounceRef = useRef(null);
    const cacheRef = useRef(new Map());
    const selectRef = useRef(null);

    useEffect(() => {
        if (valueLabel) {
            setLocOption({ value: valueId ?? null, label: valueLabel });
        }
    }, [valueId, valueLabel]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    useEffect(() => {
        if (!valueId && !valueLabel) {
            setLocOption(null);
            setInputVal("");
            setFocused(false);
        }
    }, [valueId, valueLabel]);

    const loadLocationOptions = (inputValue) =>
        new Promise((resolve) => {
            const full = inputValue.trim();
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (full.length < 3) return resolve([]);

            const prefix = full.slice(0, 3).toLowerCase();
            const kw = full.toLowerCase();

            const build = (list) => {
                const filtered = (list || []).filter((x) => {
                    const st = (x.stateEn || "").toLowerCase();
                    const ct = (x.cityEn || "").toLowerCase();
                    return st.startsWith(kw) || ct.startsWith(kw);
                });

                filtered.sort((a, b) => {
                    const aS = a.stateEn.toLowerCase().startsWith(kw) ? 0 : 1;
                    const bS = b.stateEn.toLowerCase().startsWith(kw) ? 0 : 1;
                    return aS - bS;
                });

                return filtered.slice(0, 20).map((x) => {
                    const st = x.stateEn || "";
                    const ct = x.cityEn || "";
                    const matchTarget = st.toLowerCase().startsWith(kw) ? "state" : "city";
                    return {
                        value: x._id,
                        label: `${st}, ${ct}`,
                        meta: { state: st, city: ct, matchTarget, matchLen: kw.length },
                    };
                });
            };

            if (cacheRef.current.has(prefix)) {
                return resolve(build(cacheRef.current.get(prefix)));
            }

            debounceRef.current = setTimeout(async () => {
                try {
                    const cities = await searchCities(prefix);
                    cacheRef.current.set(prefix, cities || []);
                    resolve(build(cities));
                } catch {
                    resolve([]);
                }
            }, 300);
        });

    const handleChange = (opt, { action }) => {
        setLocOption(opt ?? null);
        setInputVal(opt?.label ?? "");
        onChange(opt?.value ?? null, opt?.label ?? "");

        if (!opt && action === "clear") {
            setInputVal("");
            onChange(null, "");
        }
        selectRef.current?.blur();
    };

    const DropdownIndicator = (props) => (
        <RSComponents.DropdownIndicator {...props}>
            <Icon name="search" width={18} height={18} />
        </RSComponents.DropdownIndicator>
    );

    const ClearIndicator = (props) => (
        <RSComponents.ClearIndicator {...props}>
            <Icon name="cross" width={18} height={18} aria-hidden="true" />
        </RSComponents.ClearIndicator>
    );

    return (
        <AsyncSelect
            ref={selectRef}
            className={s.rs}
            classNamePrefix="rs-loc"
            cacheOptions
            loadOptions={loadLocationOptions}
            inputValue={inputVal}
            onInputChange={(val, { action }) => {
                if (action === "input-change") setInputVal(val);
                return val;
            }}
            value={locOption}
            onChange={handleChange}
            onFocus={() => {
                setFocused(true);
                setInputVal(locOption?.label ?? inputVal);
            }}
            onBlur={() => {
                setFocused(false);
                setInputVal("");
                if (!locOption) setInputVal("");
            }}
            isClearable
            placeholder="Location"
            components={{
                Option: CityOption,
                DropdownIndicator,
                ClearIndicator, 
                IndicatorSeparator: () => null,
            }}
            openMenuOnFocus={false}
            openMenuOnClick={false}
            menuIsOpen={canOpenMenu && isFocused}
            noOptionsMessage={() => (canOpenMenu ? "No options" : null)}
            menuPortalTarget={document.body}
            menuPosition="fixed"
        />
    );
};

export default LocationFilter;
