import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyPets, addPet, deletePet } from "../../api/pets";

export const fetchPets = createAsyncThunk("pets/fetch", async (_, thunkAPI) => {
    try {
        const full = await getMyPets();
        return full.pets ?? [];
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
});

export const createPet = createAsyncThunk("pets/create", async (payload, thunkAPI) => {
    try {
        const pet = await addPet(payload);
        return pet;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
});

export const removePet = createAsyncThunk("pets/remove", async (id, thunkAPI) => {
    try {
        await deletePet(id);
        return id;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
});
