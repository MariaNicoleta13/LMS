import { text, timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const name = text().notNull();
export const createdAt = timestamp({ withTimezone: true }) //user time not server time
  .notNull()
  .defaultNow();

export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
