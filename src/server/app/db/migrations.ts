import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { config } from 'dotenv';

config();

const connectionString = process.env.DATABASE_URL;

if (connectionString == null) {
  throw new Error('Missing DATABASE_URL environment variable');
}

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'src/server/app/db/drizzle' });
