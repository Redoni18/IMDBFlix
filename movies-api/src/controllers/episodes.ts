import { PrismaClient } from "@prisma/client";
import { CreateEpisodeRequest, CreateEpisodeResponse } from "../type/Episode";

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
