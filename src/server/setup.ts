import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';

export const setup = new Elysia().use(
  jwt({
    name: 'jwt',
    secret: import.meta.env.SECRET,
  }),
);
