import { PrismaClient } from "@prisma/client";
import { CreateEpisodeRequest, CreateEpisodeResponse, DeleteEpisodeRequest, DeleteEpisodeResponse, FetchMediaEpisodesRequest, FetchMediaEpisodesResponse, FetchUniqueEpisodeRequest, FetchUniqueEpisodeResponse, UpdateEpisodeRequest, UpdateEpisodeResponse } from "../type/Episode";

const prisma = new PrismaClient()


export async function createEpisode(
    request: CreateEpisodeRequest
): Promise<CreateEpisodeResponse> {
    try {
        const { body } = request

        const newEpisode = await prisma.episode.create({
            data: {
                title: body.title,
                year: body.year,
                mediaId: body.mediaId
            },
            include: {
                media: true
            },
        
        })

        return {
            status: 201,
            body: newEpisode
        }
    } catch (error) {
        console.error("Error creating episode: ", error);
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function updateEpisode(
    request: UpdateEpisodeRequest
): Promise<UpdateEpisodeResponse> {
    try {
        const { body } = request
        const { id } = request.params

        const newEpisode = await prisma.episode.update({
            where: {
                id: Number(id)
            },
            data: {
                title: body.title,
                year: body.year,
                mediaId: body.mediaId
            },
            include: {
                media: true
            }
        })

        return {
            status: 200,
            body: newEpisode
        }
    } catch(error) {
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function deleteEpisode(
    request: DeleteEpisodeRequest
): Promise<DeleteEpisodeResponse> {
    try {
        const { id } = request.params

        const deletedEpisode = await prisma.episode.delete({
            where: {
                id: Number(id)
            }
        })

        if(!deletedEpisode) {
            return {
                status: 404,
                body: { error: "Episode not found" }
            }
        }

        return {
            status: 204,
            body: { successMessage: "Episode deleted successfully" }
        }
    } catch(error) {
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function fetchTvSeriesEpisodes(
    request: FetchMediaEpisodesRequest
): Promise<FetchMediaEpisodesResponse> {
    try {
        const { mediaId } = request.params

        const allMediaEpisodes = await prisma.episode.findMany({
            where: {
                mediaId: Number(mediaId)
            },
            include: {
                media: true
            }
        })

        return {
            status: 200,
            body: allMediaEpisodes
        }
    } catch(error) {
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function getUniqueEpisode(
    request: FetchUniqueEpisodeRequest
): Promise<FetchUniqueEpisodeResponse> {
    try {
        const { id } = request.params

        const episode = await prisma.episode.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                media: true
            }
        })

        if(!episode) {
            return {
                status: 404,
                body: { error: "Episode not found" }
            }
        }

        return {
            status: 200,
            body: episode
        }
    } catch(error) {
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}