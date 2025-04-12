import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { CourseSectionTable } from "./courseSection";

export const lessonStatuses = ["public", "private", "preview"] as const;
export type LessonStatuses = (typeof lessonStatuses)[number];
export const lessonSTatusEnum = pgEnum("lesson_status", lessonStatuses);

export const LessonTable = pgTable("lessons", {
  id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonSTatusEnum().notNull().default("private"),
  sectionId: uuid()
    .notNull()
    .references(() => CourseSectionTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const LessonRelathionships = relations(LessonTable, ({ one }) => ({
  section: one(CourseSectionTable, {
    //each lesson belongs to ONE section
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id],
  }),
}));
