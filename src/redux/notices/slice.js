import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotices } from "../../api/notices";

export const fetchNotices = createAsyncThunk(
    "notices/fetchNotices",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { notices } = getState();
            const data = await getNotices({
                q: notices.query,
                page: notices.page,
                limit: notices.limit,
                category: notices.category,
                sex: notices.sex,
                species: notices.species,
                location: notices.location,
                sort: notices.sort,
            });
            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const initialState = {
    items: [],
    page: 1,
    limit: 6,
    totalPages: 1,
    isLoading: false,
    error: null,
    query: "",
    category: null,
    sex: null,
    species: null,
    location: null,
    sort: null,
};

const noticesSlice = createSlice({
    name: "notices",
    initialState,
    reducers: {
        setPage(state, { payload }) { state.page = payload; },
        setLimit(state, { payload }) { state.limit = payload; },
        setQuery(state, { payload }) { state.query = payload; state.page = 1; },
        setCategory(state, { payload }) { state.category = payload; state.page = 1; },
        setSex(state, { payload }) { state.sex = payload; state.page = 1; },
        setSpecies(state, { payload }) { state.species = payload; state.page = 1; },
        setLocation(state, { payload }) { state.location = payload; state.page = 1; },
        setSort(state, { payload }) { state.sort = payload; state.page = 1; },
        resetFilters(state) {
            state.query = "";
            state.category = null;
            state.sex = null;
            state.species = null;
            state.location = null;
            state.sort = null;
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNotices.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload.items;
                state.totalPages = payload.totalPages;
                state.page = payload.page ?? state.page;
            })
            .addCase(fetchNotices.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload || "Failed to fetch notices";
            });
    },
});

export const {
    setPage,
    setLimit,
    setQuery,
    setCategory,
    setSex,
    setSpecies,
    setLocation,
    setSort,
    resetFilters,
} = noticesSlice.actions;

export const selectNotices = (state) => state.notices;

export default noticesSlice.reducer;
