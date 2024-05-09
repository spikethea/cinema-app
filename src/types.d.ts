export interface MovieData {
    title: string,
    release_date: string,
    image: string,
    id: number;
    backdrop_path: string;
    poster_path: string;
}

interface TmdbData {
    page: string,
    results: MovieData[],
    total_pages: number,
    total_results: number
}