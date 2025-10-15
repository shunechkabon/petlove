import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectNotices, setQuery, setSort, setCategory, setSex, setSpecies, setLocation,
} from "../../redux/notices/slice";
import {
    fetchCategories, fetchSexes, fetchSpecies, fetchLocations,
    selectCategories, selectSexes, selectSpeciesDict, selectLocations, selectDictLoaded,
} from "../../redux/dictionaries/slice";
import SearchField from "../SearchField/SearchField";
import s from "./NoticesFilters.module.css";

const NoticesFilters = ({className = ""}) => {
    const dispatch = useDispatch();
    const { sort, category, sex, species, location } = useSelector(selectNotices);
    const categories = useSelector(selectCategories);
    const sexes = useSelector(selectSexes);
    const speciesDict = useSelector(selectSpeciesDict);
    const locations = useSelector(selectLocations);
    const loaded = useSelector(selectDictLoaded);

    useEffect(() => {
        if (!loaded.categories) dispatch(fetchCategories());
        if (!loaded.sexes) dispatch(fetchSexes());
        if (!loaded.species) dispatch(fetchSpecies());
        if (!loaded.locations) dispatch(fetchLocations());
    }, [dispatch, loaded]);

    const currentLocationName = useMemo(
        () => locations.find((x) => x._id === location)?.name || "",
        [locations, location]
    );
    const [locText, setLocText] = useState(currentLocationName);
    useEffect(() => setLocText(currentLocationName), [currentLocationName]);

    const handleSearch = (value) => dispatch(setQuery(value));

    const onCategory = (e) => dispatch(setCategory(e.target.value || null));
    const onSex = (e) => dispatch(setSex(e.target.value || null));
    const onSpecies = (e) => dispatch(setSpecies(e.target.value || null));

    const onLocationInput = (e) => setLocText(e.target.value);
    const onLocationSelect = (e) => {
        const name = e.target.value;
        const hit = locations.find((x) => x.name === name);
        dispatch(setLocation(hit ? hit._id : null));
    };
    const clearLocation = () => { setLocText(""); dispatch(setLocation(null)); };

    return (
        <div className={`${s.wrap} ${className}`}>
            <SearchField onSearch={handleSearch} />

            {/* Row: Category + Sex */}
      <div className={s.row}>
        <div className={s.selectWrap}>
          <select className={s.select} value={category ?? ""} onChange={onCategory}>
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className={s.selectWrap}>
          <select className={s.select} value={sex ?? ""} onChange={onSex}>
            <option value="">By gender</option>
            {sexes.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Species */}
      <div className={s.selectWrap}>
        <select className={s.select} value={species ?? ""} onChange={onSpecies}>
          <option value="">By type</option>
          {speciesDict.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Location (input + datalist) */}
      <div className={s.locationWrap}>
        <input
          list="notice-locations"
          placeholder="Location"
          className={s.input}
          value={locText}
          onInput={onLocationInput}
          onChange={onLocationSelect} // срабатывает при выборе из списка
        />
        {locText && <button type="button" className={s.clearBtn} onClick={clearLocation}>×</button>}
        <datalist id="notice-locations">
          {locations.map((c) => (
            <option key={c._id} value={c.name} />
          ))}
        </datalist>
      </div>

            <hr className={s.hr} />
      <fieldset className={s.sortGroup}>
        <legend className={s.legend}>Sort</legend>

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
