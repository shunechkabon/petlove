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
    const isPopularity = sort === "popular" || sort === "unpopular";
    const isPrice = sort === "cheap" || sort === "expensive";
    const paramsRaw = {
        keyword: q,
        page,
        limit,
        category,
        sex,
        species,
        locationId: location, 
        byDate: !sort ? true : undefined,
        byPopularity:
            isPopularity ? (sort === "popular" ? false : true) : undefined,
        byPrice:
            isPrice ? (sort === "cheap" ? true : false) : undefined,
    };

    const params = Object.fromEntries(
        Object.entries(paramsRaw).filter(([, v]) => v !== "" && v !== null && v !== undefined)
    );

    const { data } = await axios.get("/notices", { params });

    return {
        items: data?.results ?? [],
        totalPages: data?.totalPages ?? 1,
        page: data?.page ?? page,
    };
};
