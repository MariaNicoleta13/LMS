import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";

export const useRoles = ["user", "admin"] as const;
export type UserRole = (typeof useRoles)[number];
export const userRoleEnum = pgEnum("user_role", useRoles);

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAd: timestamp({ withTimezone: true }), //keep the user field while deleting other fields to keep track how many got the course
  createdAt,
  updatedAt,
});

export const CourseRelathionships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
}));
