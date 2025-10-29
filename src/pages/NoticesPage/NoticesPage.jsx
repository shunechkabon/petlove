import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeById } from "../../api/notices";
import { selectNotices, setPage, fetchNotices } from "../../redux/notices/slice";
import { selectIsLoggedIn } from "../../redux/auth/slice";
import {
    addFavorite,
    removeFavorite,
    fetchFavorites,
    selectFavIds,
    selectMyLoading
} from "../../redux/myNotices/slice";
import Title from "../../components/Title/Title";
import Pagination from "../../components/Pagination/Pagination";
import NoticesList from "../../components/Notices/NoticesList/NoticesList";
import NoticesFilters from "../../components/Notices/NoticesFilters/NoticesFilters";
import ModalNotice from "../../components/Modals/ModalNotice/ModalNotice";
import ModalAttention from "../../components/Modals/ModalAttention/ModalAttention";
import s from "./NoticesPage.module.css";

const DEFAULT_LIMIT = 6;

const NoticesPage = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const favIds = useSelector(selectFavIds);
    const isFavLoading = useSelector(selectMyLoading);
    const { page, items, totalPages, isLoading, error,
        query, category, sex, species, location, sort, limit
    } = useSelector(selectNotices);

    const [attentionOpen, setAttentionOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        dispatch(fetchNotices());
        if (isLoggedIn) dispatch(fetchFavorites());
    }, [dispatch, isLoggedIn, page,
        query, category, sex, species, location, sort, limit
    ]);

    const handleToggleFavorite = (id) => {
        if (!isLoggedIn) {
            setAttentionOpen(true);
            return;
        }
        if (isFavLoading) return;
        if (favIds.has(id)) {
            dispatch(removeFavorite(id));
        } else {
            const card = items.find(it => (it._id || it.id) === id);
            dispatch(addFavorite({ id, item: card }));
        }
    };

    const handleLearnMore = async (id) => {
        const card = items.find((it) => (it._id || it.id) === id);
        if (isLoggedIn) {
            try { await getNoticeById(id); }
            catch {
                // ignore error
            }
        }
        setModalItem(card || null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalItem(null);
    };
    
    const handlePageChange = (nextPage) => dispatch(setPage(nextPage));
    
    return (
        <section>
            <div className={s.container}>
                <Title className={s.title}>Find your favorite pet</Title>

                <NoticesFilters className={s.filters}/>

                {error && <p role="alert">Error: {error}</p>}

                {!isLoading && !error &&
                    <NoticesList
                        items={items}
                        favIds={favIds}
                        mode="catalog"
                        onToggleFavorite={handleToggleFavorite}
                        onLearnMore={handleLearnMore}
                    />
                }

                <ModalAttention open={attentionOpen} onClose={() => setAttentionOpen(false)} />

                {!isLoading && !error && totalPages > 1 && (
                    <div className={s.pagination}>
                        <Pagination
                            page={page}
                            totalPages={totalPages ?? 1}
                            onChange={handlePageChange}
                        />
                    </div>
                )}

                {modalOpen &&
                    <ModalNotice
                        open={modalOpen}
                        item={modalItem}
                        isFavorite={modalItem ? favIds.has(modalItem._id || modalItem.id) : false}
                        onToggleFavorite={handleToggleFavorite}
                        onClose={handleCloseModal}
                    />
                }
            </div>
        </section>
    );
};

export default NoticesPage;