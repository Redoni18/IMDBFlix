import { PrismaClient } from '@prisma/client'
import { Movie } from '../type/Movie'

const prisma = new PrismaClient()

export const createMovie = async ({body}: {body: Movie}) => {
    try {
        const newMovie = await prisma.movie.create({
            data: {
                title: body.title,
                year: body.year,
                genre: { connect: body.genre.map((id: number) => ({ id })) }, // Assuming genreIds is an array of genre IDs
                poster: body.poster,
                cast: { connect: body.cast.map((id: number) => ({id}))},
                reviews: { connect: body.reviews.map((id: number) => ({id}))},
                // episodes: { connect: body.episodes.map((id: number) => {(id)})}
            },
        })
        return {
            status: 201,
            body: newMovie,
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Internal Server Error' },
        };
    }
}