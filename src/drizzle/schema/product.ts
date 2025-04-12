import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";

export const productStatuses = ["public", "private"] as const;
export type ProductStatuses = (typeof productStatuses)[number];
export const productSTatusEnum = pgEnum("product_status", productStatuses);

export const ProductTable = pgTable("products", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productSTatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

export const CourseRelathionships = relations(
  ProductTable,
  ({  many }) => ({
    courseProducts:many(CourseProductTable),
  })
);
