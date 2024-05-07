import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// https://react-redux.js.org/tutorials/quick-start
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

export const { increment, decrement, incrementByAmount } = filmSlice.actions

export default filmSlice.reducer;