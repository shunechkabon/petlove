import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { setAuthHeader, clearAuthHeader } from "../../api/client";
import { setCredentials, logout } from "./slice";

// REGISTER
export const register = createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post("/users/signup", formData);

            setAuthHeader(data.token);
            thunkAPI.dispatch(setCredentials(data));

            localStorage.setItem("token", data.token);
            return data;
        } catch (err) {
            const message =
                err.response?.data?.message || "Registration failed. Try again.";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// LOGIN
export const login = createAsyncThunk(
    "auth/login",
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post("/users/signin", formData);

            setAuthHeader(data.token);
            thunkAPI.dispatch(setCredentials(data));

            localStorage.setItem("token", data.token);
            return data;
        } catch (err) {
            const message =
                err.response?.data?.message || "Login failed. Check your credentials.";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post("/users/signout");
        clearAuthHeader();
        localStorage.removeItem("token");
        thunkAPI.dispatch(logout());
    } catch (err) {
        const message =
            err.response?.data?.message || "Logout failed.";
        return thunkAPI.rejectWithValue(message);
    }
});
