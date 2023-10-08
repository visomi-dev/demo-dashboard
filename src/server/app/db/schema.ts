import { sql } from 'drizzle-orm';
import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),
  },
  (users) => ({
    usernameIdx: index('username_idx').on(users.username),
  }),
);
