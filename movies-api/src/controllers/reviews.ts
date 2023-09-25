import { PrismaClient } from "@prisma/client";
import { CreateReviewRequest, CreateReviewResponse } from "../type/Review"

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