import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectTab, selectActiveList, selectMyLoading, selectMyError,
    setTab, fetchFavorites, fetchViewed, removeFavorite,
    addFavorite, selectFavIds
} from "../../../redux/myNotices/slice";
import { getNoticeById } from "../../../api/notices";
import { selectIsLoggedIn } from "../../../redux/auth/slice";
import NoticesList from "../../Notices/NoticesList/NoticesList";
import ModalNotice from "../../Modals/ModalNotice/ModalNotice";
import s from "./MyNotices.module.css";

const Empty = () => (
    <div className={s.empty}>
        <p>
            Oops, <span className={s.emptySpan}>looks like there aren't any furries</span> on our adorable page yet.
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
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const favIds = useSelector(selectFavIds);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    const handleLearnMore = async (id) => {
        const card = list.items.find(it => (it._id || it.id) === id);
        if (tab === "favorites" && isLoggedIn) {
            try { await getNoticeById(id); } catch { /* ignore */ }
        }
        setModalItem(card || null);
        setModalOpen(true);
    };

    const handleToggleFavorite = (id) => {
        if (!isLoggedIn) return; 
        if (favIds.has(id)) {
            dispatch(removeFavorite(id));
            if (tab === "favorites") {
                setModalOpen(false);
                setModalItem(null);
            }
        }
        else {
            const full = modalItem && ((modalItem._id || modalItem.id) === id) ? modalItem
                : list.items.find(it => (it._id || it.id) === id);
            dispatch(addFavorite({ id, item: full }));
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalItem(null);
    };
    
    useEffect(() => {
        if (!isLoggedIn) return;
        if (tab === "favorites") dispatch(fetchFavorites());
        else dispatch(fetchViewed());
    }, [dispatch, tab, isLoggedIn]);

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
                <NoticesList
                    className={s.list}
                    itemClassName = {s.item}
                    items={list.items}
                    mode={tab === "favorites" ? "favorites" : "viewed"}
                    showRemove={tab === "favorites"}
                    onRemove={onRemove}
                    onLearnMore={handleLearnMore}
                />
            )}

            {modalOpen && (
                <ModalNotice
                    open={modalOpen}
                    item={modalItem}
                    isFavorite={modalItem ? favIds.has(modalItem._id || modalItem.id) : false}
                    onToggleFavorite={handleToggleFavorite}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default MyNotices;
