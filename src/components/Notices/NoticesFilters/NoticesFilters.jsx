import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
    selectNotices, setQuery, setSort, setCategory,
    setSex, setSpecies, setLocation, setLocationLabel, resetFilters,
} from "../../../redux/notices/slice";
import {
    fetchCategories, fetchSexes, fetchSpecies,
    selectCategories, selectSexes, selectSpeciesDict, selectDictLoaded,
} from "../../../redux/dictionaries/slice";
import LocationFilter from "./LocationFilter";
import SearchField from "../../SearchField/SearchField";
import Icon from "../../Icon/Icon";
import s from "./NoticesFilters.module.css";

const NoticesFilters = ({className = ""}) => {
    const dispatch = useDispatch();
    const { query, sort, category, sex, species, location, locationLabel } = useSelector(selectNotices);

    const categories = useSelector(selectCategories);
    const sexes = useSelector(selectSexes);
    const speciesDict = useSelector(selectSpeciesDict);
    const loaded = useSelector(selectDictLoaded);

    useEffect(() => {
        if (!loaded.categories) dispatch(fetchCategories());
        if (!loaded.sexes) dispatch(fetchSexes());
        if (!loaded.species) dispatch(fetchSpecies());
    }, [dispatch, loaded]);

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

    const handleSortChange = (value) => {
        if (sort === value) {
            dispatch(setSort(null));
        } else {
            dispatch(setSort(value));
        }
    };

    return (
        <div className={`${s.wrap} ${className}`}>
            <div className={s.filters}>
                {/* Search */}
                <SearchField className={s.searchField} value={query} onSearch={handleSearch} />
    
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
                <LocationFilter
                    valueId={location}
                    valueLabel={locationLabel}
                    onChange={(id, label) => {
                        dispatch(setLocation(id));
                        dispatch(setLocationLabel(label));
                    }}
                />
            </div>

            {/* Radio */}
            <hr className={s.hr} />

            <fieldset className={s.sortGroup}>
                {["popular", "unpopular", "cheap", "expensive"].map((val) => (
                    <label key={val} className={s.chip}>
                        <input
                            type="radio"
                            name="sort"
                            value={val}
                            checked={sort === val}
                            onClick={() => handleSortChange(val)}
                            readOnly
                        />
                        <span>
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                            {sort === val &&
                                <Icon name="cross" width={18} height={18} />
                            }
                        </span>
                    </label>
                ))}
            </fieldset>

            <button
                type="button"
                className={s.resetBtn}
                onClick={() => dispatch(resetFilters())}
            >
                Reset
            </button>
        </div>
    );
};

export default NoticesFilters;
