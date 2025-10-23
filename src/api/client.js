import axios from "axios";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

export const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    delete axios.defaults.headers.common.Authorization;
};

export default axios;
