import { configureStore } from '@reduxjs/toolkit'

import filmReducer from 'features/films/filmSlice'

const store = configureStore({
  reducer: {
    film: filmReducer
  },
})

export type IRootState = ReturnType<typeof store.getState>

export default store;