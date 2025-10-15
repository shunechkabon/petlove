import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/slice';
import newsReducer from "./news/slice";
import noticesReducer from "./notices/slice";
import dictionariesReducer from "./dictionaries/slice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        news: newsReducer,
        notices: noticesReducer,
        dictionaries: dictionariesReducer,
    },
});
