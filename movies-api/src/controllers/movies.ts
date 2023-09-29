import { MediaType, PrismaClient } from '@prisma/client';
import { FetchAllMoviesResponse, DeleteMovieRequest, DeleteMovieResponse, GetUniqueMovieRequest, GetUniqueMovieResponse, UpdateMediaRequest, UpdateMediaResponse, CreateMediaRequest, CreateMediaResponse, GetMovieOrTvRequest, GetMovieOrTvResponse } from '../type/Movie';

const prisma = new PrismaClient();


export async function createMedia(
  request: CreateMediaRequest
): Promise<CreateMediaResponse> {
  try {
    const { body } = request;


    // Create a new media item in the database
    const newMedia = await prisma.media.create({
      data: {
        title: body.title,
        year: body.year || 0,
        poster: body.poster,
        cast: {
          connect: body.cast.map((id: number) => ({ id })),
        },
        genres: {
          connect: body.genres.map((id: number) => ({ id })),
        },
        episodes: {
          connect: body.episodes?.map((id: number) => ({ id })) || [],
        },
        startYear: body.startYear,
        endYear: body.endYear,
        seasons: body.seasons,
        type: body.type
      },
      include: {
        cast: true, // Fetch the connected cast members
        genres: true, // Fetch the connected genres
        reviews: true, // Fetch the connected reviews
        episodes: true, // Fetch the connected episodes
      },
    });

    // Extract the relevant data for the response
    const simplifiedObject = {
      title: newMedia.title,
      year: newMedia.year,
      poster: newMedia.poster,
      cast: newMedia.cast.map((cast: { id: number }) => cast.id),
      genres: newMedia.genres.map((genre: { id: number }) => genre.id),
      episodes: newMedia.episodes?.map((episode: { id: number }) => episode.id) || [],
      startYear: newMedia.startYear || 0,
      endYear: newMedia.endYear || 0,
      seasons: newMedia.seasons || 0,
      type: newMedia.type, // Include the media type in the response
    };

    return {
      status: 201,
      body: simplifiedObject,
    };
  } catch (error) {
    console.error('Error creating media item:', error);
    return {
      status: 500, // Internal Server Error
      body: { error: 'Internal Server Error' },
    };
  }
}



export async function updateMedia(
  request: UpdateMediaRequest
): Promise<UpdateMediaResponse> {
  try {
    const { body } = request;
    const { id }: { id: number } = request.params;
    const { type } = body
    // Update the media item in the database
    const updatedMedia = await prisma.media.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        year: body.year || 0,
        poster: body.poster,
        cast: {
          connect: body.cast.map((id: number) => ({ id })),
        },
        genres: {
          connect: body.genres.map((id: number) => ({ id })),
        },
        episodes: {
          connect: body.episodes?.map((id: number) => ({ id })) || [],
        },
        startYear: body.startYear,
        endYear: body.endYear,
        seasons: body.seasons,
        type: MediaType[type as keyof typeof MediaType] // Set the media type
      },
      include: {
        cast: true, // Fetch the connected cast members
        genres: true, // Fetch the connected genres
        reviews: true, // Fetch the connected reviews
        episodes: true, // Fetch the connected episodes
      },
    });

    // Extract the relevant data for the response
    const simplifiedObject = {
      title: updatedMedia.title,
      year: updatedMedia.year,
      poster: updatedMedia.poster,
      cast: updatedMedia.cast.map((cast: { id: number }) => cast.id),
      genres: updatedMedia.genres.map((genre: { id: number }) => genre.id),
      episodes: updatedMedia.episodes?.map((episode: { id: number }) => episode.id) || [],
      startYear: updatedMedia.startYear || updatedMedia.year,
      endYear: updatedMedia.endYear || 0,
      seasons: updatedMedia.seasons || 0,
      type: updatedMedia.type, // Include the media type in the response
    };

    return {
      status: 200,
      body: simplifiedObject,
    };
  } catch (error) {
    console.error('Error updating media item:', error);
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

    const deletedMovie = await prisma.media.delete({
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

export async function fetchAllMedia(): Promise<FetchAllMoviesResponse> {
  try {
    const allMovies = await prisma.media.findMany({
      include: {
        cast: true,
        genres: true,
        reviews: true
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

    const movie = await prisma.media.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        cast: true,
        genres: true,
        reviews: true
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

export async function getMediaBasedOnType(
  request: GetMovieOrTvRequest
): Promise<GetMovieOrTvResponse> {
  try {
    const { type } = request.params

    const media = await prisma.media.findMany({
      where: {
        type: type
      },
      include: {
        cast: true,
        genres: true,
        reviews: true,
      }
    })

    if(!media) {
      return {
        status: 404,
        body: { error: "Media type not found" }
      }
    }

    return {
      status: 200,
      body: media
    }
  } catch (error) {
    console.error("Error fetching types of media: ", error)
    return {
      status: 500,
      body: { error: "Internal Server Error" }
    }
  }
}