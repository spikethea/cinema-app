import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const filmSlice = createSlice({
    name: 'film',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount(state, action: PayloadAction<number>) {
            state.value += action.payload
        },
    },
});

export default filmSlice.reducer;