export interface Episode {
    title: string
    year: number;
    mediaId: number;
}
export interface CreateEpisodeRequest {
    body: Episode
}

export interface CreateEpisodeResponse {
    status: number;
    body: Episode | { error: string };
}

export interface UpdateEpisodeRequest {
    body: Episode
    params: { id: number }
}

export interface UpdateEpisodeResponse {
    status: number;
    body: Episode | { error: string }
}

export interface DeleteEpisodeRequest {
    params: { id: number }
}

export interface DeleteEpisodeResponse {
    status: number;
    body: { successMessage: string } | { error: string }
}

export interface FetchMediaEpisodesRequest {
    params: { mediaId: number }
}

export interface FetchMediaEpisodesResponse {
    status: number;
    body: Episode[] | { error: string }
}

export interface FetchUniqueEpisodeRequest {
    params: { id: number }
}

export interface FetchUniqueEpisodeResponse {
    status: number;
    body: Episode | { error: string }
}