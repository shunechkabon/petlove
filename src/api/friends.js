import axios from "./client";

export const getFriends = async () => {
    const { data } = await axios.get("/friends");
    return data;
};
