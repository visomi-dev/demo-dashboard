import Elysia, { t } from 'elysia';

import db from '../db/client';
import { setup } from '../setup';

export const authentication = new Elysia()
  .use(setup)
  .post(
    '/sign-up',
    async ({ jwt, body }) => {
      const { username, password } = body;

      const hash = await Bun.password.hash(password);

      const user = await db.user.create({
        data: {
          username,
          password: hash,
        },
      });

      const token = await jwt.sign({ id: user.id });

      return {
        id: user.id,
        username: user.username,
        token,
      };
    },
    {
      error({ code }) {
        switch (code) {
          // Prisma P2002: "Unique constraint failed on the {constraint}"
          case 'P2002' as string:
            return {
              error: 'INVALID_USERNAME',
            };
        }
      },
      body: t.Object({
        username: t.String(),
        password: t.String({
          minLength: 8,
        }),
      }),
      response: t.Object({
        id: t.String(),
        username: t.String(),
        token: t.String(),
      }),
    },
  )
  .post(
    '/sign-in',
    async ({ jwt, body }) => {
      const user = await db.user.findUnique({
        where: {
          username: body.username,
        },
      });

      if (user == null) {
        throw new Error('INVALID_USER');
      }

      const valid = await Bun.password.verify(user.password, body.password);

      if (!valid) {
        throw new Error('INVALID_USER');
      }

      const token = await jwt.sign({ sub: user.id });

      return {
        id: user.id,
        username: user.username,
        token,
      };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String({
          minLength: 8,
        }),
      }),
      response: t.Object({
        id: t.String(),
        username: t.String(),
        token: t.String(),
      }),
      error: () => {
        return {
          error: 'INVALID_USER',
        };
      },
    },
  );
