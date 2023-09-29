export type MediaType = 'Movie' | 'TvSeries';
export interface Media {
    title: string;
    year: number;
    poster: string;
    cast: number[];
    genres: number[];
    reviews?: number[];
    startYear?: number;
    endYear?: number;
    seasons?: number;
    episodes?: number[];
    type: MediaType
}

export interface CreateMediaRequest {
    body: Media;
}

export interface CreateMediaResponse {
    status: number;
    body: Media | { error: string };
}

export interface UpdateMediaRequest {
    body: Media;
    params: { id: number };
}
  
export interface UpdateMediaResponse {
    status: number;
    body: Media | { error: string };
}

export interface UpdateTvSeriesRequest {
    body: {
        title: string;
        poster: string;
        startYear: number;
        cast: number[];
        genres: number[];
        endYear: number;
        seasons: number;
        episodes: number[];
    }
    params: { id: number }
}

export interface UpdateTvSeriesResponse {
    status: number;
    body: {
        title: string;
        poster: string;
        startYear: number;
        cast: number[];
        genres: number[];
        endYear: number;
        seasons: number;
        episodes: number[];
    } | { error: string }
}

export interface DeleteMovieRequest {
    params: { id: number };
}
  
export interface DeleteMovieResponse {
    status: number;
    body: {successMessage: string} | { error: string };
}

export interface FetchAllMoviesRequest {} // mainly here when I need to implement pagination

export interface FetchAllMoviesResponse {
  status: number;
  body: Media[] | { error: string };
}

export interface GetUniqueMovieRequest {
    params: { id: number };
}

export interface GetUniqueMovieResponse {
    status: number;
    body: Media | { error: string };
}