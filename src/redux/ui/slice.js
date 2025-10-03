import { createSlice, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

const initialState = {
    pendingCount: 0,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        startLoading: (state) => { state.pendingCount += 1; },
        stopLoading: (state) => { state.pendingCount = Math.max(0, state.pendingCount - 1); },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {
                state.pendingCount += 1;
            })
            .addMatcher(isFulfilled, (state) => {
                state.pendingCount = Math.max(0, state.pendingCount - 1);
            })
            .addMatcher(isRejected, (state) => {
                state.pendingCount = Math.max(0, state.pendingCount - 1);
            });
    },
});

export const { startLoading, stopLoading } = uiSlice.actions;
export default uiSlice.reducer;

export const selectIsLoading = (state) => state.ui.pendingCount > 0;