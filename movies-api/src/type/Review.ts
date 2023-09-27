export interface Review {
    comment: string;
    movieId: number
}

export interface CreateReviewRequest {
    body: Review
}

export interface CreateReviewResponse {
    status: number;
    body: Review | { error: string }
}

export interface UpdateReviewRequest {
    body: { comment: string };
    params: { id: number }
}

export interface UpdateReviewResponse {
    status: number;
    body: Review | { error: string }
}

export interface DeleteReviewRequest {
    params: { id: number }
}

export interface DeleteReviewResponse {
    status: number;
    body: { successMessage: string } | { error: string }
}

export interface FetchMovieReviewsRequest {
    params: { movieId: number }
}

export interface FetchMovieReviewsResponse {
    status: number;
    body: Review[] | { error: string }
}

export interface FetchUniqueReviewRequest {
    params: { id: number }
}

export interface FetchUniqueReviewResponse {
    status: number;
    body: Review | { error: string }
}