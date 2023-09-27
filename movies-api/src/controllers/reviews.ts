import { PrismaClient } from "@prisma/client";
import { CreateReviewRequest, CreateReviewResponse, DeleteReviewRequest, DeleteReviewResponse, FetchMovieReviewsRequest, FetchMovieReviewsResponse, FetchUniqueReviewRequest, FetchUniqueReviewResponse, UpdateReviewRequest, UpdateReviewResponse } from "../type/Review"

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

export async function deleteReview (
    request: DeleteReviewRequest
): Promise<DeleteReviewResponse> {
    try {
        const { id } = request.params

        const deletedReview = await prisma.review.delete({
            where: {
                id: Number(id)
            }
        })

        if(!deletedReview) {
            return {
                status: 404,
                body: { error: "Review not found" }
            }
        }

        return {
            status: 204,
            body: { successMessage: "Review deleted successfully" }
        }
    } catch (error) {
        console.error("Error deleting review: ", error)
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function fetchAllReviews(
    request: FetchMovieReviewsRequest
): Promise<FetchMovieReviewsResponse> {
    try {
        const { movieId } = request.params

        const allReviews = await prisma.review.findMany({
            where: {
                movieId: Number(movieId)
            }
        })

        return {
            status: 200,
            body: allReviews
        }
    } catch (error) {
        console.error("Error fetching all reviews: ", error)
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        }
    }
}

export async function getUniqueReview(
    request: FetchUniqueReviewRequest
): Promise<FetchUniqueReviewResponse> {
    try {
        const { id }: {id: number} = request.params 

        const review = await prisma.review.findUnique({
            where: {
                id: Number(id)
            }
        })
    
        if (!review) {
            return {
                status: 404,
                body: { error: 'Review not found' },
            };
        }
    
        return {
            status: 200,
            body: review,
        }
    } catch (err) {
        return {
            status: 500,
            body: { error: 'Internal Server Error' },
        }
    }
}