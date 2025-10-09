import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews } from "../../api/news";

export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async (params, { rejectWithValue }) => {
        try {
            return await getNews(params);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    page: 1,
    totalPages: 1,
    query: "",
    isLoading: false,
    error: null,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setQuery: (state, { payload }) => { state.query = payload; },
        setPage: (state, { payload }) => { state.page = payload; },
        resetNews: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload.items;
                state.totalPages = payload.totalPages;
                state.page = payload.page;
            })
            .addCase(fetchNews.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload || "Failed to load news";
            });
    },
});

export const { setQuery, setPage, resetNews } = newsSlice.actions;
export const selectNews = (state) => state.news;
export default newsSlice.reducer;
