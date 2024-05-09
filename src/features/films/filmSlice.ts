import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// https://react-redux.js.org/tutorials/quick-start
export const filmSlice = createSlice({
    name: 'film',
    initialState: {
        isLoading: false,
        data: null,
        error: false
    },
    reducers: {
        
    },
});

export const {  } = filmSlice.actions

export default filmSlice.reducer;