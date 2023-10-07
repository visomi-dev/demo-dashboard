import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';

import { setup } from './setup';
import { authentication } from './routes/authentication';

const app = new Elysia()
  .use(setup)
  .use(html())
  .use(cors())
  .use(swagger())
  .use(authentication)
  .use(staticPlugin({ assets: 'src/server/public', prefix: '/' }))
  .get('/', async () => await Bun.file('src/server/public/index.html').text())
  .onError(async ({ code, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = 200;
      set.headers = { 'Content-Type': 'text/html' };

      return await Bun.file('src/server/public/index.html').text();
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
