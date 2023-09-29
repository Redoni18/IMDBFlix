import { PrismaClient } from "@prisma/client";
import { CreateEpisodeRequest, CreateEpisodeResponse, UpdateEpisodeRequest, UpdateEpisodeResponse } from "../type/Episode";

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