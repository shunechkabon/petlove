import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeById } from "../../api/notices";
import { selectNotices, setPage, fetchNotices } from "../../redux/notices/slice";
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
import s from "./NoticesPage.module.css";

const DEFAULT_LIMIT = 6;

const NoticesPage = () => {
    const dispatch = useDispatch();
    const favIds = useSelector(selectFavIds);
    const isFavLoading = useSelector(selectMyLoading);
    const { page, items, totalPages, isLoading, error,
        query, category, sex, species, location, sort, limit
    } = useSelector(selectNotices);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        dispatch(fetchNotices());
        dispatch(fetchFavorites());
    }, [dispatch, page,
        query, category, sex, species, location, sort, limit
    ]);

    const handleToggleFavorite = (id) => {
        if (isFavLoading) return;
        if (favIds.has(id)) {
            dispatch(removeFavorite(id));
        } else {
            dispatch(addFavorite(id));
        }
    };

    const handleLearnMore = async (id) => {
        const card = items.find((it) => (it._id || it.id) === id);
        try {
            await getNoticeById(id);
        } catch { /* игнорируем для UX, viewed обновим позже при заходе на профиль */ }
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
                        open={open}
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