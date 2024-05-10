import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'searchSuggestions', // Fixed: Use string instead of undefined variable
    initialState: {},
    reducers: {
        cacheResults: (state, action) => {
            // Here, we should directly mutate the state because Redux Toolkit uses Immer internally to handle immutability
            Object.assign(state, action.payload);
        }
    }
});

export const {cacheResults} = searchSlice.actions;
export default searchSlice.reducer;
