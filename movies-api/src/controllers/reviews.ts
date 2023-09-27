import { PrismaClient } from "@prisma/client";
import { CreateReviewRequest, CreateReviewResponse, UpdateReviewRequest, UpdateReviewResponse } from "../type/Review"

const prisma =  new PrismaClient()

export async function createReview(
    request: CreateReviewRequest
): Promise<CreateReviewResponse> {
    try {
        const { body } = request;

        const newReview = await prisma.review.create({
            data: {
                comment: body.comment,
                movieId: body.movieId
            },
        });

        return {
            status: 201,
            body: newReview,
        };
    } catch (error) {
        console.error('Error creating review:', error);
        return {
            status: 500, // Internal Server Error
            body: { error: 'Internal Server Error' },
        };
    }
}

export async function updateReview (
    request: UpdateReviewRequest
): Promise<UpdateReviewResponse> {
    try {
        const { body } = request
        const { id }: {id: number} = request.params

        const newReview = await prisma.review.update({
            where: {
                id: Number(id)
            },
            data: {
                comment: body.comment
            }
        })

        return {
            status: 200,
            body: newReview
        }
    } catch (error) {
        console.error('Error updating review', error)
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}