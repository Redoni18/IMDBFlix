export interface Movie {
    title: string;
    year: number;
    // genreIds: number[];
    poster: string;
    // castIds: number[];
    // reviewIds: number[];
}

export interface CreateMovieRequest {
    body: Movie;
}

export interface CreateMovieResponse {
    status: number;
    body: Movie | { error: string };
}