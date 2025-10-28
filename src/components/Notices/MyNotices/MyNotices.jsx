import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectTab, selectActiveList, selectMyLoading, selectMyError,
} from "../../../redux/myNotices/slice";
import { setTab, fetchFavorites, fetchViewed, removeFavorite } from "../../../redux/myNotices/slice";
import NoticesList from "../../Notices/NoticesList/NoticesList";
import s from "./MyNotices.module.css";

const Empty = () => (
    <div className={s.empty}>
        <p>
            Oops, <span className={s.emptySpan}>looks like there aren`t any furries</span> on our adorable page yet.
            Do not worry! View your pets on the "find your favorite pet" page and add them to your favorites.
        </p>
    </div>
);

const MyNotices = () => {
    const dispatch = useDispatch();
    const tab = useSelector(selectTab);
    const list = useSelector(selectActiveList);
    const isLoading = useSelector(selectMyLoading);
    const error = useSelector(selectMyError);

    useEffect(() => {
        if (tab === "favorites") dispatch(fetchFavorites());
        else dispatch(fetchViewed());
    }, [dispatch, tab]);

    const onRemove = (id) => dispatch(removeFavorite(id));

    return (
        <div className={s.wrap}>
            <div className={s.tabs}>
                <button className={`${s.tab} ${tab === "favorites" ? s.active : ""}`} onClick={() => dispatch(setTab("favorites"))}>
                    My favorite pets
                </button>
                <button className={`${s.tab} ${tab === "viewed" ? s.active : ""}`} onClick={() => dispatch(setTab("viewed"))}>
                    Viewed
                </button>
            </div>

            {error && <p role="alert" className={s.error}>{error}</p>}
            {!isLoading && list.items.length === 0 && <Empty />}

            {!isLoading && list.items.length > 0 && (
                <NoticesList items={list.items} showRemove={tab === "favorites"} onRemove={onRemove} />
            )}
        </div>
    );
};

export default MyNotices;
