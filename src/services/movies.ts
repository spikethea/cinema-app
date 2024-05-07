import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieData } from 'types';

const TMDBURL = "https://image.tmdb.org";
const KEY_ID = '73cadb65ff374fcf789e84b35293b73b';


export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({baseUrl: TMDBURL}),
    endpoints: (builder) => ({
        getAllRecentMovies: builder.query<MovieData[], string>({
            query: () => `/3/movie/popular?api_key=${KEY_ID}&language=en-US&page=1`,
        }),
        getPosterByName: builder.query<MovieData, string>({
            query: (name) => `3/movie/${name}/images`,
        })
    })
})

