import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { setAuthHeader, clearAuthHeader } from "../../api/client";
import { editCurrent, getCurrentFull } from "../../api/users";
import { setCredentials, logout } from "./slice";

// REGISTER
export const register = createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
        try {
            const { data: registerData } = await axios.post("/users/signup", formData);
            setAuthHeader(registerData.token);
            const { data: currentUser } = await axios.get("/users/current");

            const fullData = { user: currentUser, token: registerData.token };
            thunkAPI.dispatch(setCredentials(fullData));
            localStorage.setItem("token", registerData.token);
            thunkAPI.dispatch(fetchUserFull());

            return fullData;
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
            const { data: loginData } = await axios.post("/users/signin", formData);
            setAuthHeader(loginData.token);
            const { data: currentUser } = await axios.get("/users/current");

            const fullData = { user: currentUser, token: loginData.token };
            thunkAPI.dispatch(setCredentials(fullData));
            localStorage.setItem("token", loginData.token);
            thunkAPI.dispatch(fetchUserFull());

            return fullData;
        } catch (err) {
            const message =
                err.response?.data?.message || "Login failed. Check your credentials.";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
    try {
        await axios.post("/users/signout");
        return true;
    } catch (err) {
        const message =
            err.response?.data?.message || "Logout failed.";
        return thunkAPI.rejectWithValue(message);
    } finally {
        clearAuthHeader();
        localStorage.removeItem("token");
        thunkAPI.dispatch(logout());
    }
});

// Refresh
export const refreshUser = createAsyncThunk(
    "auth/refreshUser",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        try {
            setAuthHeader(token);
            const { data } = await axios.get("/users/current");
            return { user: data, token };
        } catch (err) {
            const message =
                err.response?.data?.message || "Failed to refresh user";
            clearAuthHeader();
            localStorage.removeItem("token");
            thunkAPI.dispatch(logout());
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// EDIT USER
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (payload, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token || localStorage.getItem("token");
            if (token) setAuthHeader(token);

            await editCurrent(payload);
            const full = await getCurrentFull();

            const fullData = { user: full, token };
            thunkAPI.dispatch(setCredentials(fullData));
            return fullData;
        } catch (err) {
            const message = err?.response?.data?.message || "Update failed. Try again.";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// GET full user
export const fetchUserFull = createAsyncThunk(
    "auth/fetchUserFull",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token || localStorage.getItem("token");
            if (!token) return thunkAPI.rejectWithValue("No token");
            if (token) setAuthHeader(token);
            const data = await getCurrentFull();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e?.response?.data?.message || "Fetch full failed");
        }
    }
);
