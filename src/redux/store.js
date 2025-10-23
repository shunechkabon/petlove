import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/slice';
import newsReducer from "./news/slice";
import friendsReducer from "./friends/slice";
import noticesReducer from "./notices/slice";
import dictionariesReducer from "./dictionaries/slice";
import authReducer from "./auth/slice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        news: newsReducer,
        notices: noticesReducer,
        dictionaries: dictionariesReducer,
        friends: friendsReducer,
        auth: authReducer,
    },
});
