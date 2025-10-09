import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/slice';
import news from "./news/slice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        news,
    },
});
