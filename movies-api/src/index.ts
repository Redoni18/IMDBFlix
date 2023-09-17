import { Elysia, t } from "elysia";

const app = new Elysia()
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
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
