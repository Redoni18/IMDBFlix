import { PrismaClient } from '@prisma/client';
import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { createMovie, deleteMovie, fetchAllMovies, updateMovie } from "./controllers/movies";

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
  .post(
    '/movies/create',
    async ({ body }) => {
      const result = await createMovie({ body });
      return {
        status: result.status,
        body: result.body
      }
    }, {
      body: t.Object({
        title: t.String(),
        year: t.Number(),
        // genreIds: t.Array(t.Number()),
        poster: t.String(),
        // castIds: t.Array(t.Number()),
        // reviewIds: t.Array(t.Number()),
      }),
    }
  )
  .put('/movies/:id/update',
    async ({ body, params }) => {
      const { id } = params;
      const updateRequest = {
        body,
        params: { id: parseInt(id) }
      };
      const result = await updateMovie(updateRequest);
      return {
        status: result.status,
        body: result.body,
      };
    }, {
      body: t.Object({
        title: t.String(),
        year: t.Number(),
        // genreIds: t.Array(t.Number()),
        poster: t.String(),
        // castIds: t.Array(t.Number()),
        // reviewIds: t.Array(t.Number()),
      }),
    }
  )
  .delete('/movies/:id/delete',
    async ({ params }) => {
      const { id } = params
      const deleteMovieRequest = {
        params: { id: parseInt(id) }
      }

      const result = await deleteMovie(deleteMovieRequest)
      return {
        status: result.status,
        body: result.body
      }
    }
  )
  .get('/movies', 
    async () => {
      const result = await fetchAllMovies()

      return {
        status: result.status,
        body: result.body
      }
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

process.on('beforeExit', () => {
  prisma.$disconnect();
});
