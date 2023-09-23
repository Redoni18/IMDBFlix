import { PrismaClient } from '@prisma/client';
import { FetchAllMoviesResponse, CreateMovieRequest, CreateMovieResponse, DeleteMovieRequest, DeleteMovieResponse, Movie, UpdateMovieRequest, UpdateMovieResponse, GetUniqueMovieRequest, GetUniqueMovieResponse } from '../type/Movie';

const prisma = new PrismaClient();


//Create new movie
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


//update specific movie
export async function updateMovie(
    request: UpdateMovieRequest
): Promise<UpdateMovieResponse> {
  try {
    const { body } = request;
    const { id }: { id: number} = request.params

    const movieDataToUpdate = body

    const updatedMovie: Movie = await prisma.movie.update({
      where: {
          id: Number(id)
      },
      data: movieDataToUpdate
    })

    // Create a new movie in the database
    return {
      status: 200, // OK
      body: updatedMovie,
    };
  } catch (error) {
    console.error('Error creating movie:', error);
    return {
      status: 500, // Internal Server Error
      body: { error: 'Internal Server Error' },
    };
  }
}


export async function deleteMovie(
  request: DeleteMovieRequest
): Promise<DeleteMovieResponse> {
  try {
    const { id }: { id: number } = request.params;

    const deletedMovie = await prisma.movie.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedMovie) {
      return {
        status: 404,
        body: { error: 'Movie not found' },
      };
    }

    return {
      status: 204,
      body: {successMessage: "Movie deleted successfully"},
    };
  } catch (error) {
    console.error('Error deleting movie:', error);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
}

export async function fetchAllMovies(): Promise<FetchAllMoviesResponse> {
  try {
    const allMovies = await prisma.movie.findMany();

    return {
      status: 200, // OK
      body: allMovies,
    };
  } catch (error) {
    console.error('Error fetching all movies:', error);
    return {
      status: 500, // Internal Server Error
      body: { error: 'Internal Server Error' },
    };
  }
}

export async function getUniqueMovie(
  request: GetUniqueMovieRequest
): Promise<GetUniqueMovieResponse> {
  try {
    const { id }: {id: number} = request.params 

    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!movie) {
      return {
        status: 404,
        body: { error: 'Movie not found' },
      };
    }

    return {
      status: 200,
      body: movie,
    }
  } catch (err) {
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    }
  }
}