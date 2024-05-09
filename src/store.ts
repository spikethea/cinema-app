import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';

//import filmReducer from 'features/films/filmSlice'
import { movieApi } from 'services/movies';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [movieApi.reducerPath]: movieApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
})
setupListeners(store.dispatch)


export type IRootState = ReturnType<typeof store.getState>

export default store;