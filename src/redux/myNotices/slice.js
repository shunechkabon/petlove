import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getCurrentFull, removeFavoriteNotice, addFavoriteNotice } from "../../api/users";

export const fetchFavorites = createAsyncThunk(
    "my/favorites",
    async (_ , { rejectWithValue }) => {
        try {
            const prof = await getCurrentFull();
            return { items: prof.noticesFavorites || [] };
        } catch (e) { return rejectWithValue(e.message); }
    }
);

export const fetchViewed = createAsyncThunk(
    "my/viewed",
    async (_ , { rejectWithValue }) => {
        try {
            const prof = await getCurrentFull();
            return { items: prof.noticesViewed || [] };
        } catch (e) { return rejectWithValue(e.message); }
    }
);

export const addFavorite = createAsyncThunk(
    "my/addFavorite",
    async (arg, { rejectWithValue }) => {
        try {
            const id = typeof arg === "string" ? arg : arg?.id;
            await addFavoriteNotice(id);
            const item = typeof arg === "object" ? arg?.item : null;
            return { id, item };
        } catch (e) { return rejectWithValue(e.message); }
    }
);

export const removeFavorite = createAsyncThunk(
    "my/removeFavorite",
    async (noticeId, { rejectWithValue }) => {
        try {
            await removeFavoriteNotice(noticeId);
            return noticeId;
        } catch (e) { return rejectWithValue(e.message); }
    }
);

const initialState = {
    tab: "favorites",
    favorites: { items: [] },
    viewed: { items: [] },
    isLoading: false,
    error: null,
};

const myNoticesSlice = createSlice({
    name: "myNotices",
    initialState,
    reducers: {
        setTab(st, { payload }) { st.tab = payload; },
        reset: () => initialState,
    },
    extraReducers: (b) => {
        const pending = (st) => { st.isLoading = true; st.error = null; };
        const rejected = (st, a) => { st.isLoading = false; st.error = a.payload || "Error"; };

        b.addCase(fetchFavorites.pending, pending)
            .addCase(fetchFavorites.fulfilled, (st, { payload }) => {
                st.isLoading = false;
                st.favorites.items = payload.items;
            })
            .addCase(fetchFavorites.rejected, rejected);

        b.addCase(fetchViewed.pending, pending)
            .addCase(fetchViewed.fulfilled, (st, { payload }) => {
                st.isLoading = false;
                st.viewed.items = payload.items;
            })
            .addCase(fetchViewed.rejected, rejected);
        
        b.addCase(addFavorite.pending, (st) => { st.error = null; })
            .addCase(addFavorite.fulfilled, (st, { payload }) => {
                st.isLoading = false;
                const { id, item } = payload || {};
                const exists = st.favorites.items.some((x) => x._id === id || x.id === id);
                if (!exists && item) {
                    st.favorites.items.push({ ...(item._id ? item : { ...item, _id: id }) });
                }
            })
            .addCase(addFavorite.rejected, rejected);

        b.addCase(removeFavorite.pending, (st) => { st.error = null; })
            .addCase(removeFavorite.fulfilled, (st, { payload: id }) => {
                st.isLoading = false;
                st.favorites.items = st.favorites.items.filter(x => x._id !== id);
            })
            .addCase(removeFavorite.rejected, rejected);
    },
});

export const { setTab, reset } = myNoticesSlice.actions;
const _selectIsLoggedIn = (s) => s.auth?.isLoggedIn;
const _selectFavItems   = (s) => s.myNotices.favorites?.items || [];

export const selectMy = (s) => s.myNotices;
export const selectTab = (s) => s.myNotices.tab;
export const selectFav = (s) => s.myNotices.favorites;
export const selectFavIds = createSelector(
    [_selectIsLoggedIn, _selectFavItems],
    (isLoggedIn, items) => {
        if (!isLoggedIn) return new Set();
        return new Set(items.map(x => x._id || x.id));
    }
);
export const selectViewed = (s) => s.myNotices.viewed;
export const selectActiveList = (s) =>
    s.myNotices.tab === "favorites" ? s.myNotices.favorites : s.myNotices.viewed;
export const selectMyLoading = (s) => s.myNotices.isLoading;
export const selectMyError = (s) => s.myNotices.error;

export default myNoticesSlice.reducer;
