import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieData, MovieTrailerData, TmdbData } from 'types';

const TMDBURL = "https://api.themoviedb.org";
const KEY_ID = '73cadb65ff374fcf789e84b35293b73b';

const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2NhZGI2NWZmMzc0ZmNmNzg5ZTg0YjM1MjkzYjczYiIsInN1YiI6IjYzMTI1MmQ5ZTYzNTcxMDA3ZGRmYWU3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F4GjlBVHUFShISQkDLFfA4_9r854nkVAyH8oyJwt3pU' 
}


export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({baseUrl: TMDBURL}),
    endpoints: (builder) => ({
        getAllRecentMovies: builder.query<TmdbData, void>({
            query: (params) => ({
                url: `/3/movie/popular?api_key=${KEY_ID}&language=en-US&page=1`,
                method: "GET",
                headers: headers
            }),
        }),
        getPosterByName: builder.query<MovieData, string>({
            query: (name) => `3/movie/${name}/images`,
        }),
        getVideoByName: builder.query<MovieTrailerData, number>({
            query: (movie_id) => `/3/movie/${movie_id}/videos?language=en-US&api_key=${KEY_ID}`,
        })
    })
})

export const { useGetAllRecentMoviesQuery, useGetPosterByNameQuery, useGetVideoByNameQuery } = movieApi;
