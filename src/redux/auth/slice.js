import { createSlice } from "@reduxjs/toolkit";
import { register, login, logoutUser, refreshUser } from "./operations";

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false, 
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
        // REGISTER
            .addCase(register.pending, (s) => {
                s.isLoading = true; s.error = null;
            })
            .addCase(register.fulfilled, (s, { payload }) => {
                s.isLoading = false;
                s.user = payload.user;
                s.token = payload.token;
                s.isLoggedIn = true;
            })
            .addCase(register.rejected, (s, { payload }) => {
                s.isLoading = false; s.error = payload || "Registration failed";
            })

            // LOGIN
            .addCase(login.pending, (s) => {
                s.isLoading = true; s.error = null;
            })
            .addCase(login.fulfilled, (s, { payload }) => {
                s.isLoading = false;
                s.user = payload.user;
                s.token = payload.token;
                s.isLoggedIn = true;
            })
            .addCase(login.rejected, (s, { payload }) => {
                s.isLoading = false; s.error = payload || "Login failed";
            })

            // LOGOUT
            .addCase(logoutUser.pending, (s) => {
                s.isLoading = true; s.error = null;
            })
            .addCase(logoutUser.fulfilled, (s) => {
                s.isLoading = false;
                s.user = null; s.token = null; s.isLoggedIn = false;
            })
            .addCase(logoutUser.rejected, (s, { payload }) => {
                s.isLoading = false; s.error = payload || "Logout failed";
            })
        
            // Refresh
            .addCase(refreshUser.pending, (s) => {
                s.isRefreshing = true;
                s.error = null;
            })
            .addCase(refreshUser.fulfilled, (s, { payload }) => {
                s.isRefreshing = false;
                s.user = payload.user;
                s.token = payload.token;
                s.isLoggedIn = true;
            })
            .addCase(refreshUser.rejected, (s) => {
                s.isRefreshing = false;
                s.user = null;
                s.token = null;
                s.isLoggedIn = false;
            });
    },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthRefreshing = (state) => state.auth.isRefreshing;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
