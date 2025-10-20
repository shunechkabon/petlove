import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFriends } from "../../api/friends";

export const fetchFriends = createAsyncThunk("friends/fetchAll", async () => {
    return await getFriends();
});

const initialState = { items: [], isLoading: false, error: null };

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchFriends.pending, (s) => { s.isLoading = true; s.error = null; });
        b.addCase(fetchFriends.fulfilled, (s, a) => { s.isLoading = false; s.items = a.payload; });
        b.addCase(fetchFriends.rejected, (s, a) => { s.isLoading = false; s.error = a.error.message || "Failed to load"; });
    },
});

export const selectFriends = (state) => state.friends;
export default friendsSlice.reducer;
