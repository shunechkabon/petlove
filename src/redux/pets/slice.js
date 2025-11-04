import { createSlice } from "@reduxjs/toolkit";
import { fetchPets, createPet, removePet } from "./operations";

const initialState = { items: [], loading: false, error: null };

const slice = createSlice({
    name: "pets",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b
            .addCase(fetchPets.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(fetchPets.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
            .addCase(fetchPets.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
            .addCase(createPet.fulfilled, (s, a) => { s.items.unshift(a.payload); })
            .addCase(removePet.fulfilled, (s, a) => { s.items = s.items.filter(p => (p.id || p._id) !== a.payload); });
    }
});

export default slice.reducer;
export const selectPets = (st) => st.pets.items;
export const selectPetsLoading = (st) => st.pets.loading;
export const selectPetsError = (st) => st.pets.error;
