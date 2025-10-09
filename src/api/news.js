import axios from "./client";

export const getNews = async ({ q = "", page = 1, limit = 6 } = {}) => {
    const { data } = await axios.get("/news", {
        params: { keyword: q, page, limit },
    });

    return {
        items: data?.results ?? [],
        totalPages: data?.totalPages ?? 1,
        page: data?.page ?? page,
    };
};
