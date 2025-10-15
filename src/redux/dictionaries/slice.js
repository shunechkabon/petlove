import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getSexes, getSpecies, getNoticeLocations } from "../../api/dictionaries";

export const fetchCategories = createAsyncThunk("dict/fetchCategories", async () => {
    return await getCategories();
});
export const fetchSexes = createAsyncThunk("dict/fetchSexes", async () => {
    return await getSexes();
});
export const fetchSpecies = createAsyncThunk("dict/fetchSpecies", async () => {
    return await getSpecies();
});
export const fetchLocations = createAsyncThunk("dict/fetchLocations", async () => {
    return await getNoticeLocations();
});

const initialState = {
    categories: [],
    sexes: [],
    species: [],
    locations: [],
    isLoading: false,
    error: null,
    loaded: { categories: false, sexes: false, species: false, locations: false },
};

const dictSlice = createSlice({
    name: "dictionaries",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        const pend = (s) => { s.isLoading = true; s.error = null; };
        const fail = (s, a) => { s.isLoading = false; s.error = a.payload || "Failed to load dictionaries"; };

        b.addCase(fetchCategories.pending, pend)
            .addCase(fetchCategories.fulfilled, (s, { payload }) => {
                s.isLoading = false; s.categories = payload || []; s.loaded.categories = true;
            })
            .addCase(fetchCategories.rejected, fail);

        b.addCase(fetchSexes.pending, pend)
            .addCase(fetchSexes.fulfilled, (s, { payload }) => {
                s.isLoading = false; s.sexes = payload || []; s.loaded.sexes = true;
            })
            .addCase(fetchSexes.rejected, fail);

        b.addCase(fetchSpecies.pending, pend)
            .addCase(fetchSpecies.fulfilled, (s, { payload }) => {
                s.isLoading = false; s.species = payload || []; s.loaded.species = true;
            })
            .addCase(fetchSpecies.rejected, fail);

        b.addCase(fetchLocations.pending, pend)
            .addCase(fetchLocations.fulfilled, (s, { payload }) => {
                s.isLoading = false; s.locations = payload || []; s.loaded.locations = true;
            })
            .addCase(fetchLocations.rejected, fail);
    },
});

export default dictSlice.reducer;

export const selectCategories = (st) => st.dictionaries.categories;
export const selectSexes = (st) => st.dictionaries.sexes;
export const selectSpeciesDict = (st) => st.dictionaries.species;
export const selectLocations = (st) => st.dictionaries.locations;
export const selectDictLoaded = (st) => st.dictionaries.loaded;
export const selectDictLoading = (st) => st.dictionaries.isLoading;
export const selectDictError = (st) => st.dictionaries.error;
