import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    async (noticeId, { rejectWithValue }) => {
        try {
            await addFavoriteNotice(noticeId);
            return noticeId;
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
            .addCase(addFavorite.fulfilled, (st, { payload: id }) => {
                st.isLoading = false;
                const exists = st.favorites.items.some((x) => x._id === id || x.id === id);
                if (!exists) {
                    st.favorites.items.push({ _id: id });
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

export const selectMy = (s) => s.myNotices;
export const selectTab = (s) => s.myNotices.tab;
export const selectFav = (s) => s.myNotices.favorites;
export const selectFavIds = (s) => {
    const list = s.myNotices.favorites?.items || [];
    return new Set(list.map(x => x._id || x.id));
};
export const selectViewed = (s) => s.myNotices.viewed;
export const selectActiveList = (s) =>
    s.myNotices.tab === "favorites" ? s.myNotices.favorites : s.myNotices.viewed;
export const selectMyLoading = (s) => s.myNotices.isLoading;
export const selectMyError = (s) => s.myNotices.error;

export default myNoticesSlice.reducer;
