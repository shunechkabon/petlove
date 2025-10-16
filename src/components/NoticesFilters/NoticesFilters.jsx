import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import {
    selectNotices, setQuery, setSort, setCategory,
    setSex, setSpecies, setLocation, setLocationLabel,
} from "../../redux/notices/slice";
import {
    fetchCategories, fetchSexes, fetchSpecies,
    selectCategories, selectSexes, selectSpeciesDict, selectDictLoaded,
} from "../../redux/dictionaries/slice";
import { searchCities } from "../../api/dictionaries";
import CityOption from "./CityOption";
import SearchField from "../SearchField/SearchField";
import s from "./NoticesFilters.module.css";

const NoticesFilters = ({className = ""}) => {
    const dispatch = useDispatch();
    const { sort, category, sex, species, location, locationLabel } = useSelector(selectNotices);

    const categories = useSelector(selectCategories);
    const sexes = useSelector(selectSexes);
    const speciesDict = useSelector(selectSpeciesDict);
    const loaded = useSelector(selectDictLoaded);

    useEffect(() => {
        if (!loaded.categories) dispatch(fetchCategories());
        if (!loaded.sexes) dispatch(fetchSexes());
        if (!loaded.species) dispatch(fetchSpecies());
    }, [dispatch, loaded]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    useEffect(() => {
        if (locationLabel) {
            setLocOption({ value: location ?? null, label: locationLabel });
        }
    }, [location, locationLabel]);

    const categoryOptions = useMemo(
        () => [{ value: null, label: "Show all" }, ...categories.map(c => ({ value: c, label: c }))],
        [categories]
    );
    const sexOptions = useMemo(
        () => [{ value: null, label: "Show all" }, ...sexes.map(g => ({ value: g, label: g }))],
        [sexes]
    );
    const speciesOptions = useMemo(
        () => [{ value: null, label: "Show all" }, ...speciesDict.map(t => ({ value: t, label: t }))],
        [speciesDict]
    );

    const pickSelected = (options, val) =>
        val == null ? null : options.find(o => o.value === val) ?? null;

    const handleSearch = (value) => dispatch(setQuery(value));

    const onCategory = (opt) => dispatch(setCategory(opt?.value ?? null));
    const onSex = (opt) => dispatch(setSex(opt?.value ?? null));
    const onSpecies = (opt) => dispatch(setSpecies(opt?.value ?? null));

    const [locOption, setLocOption] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [isFocused, setFocused] = useState(false);
    const canOpenMenu = inputVal.trim().length >= 3;
    const debounceRef = useRef(null);
    const cacheRef = useRef(new Map());
    const selectRef = useRef(null); 

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

    const onLocationChange = (opt, { action }) => {
        setLocOption(opt ?? null);
        setInputVal(opt?.label ?? ""); 
        dispatch(setLocation(opt?.value ?? null));
        dispatch(setLocationLabel(opt?.label ?? "")); 
        if (!opt && action === "clear") {
            setInputVal("");
            dispatch(setLocationLabel(""));
        }
        selectRef.current?.blur();
    };

    return (
        <div className={`${s.wrap} ${className}`}>
            {/* Search */}
            <SearchField onSearch={handleSearch} />

            {/* Selects */}
            <div className={s.row}>
                <Select
                    className={`${s.rs}`}
                    classNamePrefix="rs"
                    options={categoryOptions}
                    value={pickSelected(categoryOptions, category)}
                    onChange={onCategory}
                    isSearchable={false}
                    placeholder="Category"
                />

                <Select
                    className={`${s.rs}`}
                    classNamePrefix="rs"
                    options={sexOptions}
                    value={pickSelected(sexOptions, sex)}
                    onChange={onSex}
                    isSearchable={false}
                    placeholder="By gender"
                />
            </div>

            <Select
                className={`${s.rs}`}
                classNamePrefix="rs"
                options={speciesOptions}
                value={pickSelected(speciesOptions, species)}
                onChange={onSpecies}
                isSearchable={false}
                placeholder="By type"
            />

            {/* Location */}
            <AsyncSelect
                ref={selectRef}
                className={`${s.rs}`}
                classNamePrefix="rs"
                cacheOptions
                loadOptions={loadLocationOptions}
                inputValue={inputVal}
                onInputChange={(val, { action }) => {
                    if (action === "input-change") setInputVal(val);
                    return val;
                }}
                value={locOption}
                onChange={onLocationChange}
                onFocus={() => { setFocused(true); setInputVal(locOption?.label ?? inputVal); }}
                onBlur={() => {
                    setFocused(false);
                    setInputVal("");
                    if (!locOption) setInputVal("");
                }}
                isClearable
                placeholder="Location"
                components={{ Option: CityOption }}
                openMenuOnFocus={false}
                openMenuOnClick={false}
                menuIsOpen={canOpenMenu && isFocused} 
                noOptionsMessage={() => (canOpenMenu ? "No options" : null)}
                menuPortalTarget={document.body}
                menuPosition="fixed"
            />

            {/* Radio */}
            <fieldset className={s.sortGroup}>

                <label className={s.chip}>
                    <input
                        type="radio"
                        name="sort"
                        value="popular"
                        checked={sort === "popular"}
                        onChange={() => dispatch(setSort("popular"))}
                    />
                    <span>Popular</span>
                </label>

                <label className={s.chip}>
                    <input
                        type="radio"
                        name="sort"
                        value="unpopular"
                        checked={sort === "unpopular"}
                        onChange={() => dispatch(setSort("unpopular"))}
                    />
                    <span>Unpopular</span>
                </label>

                <label className={s.chip}>
                    <input
                        type="radio"
                        name="sort"
                        value="cheap"
                        checked={sort === "cheap"}
                        onChange={() => dispatch(setSort("cheap"))}
                    />
                    <span>Cheap</span>
                </label>

                <label className={s.chip}>
                    <input
                        type="radio"
                        name="sort"
                        value="expensive"
                        checked={sort === "expensive"}
                        onChange={() => dispatch(setSort("expensive"))}
                    />
                    <span>Expensive</span>
                </label>
            </fieldset>
        </div>
    );
};

export default NoticesFilters;
