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
        setPage(st, { payload }) {
            const p = Number(payload);
            st.page = Number.isFinite(p) && p > 0 ? p : 1;
        },
        setLimit(st, { payload }) {
            const n = Number(payload);
            st.limit = Number.isFinite(n) && n > 0 ? n : st.limit;
            st.page = 1;
        },
        setQuery(st, { payload })   { st.query = payload ?? ""; st.page = 1; },
        setCategory(st, { payload }) { st.category = payload || null; st.page = 1; },
        setSex(st, { payload }) { st.sex = payload || null; st.page = 1; },
        setSpecies(st, { payload }) { st.species = payload || null; st.page = 1; },
        setLocation(st, { payload }) { st.location = payload || null; st.page = 1; },
        setSort(st, { payload }) {
            const ok = ["popular", "unpopular", "cheap", "expensive", null];
            st.sort = ok.includes(payload) ? payload : null;
            st.page = 1;
        },
        resetFilters(st) {
            st.query = "";
            st.category = null;
            st.sex = null;
            st.species = null;
            st.location = null;
            st.sort = null;
            st.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotices.pending, (st) => {
                st.isLoading = true;
                st.error = null;
            })
            .addCase(fetchNotices.fulfilled, (st, { payload }) => {
                st.isLoading = false;
                st.items = payload.items;
                st.totalPages = payload.totalPages;
                st.page = payload.page ?? st.page;
            })
            .addCase(fetchNotices.rejected, (st, { payload }) => {
                st.isLoading = false;
                st.error = payload || "Failed to fetch notices";
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

export const selectNoticesFilters = (state) => {
    const { query, category, sex, species, location, sort, page, limit } = state.notices;
    return { query, category, sex, species, location, sort, page, limit };
};

export const selectNotices = (state) => state.notices;

export default noticesSlice.reducer;
