import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNews, fetchNews, setQuery, setPage } from "../../redux/news/slice";
import NewsList from "../../components/News/NewsList/NewsList";
import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField";
import Pagination from "../../components/Pagination/Pagination";
import s from "./NewsPage.module.css";

const DEFAULT_LIMIT = 6;

const NewsPage = () => {
    const dispatch = useDispatch();
    const { page, query, items, totalPages, isLoading, error } = useSelector(selectNews);

    useEffect(() => {
        dispatch(fetchNews({ q: query, page, limit: DEFAULT_LIMIT }));
    }, [dispatch, query, page]);

    const handleSearch = (value) => {
        dispatch(setQuery(value));
        dispatch(setPage(1));
    };

    const handlePageChange = (nextPage) => {
        dispatch(setPage(nextPage));
    };

    return (
        <section>
            <div className={s.container}>
                <div className={s.head}>
                    <Title>News</Title>
                    <SearchField onSearch={handleSearch}/>
                </div>

                {error && <p role="alert">Error: {error}</p>}

                {!isLoading && !error && <NewsList items={items} />}

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

export default NewsPage;