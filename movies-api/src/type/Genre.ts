export interface Genre {
    title: string,
    movies?: number[]
}

export interface CreateGenreRequest {
    body: Genre;
}

export interface CreateGenreResponse {
    status: number;
    body: Genre | { error: string };
}

export interface UpdateGenreRequest {
    body: Genre;
    params: { id: number };
}

export interface UpdateGenreResponse {
    status: number;
    body: Genre | { error: string };
}

export interface DeleteGenreRequest {
    params: { id: number }
}

export interface DeleteGenreResponse {
    status: number,
    body: { successMessage: string } | { error: string }
}

export interface FetchAllGenresRequest {} // mainly here when I need to implement pagination

export interface FetchAllGenresResponse {
  status: number;
  body: Genre[] | { error: string };
}

export interface GetUniquesGenreRequest {
    params: { id: number };
}

export interface GetUniqueGenreResponse {
    status: number;
    body: Genre | { error: string };
} 