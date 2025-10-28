import axios from "./client";

export const getCurrentFull = async () => {
    const { data } = await axios.get("/users/current/full");
    return data;
};

export const addFavoriteNotice = async (id) => {
    await axios.post(`/notices/favorites/add/${id}`);
};

export const removeFavoriteNotice = async (id) => {
    await axios.delete(`/notices/favorites/remove/${id}`);
};
