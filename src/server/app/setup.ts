import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';

const secret = process.env.SESSION_SECRET;

if (secret == null) {
  throw new Error('SESSION_SECRET is not defined');
}

export const setup = new Elysia().use(
  jwt({
    name: 'jwt',
    secret,
  }),
);
