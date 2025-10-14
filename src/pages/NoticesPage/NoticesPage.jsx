import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNotices, setPage, fetchNotices } from "../../redux/notices/slice";
import Title from "../../components/Title/Title";
import Pagination from "../../components/Pagination/Pagination";
import NoticesList from "../../components/NoticesList/NoticesList";
import s from "./NoticesPage.module.css";

const DEFAULT_LIMIT = 6;

const NoticesPage = () => {
    const dispatch = useDispatch();
    const { page, items, totalPages, isLoading, error } = useSelector(selectNotices);

    useEffect(() => {
        dispatch(fetchNotices());
    }, [dispatch, page]);
    
    const handlePageChange = (nextPage) => dispatch(setPage(nextPage));
    
    return (
        <section>
            <div className={s.container}>
                <Title className={s.title}>Find your favorite pet</Title>

                <div className={s.filters}>NoticesFilters</div>

                {error && <p role="alert">Error: {error}</p>}

                {!isLoading && !error && <NoticesList items={items} />}

                {!isLoading && !error && totalPages > 1 && (
                    <div className={s.pagination}>
                        <Pagination
                            page={page}
                            totalPages={totalPages ?? 1}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default NoticesPage;