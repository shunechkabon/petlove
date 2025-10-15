import axios from "./client";

export const getCategories = async () => {
    const { data } = await axios.get("/notices/categories");
    return data; 
};

export const getSexes = async () => {
    const { data } = await axios.get("/notices/sex");
    return data; 
};

export const getSpecies = async () => {
    const { data } = await axios.get("/notices/species");
    return data; 
};

export const getNoticeLocations = async () => {
    const { data } = await axios.get("/cities/locations");
    return data;
};
