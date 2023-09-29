import { PrismaClient } from '@prisma/client';
import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { createMedia, deleteMovie, fetchAllMedia, getMediaBasedOnType, getUniqueMovie, updateMedia } from "./controllers/movies";
import { createCast, deleteCast, fetchAllActors, getUniqueCast, updateCast} from './controllers/cast';
import { createGenre, deleteGenre, fetchAllGenres, getUniqueGenre, updateGenre } from './controllers/genre';
import { createReview, deleteReview, fetchAllReviews, getUniqueReview, updateReview } from './controllers/reviews';
import { MediaType } from '@prisma/client'
import { createEpisode, updateEpisode } from './controllers/episodes';

const prisma = new PrismaClient();


const app = new Elysia()
  .use(swagger({
    path: '/v1/swagger',
    documentation: {
      info: {
          title: 'IMDBFlix API Documentation',
          version: '1.0.0'
      }
    },
    
  }))
  .group('/search', {
    query: t.Object({
      q: t.String()
    })
  }, (app) => {
    return app
      .get('/search', ({ query }) => `query: ${query.q}`)
      .get('/search/movie', ({ query }) => `query: ${query.q}`)
      .get('/search/tv', ({ query }) => `query: ${query.q}`)
      .get('/search/person', ({ query }) => `query: ${query.q}`)
      .get('/search/company', ({ query }) => `query: ${query.q}`)
      .get('/search/episode', ({ query }) => `query: ${query.q}`)
      .get('/search/review', ({ query }) => `query: ${query.q}`)
      .get('/search/award', ({ query }) => `query: ${query.q}`)
  })
  .group('/title/:id', {
    params: t.Object({
      id: t.Number()
    })
  }, (app) => {
    return app
      .get('/', ({params}) => `id: ${params.id}`)
      .get('/episodes', ({params}) => `id: ${params.id}`)
      .get('/cast', ({params}) => `id: ${params.id}`)
      .get('/reviews', ({params}) => `id: ${params.id}`)
  })
  .group('/media', (app) => {
    return app
    .post('/create', 
      async ({ body }) => {
        const result = await createMedia({ body });
        return {
          status: result.status,
          body: result.body
        }
      },
      {
        body: t.Object({
          title: t.String(),
          year: t.Number(),
          poster: t.String(),
          cast: t.Array(t.Number()),
          genres: t.Array(t.Number()),
          type: t.Enum(MediaType)
        }),
      }
    )
    .post('/create/tv', 
      async ({ body }) => {
        const result = await createMedia({ body });
        return {
          status: result.status,
          body: result.body
        }
      },
      {
        body: t.Object({
          title: t.String(),
          year: t.Number(),
          poster: t.String(),
          cast: t.Array(t.Number()),
          genres: t.Array(t.Number()),
          episodes: t.Array(t.Number()),
          startYear: t.Number(),
          endYear: t.Number(),
          seasons: t.Number(),
          type: t.Enum(MediaType)
        }),
      }
    )
    .put('/:id/update', 
      async ({ body, params }) => {
        const { id } = params;
        const updateRequest = {
          body,
          params: { id: Number(id) }
        };
        const result = await updateMedia(updateRequest);
        return {
          status: result.status,
          body: result.body,
        };
      },
      {
        body: t.Object({
          title: t.String(),
          year: t.Number(),
          poster: t.String(),
          cast: t.Array(t.Number()),
          genres: t.Array(t.Number()),
          episodes: t.Array(t.Number()),
          startYear: t.Number(),
          endYear: t.Number(),
          seasons: t.Number(),
          type: t.Enum(MediaType)
        }),
      }
    )
    .delete('/:id/delete', 
      async ({ params }) => {
        const { id } = params
        const deleteMovieRequest = {
          params: { id: Number(id) }
        }

        const result = await deleteMovie(deleteMovieRequest)
        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/', 
      async () => {
        const result = await fetchAllMedia()

        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/:id', 
      async ({params}) => {
        const { id } = params
        const fetchMovieRequest = {
          params: { id: Number(id) }
        }
        const result = await getUniqueMovie(fetchMovieRequest)

        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/mediaType/:type', 
      async ({params}) => {
        const { type } = params;
        const mediaType: MediaType = type as MediaType;
        const fetchMovieRequest: { params: { type: MediaType } } = {
          params: { type: mediaType },
        };
        const result = await getMediaBasedOnType(fetchMovieRequest);

        return {
          status: result.status,
          body: result.body,
        };
      }
    )
  })
  .group('/cast', (app) => {
    return app
    .post('/create', 
      async ({ body }) => {
        const result = await createCast({ body });
        return {
          status: result.status,
          body: result.body
        }
      },
      {
        body: t.Object({
          name: t.String(),
          age: t.Number(),
          bio: t.String(),
        }),
      }
    )
    .put('/:id/update', 
      async ({ body, params }) => {
        const { id } = params;
        const updateRequest = {
          body,
          params: { id: Number(id) }
        };
        const result = await updateCast(updateRequest);
        return {
          status: result.status,
          body: result.body,
        };
      },
      {
        body: t.Object({
          name: t.String(),
          age: t.Number(),
          bio: t.String(),
        }),
      }
    )
    .delete('/:id/delete', 
      async ({ params }) => {
        const { id } = params
        const deleteCastRequest = {
          params: { id: Number(id) }
        }

        const result = await deleteCast(deleteCastRequest)
        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/', 
      async () => {
        const result = await fetchAllActors()

        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/:id', 
      async ({params}) => {
        const { id } = params
        const fetchCastParams = {
          params: { id: Number(id) }
        }
        const result = await getUniqueCast(fetchCastParams)

        return {
          status: result.status,
          body: result.body
        }
      }
    )
  })
  .group('/genres', (app) => {
    return app
    .post('/create',
      async ({ body }) => {
        const result = await createGenre({ body })
        return {
          status: result.status,
          body: result.body
        }
      },
      {
        body: t.Object({
          title: t.String(),
        })
      }
    )
    .put('/:id/update',
      async ({body, params}) => {
        const { id } = params;
        const updateRequest = {
          body,
          params: { id: Number(id) }
        };
        const result = await updateGenre(updateRequest);
        return {
          status: result.status,
          body: result.body,
        };
      },
      {
        body: t.Object({
          title: t.String(),
        })
      }
    )
    .delete('/:id/delete',
      async ({ params }) => {
        const { id } = params
        const deletedGenre = {
          params: { id: Number(id) }
        }

        const result = await deleteGenre(deletedGenre)

        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/',
      async () => {
        const result = await fetchAllGenres()

        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/:id',
      async ({ params }) => {
        const { id } = params

        const fetchGenreParams = {
          params: { id: Number(id) }
        }

        const result = await getUniqueGenre(fetchGenreParams)

        return {
          status: result.status,
          body: result.body
        }
      }
    )
  })
  .group('/reviews', (app) => {
    return app
    .post('/create',
      async ({ body }) => {
        const result = await createReview({ body })
        
        return {
          status: result.status,
          body: result.body
        }
      },
      {
        body: t.Object({
          comment: t.String(),
          mediaId: t.Number() 
        })
      }
    )
    .put('/:id/update',
      async ({body, params}) => {
        const { id } = params;
        const updateRequest = {
          body,
          params: { id: Number(id) }
        };
        const result = await updateReview(updateRequest);
        return {
          status: result.status,
          body: result.body,
        };
      },
      {
        body: t.Object({
          comment: t.String(),
        })
      }
    )
    .delete('/:id/delete',
      async ({ params }) => {
        const { id } = params
        const deletedReview = {
          params: { id: Number(id) }
        }

        const result = await deleteReview(deletedReview)

        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/movie/:mediaId/reviews',
      async ({ params }) => {
        const { mediaId } = params

        const fetchReviewsParams = {
          params: { mediaId: Number(mediaId) }
        }

        const result = await fetchAllReviews(fetchReviewsParams)

        return {
          status: result.status,
          body: result.body
        }
      }
    )
    .get('/:id',
      async ({ params }) => {
        const { id } = params

        const fetchReviewsParams = {
          params: { id: Number(id) }
        }

        const result = await getUniqueReview(fetchReviewsParams)

        return {
          status: result.status,
          body: result.body
        }
      }
    )
  })
  .group('/episodes', (app) => {
    return app
    .post('/create',
      async ({ body }) => {
        const result = await createEpisode({ body })
        
        return {
          status: result.status,
          body: result.body
        }
      },
      {
        body: t.Object({
          title: t.String(),
          year: t.Number(),
          mediaId: t.Number() 
        })
      }
    )
    .put('/:id/update',
      async ({body, params}) => {
        const { id } = params;
        const updateRequest = {
          body,
          params: { id: Number(id) }
        };
        const result = await updateEpisode(updateRequest);
        return {
          status: result.status,
          body: result.body,
        };
      },
      {
        body: t.Object({
          title: t.String(),
          year: t.Number(),
          mediaId: t.Number()
        })
      }
    )
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

process.on('beforeExit', () => {
  prisma.$disconnect();
});
