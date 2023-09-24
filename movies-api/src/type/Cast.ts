export interface Cast {
    name: string;
    age: number;
    // movieIds: number[];
    bio: string;
}

export interface CreateCastRequest {
    body: Cast;
}

export interface CreateCastResponse {
    status: number;
    body: Cast | { error: string };
}

export interface UpdateCastRequest {
    body: Cast;
    params: { id: number };
}
  
export interface UpdateCastResponse {
    status: number;
    body: Cast | { error: string };
}

export interface DeleteCastRequest {
    params: { id: number };
}
  
export interface DeleteCastResponse {
    status: number;
    body: {successMessage: string} | { error: string };
}

export interface FetchAllCastRequest {} // mainly here when I need to implement pagination

export interface FetchAllCastResponse {
  status: number;
  body: Cast[] | { error: string };
}

export interface GetUniqueCastRequest {
    params: { id: number };
}

export interface GetUniqueCastResponse {
    status: number;
    body: Cast | { error: string };
}