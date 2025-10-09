import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNews, fetchNews } from "../../redux/news/slice";
import NewsList from "../../components/NewsList/NewsList";

const DEFAULT_LIMIT = 6;

const NewsPage = () => {
    const dispatch = useDispatch();
    const { page, query, items, isLoading, error } = useSelector(selectNews);

    useEffect(() => {
        dispatch(fetchNews({ q: query, page, limit: DEFAULT_LIMIT }));
    }, [dispatch, query, page]);

    return (
        <section className="container">
            <h1>News</h1>

            {isLoading && <p>Loading</p>}
            {error && <p role="alert">Error: {error}</p>}

            {!isLoading && !error && <NewsList items={items} />}

      {/* <pre style={{ fontSize: 12 }}>{JSON.stringify({ page, totalPages, query, itemsCount: items.length }, null, 2)}</pre> */}
    </section>
    );
};

export default NewsPage;