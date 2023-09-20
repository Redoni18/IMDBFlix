export type Movie = {
    title: string,
    year: number,
    genre: number[], // Assuming genreIds is an array of genre IDs
    poster: string,
    cast: number[],
    reviews: number[],
    // episodes: number[]
}