// src/controllers/movieController.ts

import { PrismaClient } from '@prisma/client';
import { CreateMovieRequest, CreateMovieResponse } from '../type/Movie';

const prisma = new PrismaClient();

export async function createMovie(
  request: CreateMovieRequest
): Promise<CreateMovieResponse> {
  try {
    const { body } = request;

    // Create a new movie in the database
    const newMovie = await prisma.movie.create({
      data: {
        title: body.title,
        year: body.year,
        poster: body.poster,
        // genre: {
        //   connect: body.genreIds.map((id) => ({ id })),
        // },
        // cast: {
        //   connect: body.castIds.map((id) => ({ id })),
        // },
        // reviews: {
        //   connect: body.reviewIds.map((id) => ({ id })),
        // },
      },
    //   include: {
    //     genre: true, // Fetch the connected genres
    //     cast: true, // Fetch the connected cast members
    //     reviews: true, // Fetch the connected reviews
    //   },
    });

    // Extract the relevant data for the response
    const simplifiedMovie = {
      title: newMovie.title,
      year: newMovie.year,
    //   genreIds: newMovie.genre.map((genre) => genre.id),
      poster: newMovie.poster,
    //   castIds: newMovie.cast.map((person) => person.id),
    //   reviewIds: newMovie.reviews.map((review) => review.id),
    };

    return {
      status: 201,
      body: simplifiedMovie,
    };
  } catch (error) {
    console.error('Error creating movie:', error);
    return {
      status: 500, // Internal Server Error
      body: { error: 'Internal Server Error' },
    };
  }
}
