import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

import { setup } from './setup';
import { authentication } from './routes/authentication';

const app = new Elysia()
  .use(setup)
  .use(swagger())
  .use(authentication)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
