import { configureStore } from "@reduxjs/toolkit";
import {reducerPath, reducer, middleware} from "./api";

export const usersStore = configureStore({
    reducer: {
        [reducerPath]: reducer, 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(middleware),
});