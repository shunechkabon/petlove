import axios from "./client";

export const getNotices = async ({
    q = "",
    page = 1,
    limit = 6,
    category,
    sex,
    species,
    location,
    sort,
} = {}) => {
    const params = {
        keyword: q,
        page,
        limit,
        ...(category ? { category } : {}),
        ...(sex ? { sex } : {}),
        ...(species ? { species } : {}),
        ...(location ? { location } : {}),
        ...(sort ? { sort } : {}),
    };

    const { data } = await axios.get("/notices", { params });

    return {
        items: data?.results ?? [],
        totalPages: data?.totalPages ?? 1,
        page: data?.page ?? page,
    };
};
