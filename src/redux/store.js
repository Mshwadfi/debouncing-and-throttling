import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";


const store = configureStore({
    reducer: {
        searchSuggestion: searchReducer,
    }
})

export default store;