import { configureStore } from "@reduxjs/toolkit";
import flyerReducer from "./flyer/flyerSlice";

export const store = configureStore({
    reducer: {
        flyer: flyerReducer,
    },
})
