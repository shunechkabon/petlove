import axios from "./client";

export const getMyPets = async () => {
    const { data } = await axios.get("/users/current/full");
    return data;
};

export const addPet = async (payload) => {
    const { data } = await axios.post("/users/current/pets/add", payload);
    return data;
};

export const deletePet = async (id) => {
    const { data } = await axios.delete(`/users/current/pets/remove/${id}`);
    return data;
};