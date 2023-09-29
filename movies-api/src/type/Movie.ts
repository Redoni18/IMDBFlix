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


export interface GetMovieOrTvRequest {
    params: { type: MediaType }
}

export interface GetMovieOrTvResponse {
    status: number;
    body: Media | { error: string }
}