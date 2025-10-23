import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNotices, setPage, fetchNotices } from "../../redux/notices/slice";
import Title from "../../components/Title/Title";
import Pagination from "../../components/Pagination/Pagination";
import NoticesList from "../../components/Notices/NoticesList/NoticesList";
import NoticesFilters from "../../components/Notices/NoticesFilters/NoticesFilters";
import s from "./NoticesPage.module.css";

const DEFAULT_LIMIT = 6;

const NoticesPage = () => {
    const dispatch = useDispatch();
    const { page, items, totalPages, isLoading, error,
        query, category, sex, species, location, sort, limit
    } = useSelector(selectNotices);

    useEffect(() => {
        dispatch(fetchNotices());
    }, [dispatch, page,
        query, category, sex, species, location, sort, limit
    ]);
    
    const handlePageChange = (nextPage) => dispatch(setPage(nextPage));
    
    return (
        <section>
            <div className={s.container}>
                <Title className={s.title}>Find your favorite pet</Title>

                <NoticesFilters className={s.filters}/>

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