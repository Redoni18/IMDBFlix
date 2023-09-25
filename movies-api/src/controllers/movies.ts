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
        cast: {
          connect: body.cast.map((id) => ({ id })),
        },
        genres: {
          connect: body.genres.map((id) => ({ id })),
        },
        // reviews: {
        //   connect: body.reviewIds.map((id) => ({ id })),
        // },
      },
      include: {
        cast: true, // Fetch the connected cast members
        genres: true, // Fetch the connected genres
        // reviews: true, // Fetch the connected reviews
      },
    });

    // Extract the relevant data for the response
    const simplifiedMovie = {
      title: newMovie.title,
      year: newMovie.year,
      poster: newMovie.poster,
      cast: newMovie.cast.map((person: { id: number }) => person.id),
      genres: newMovie.genres.map((genre : { id: number }) => genre.id),
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

      const updatedMovie = await prisma.movie.update({
        where: {
            id: Number(id)
        },
        data: {
          title: body.title,
          year: body.year,
          poster: body.poster,
          cast: {
            connect: body.cast.map((id: number) => ({ id })),
          },
          genres: {
            connect: body.genres.map((id: number) => ({ id })),
          },
        },
        include: {
          cast: true,
          genres: true
        },
    });

    const simplifiedMovie = {
        title: updatedMovie.title,
        year: updatedMovie.year,
        poster: updatedMovie.poster,
        cast: updatedMovie.cast.map((cast: { id: number }) => cast.id),
        genres: updatedMovie.genres.map((genre: { id: number }) => genre.id),
    };

    return {
      status: 200,
      body: simplifiedMovie,
    };
  } catch (error) {
    console.error('Error updateing movie:', error);
    return {
      status: 500,
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
    const allMovies = await prisma.movie.findMany({
      include: {
        cast: true,
        genres: true
      }
    });

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
      },
      include: {
        cast: true,
        genres: true
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