import { PrismaClient } from "@prisma/client"
import { CreateGenreRequest, CreateGenreResponse, DeleteGenreRequest, DeleteGenreResponse, FetchAllGenresResponse, GetUniqueGenreResponse, GetUniquesGenreRequest, UpdateGenreRequest, UpdateGenreResponse } from "../type/Genre"

const prisma = new PrismaClient()

export async function createGenre(
    request: CreateGenreRequest
): Promise<CreateGenreResponse> {
    try {
        const { body } = request

        const newGenre = await prisma.genre.create({
            data: {
                title: body.title,
            },
            include: {
                movies: true
            }
        })

        const simplifiedObject = {
            title: newGenre.title,
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

export async function updateGenre(
    request: UpdateGenreRequest
): Promise<UpdateGenreResponse> {
    try {
        const { body } = request
        const { id }: { id: number } = request.params

        const updatedGenre = await prisma.genre.update({
            where: {
                id: Number(id)
            },
            data: {
                title: body.title,
            },
            include: {
                movies: true
            }
        })

        const simplifiedObject = {
            title: updatedGenre.title,
        }

        return {
            status: 200,
            body: simplifiedObject
        }
    } catch {
        return {
            status: 500,
            body: { error: 'Internal Sever Error' }
        }
    }
}

export async function deleteGenre(
    request: DeleteGenreRequest
): Promise<DeleteGenreResponse> {
    try {
        const { id } = request.params

        const deletedGenre = await prisma.genre.delete({
            where: {
                id: Number(id)
            }
        })

        if(!deletedGenre) {
            return {
                status: 404,
                body: { error: "Genre not found" }
            }
        }

        return {
            status: 204,
            body: { successMessage: "Genre deleted successfully" }
        }
    } catch (error) {
        console.error('Error deleting cast:', error);
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function fetchAllGenres(): Promise<FetchAllGenresResponse> {
    try {
        const allGenres = await prisma.genre.findMany({
            include: {
                movies: true
            }
        })

        return {
            status: 200,
            body: allGenres
        }
    } catch (error) {
        console.log('Error fetching all genres: ', error)
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function getUniqueGenre(
    request: GetUniquesGenreRequest
): Promise<GetUniqueGenreResponse> {
    try {
        const { id } = request.params
        const genre = await prisma.genre.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                movies: true
            }
        })

        if(!genre) {
            return {
                status: 404,
                body: { error: "Genre not found" }
            }
        }

        return {
            status: 200,
            body: genre
        }
    } catch (error) {
        return {
            status: 500,
            body: { error: "Internal server error" }
        }
    }
}
