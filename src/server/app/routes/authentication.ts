import Elysia, { t } from 'elysia';

import { setup } from '../setup';

import { db } from '../db/client';
import { users } from '../db/schema';

export const authentication = new Elysia({
  prefix: '/api/auth',
})
  .use(setup)
  .post(
    '/sign-up',
    async ({ jwt, body }) => {
      const { username, password } = body;

      const hash = await Bun.password.hash(password);

      const [user] = await db
        .insert(users)
        .values({
          username,
          password: hash,
        })
        .returning();

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
              error: 'INVALID_USER',
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
        error: t.Optional(
          t.String({
            enum: ['INVALID_USER'],
          }),
        ),
      }),
    },
  )
  .post(
    '/sign-in',
    async ({ jwt, body }) => {
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, body.username),
      });

      if (user == null) {
        throw new Error('INVALID_USER');
      }

      const valid = await Bun.password.verify(body.password, user.password);

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
      error: () => {
        return {
          error: 'INVALID_USER',
        };
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
        error: t.Optional(
          t.String({
            enum: ['INVALID_USER'],
          }),
        ),
      }),
    },
  )
  .get(
    '/me',
    async ({ jwt, headers }) => {
      const token = headers.authorization?.split(' ')[1];

      if (token == null) {
        throw new Error('INVALID_TOKEN');
      }

      const verified = await jwt.verify(token);

      if (verified === false || verified?.sub == null) {
        throw new Error('INVALID_TOKEN');
      }

      const user = await db.query.users.findFirst({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        where: (users, { eq }) => eq(users.id, verified.sub!),
      });

      if (user == null) {
        throw new Error('INVALID_TOKEN');
      }

      const newToken = await jwt.sign({ sub: user.id });

      return {
        id: user.id,
        username: user.username,
        token: newToken,
      };
    },
    {
      error: () => {
        return {
          error: 'INVALID_TOKEN',
        };
      },
      response: t.Object({
        id: t.String(),
        username: t.String(),
        token: t.String(),
        error: t.Optional(
          t.String({
            enum: ['INVALID_TOKEN'],
          }),
        ),
      }),
    },
  );
