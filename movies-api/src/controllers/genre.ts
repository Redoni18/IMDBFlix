import { PrismaClient } from "@prisma/client"
import { CreateGenreRequest, CreateGenreResponse } from "../type/Genre"

const prisma = new PrismaClient()

export async function createGenre(
    request: CreateGenreRequest
): Promise<CreateGenreResponse> {
    try {
        const { body } = request

        const newGenre = await prisma.genre.create({
            data: {
                title: body.title,
                movies: {
                    connect: body.movies.map((id: number) => ({ id }))
                }
            },
            include: {
                movies: true
            }
        })

        const simplifiedObject = {
            title: newGenre.title,
            movies: newGenre.movies.map((movie: {id: number}) => movie.id)  
        };
    
        return {
            status: 201,
            body: simplifiedObject,
        };
    } catch {
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        }
    }
}