import { PrismaClient } from '@prisma/client';
import { CreateCastRequest, CreateCastResponse, DeleteCastRequest, DeleteCastResponse, FetchAllCastResponse, GetUniqueCastRequest, GetUniqueCastResponse, UpdateCastRequest, UpdateCastResponse } from "../type/Cast"

const prisma = new PrismaClient();


//Create new cast
export async function createCast(
  request: CreateCastRequest
): Promise<CreateCastResponse> {
  try {
    const { body } = request;

    // Create a new movie in the database
    const newCast = await prisma.person.create({
      data: {
        name: body.name,
        age: body.age,
        bio: body.bio,
      },
      include: {
        movies: true,
      },
    });

    // Extract the relevant data for the response
    const simplifiedCast = {
      name: newCast.name,
      age: newCast.age,
      bio: newCast.bio,
    };

    return {
      status: 201,
      body: simplifiedCast,
    };
  } catch (error) {
    console.error('Error creating new cast:', error);
    return {
      status: 500, // Internal Server Error
      body: { error: 'Internal Server Error' },
    };
  }
}


//update specific cast info
export async function updateCast(
    request: UpdateCastRequest
): Promise<UpdateCastResponse> {
  try {
    const { body } = request;
    const { id }: { id: number} = request.params

    const newCast = await prisma.person.update({
        where: {
            id: Number(id)
        },
        data: {
          name: body.name,
          age: body.age,
          bio: body.bio,
        },
        include: {
          movies: true,
        },
    });
  
    const simplifiedCast = {
        name: newCast.name,
        age: newCast.age,
        bio: newCast.bio,
    };

    return {
      status: 200,
      body: simplifiedCast,
    };
  } catch (error) {
    console.error('Error updating cast:', error);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
}


export async function deleteCast(
  request: DeleteCastRequest
): Promise<DeleteCastResponse> {
  try {
    const { id }: { id: number } = request.params;

    const deletedCast = await prisma.person.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedCast) {
      return {
        status: 404,
        body: { error: 'Cast not found' },
      };
    }

    return {
      status: 204,
      body: {successMessage: "Cast deleted successfully"},
    };
  } catch (error) {
    console.error('Error deleting cast:', error);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
}

export async function fetchAllActors(): Promise<FetchAllCastResponse> {
  try {
    const allCast = await prisma.person.findMany({
        include: {
            movies: true,
        },
    });

    return {
      status: 200,
      body: allCast,
    };
  } catch (error) {
    console.error('Error fetching all actors:', error);
    return {
      status: 500, // Internal Server Error
      body: { error: 'Internal Server Error' },
    };
  }
}

export async function getUniqueCast(
  request: GetUniqueCastRequest
): Promise<GetUniqueCastResponse> {
  try {
    const { id }: {id: number} = request.params 

    const cast = await prisma.person.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        movies: true,
      },
    })

    if (!cast) {
      return {
        status: 404,
        body: { error: 'Cast not found' },
      };
    }

    return {
      status: 200,
      body: cast,
    }
  } catch (err) {
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    }
  }
}