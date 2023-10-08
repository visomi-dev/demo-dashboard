import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

const { parsed } = config();

const connectionString = parsed?.DATABASE_URL;

if (connectionString == null) {
  throw new Error('Missing DATABASE_URL environment variable');
}

export default {
  out: './src/server/app/db/drizzle',
  schema: './src/server/app/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
