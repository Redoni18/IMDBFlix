export interface Episode {
    title: string
    year: number;
    movieId: number;
}

export interface CreateEpisodeRequest {
    body: Episode
}

export interface CreateEpisodeResponse {
    status: number;
    body: Episode | { error: string };
}
