import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Brands
export const brands = sqliteTable('brands', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique("Brand name must be unique"),
  country: text().notNull(),
  description: text()
});

export type Brand = typeof brands.$inferSelect;

export const brandRelations = relations(brands, ({ many }) => ({
  devices: many(devices)
}));

export const categories = sqliteTable('categories', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  description: text()
});

export const categoryRelations = relations(categories, ({ many }) => ({
  devices: many(devices)
}));

export const devices = sqliteTable('devices', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  brand: int().references(() => brands.id),
  model: text().notNull().unique(),
  release_year: int().notNull()
});

export const deviceRelations = relations(devices, ({ one, many }) => ({
  brand: one(brands, {
    fields: [devices.brand],
    references: [brands.id]
  }),
  categories: many(deviceToCategories)
}))

export const deviceToCategories = sqliteTable('devices_to_categories', {
  device: int().references(() => devices.id),
  category: int().references(() => categories.id)
});

export const deviceCategoryRelations = relations(deviceToCategories, ({ one }) => ({
  device: one(devices, {
    fields: [deviceToCategories.device],
    references: [devices.id]
  }),
  category: one(categories, {
    fields: [deviceToCategories.category],
    references: [categories.id]
  })
}));