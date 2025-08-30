import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '@/lib/env.mjs';
import * as schema from '@/lib/db/schema/schema';

export const sqlite = new Database(env.DATABASE_URL);
const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, { schema });

export default db;
