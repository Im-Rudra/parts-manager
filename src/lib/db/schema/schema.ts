import { relations } from 'drizzle-orm';
import { int, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const brands = sqliteTable('brands', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull().unique('Brand name must be unique'),
  country: text().notNull(),
  description: text(),
  created_at: int({ mode: 'timestamp' }).default(new Date())
});

export type Brand = typeof brands.$inferSelect;

export const brandRelations = relations(brands, ({ many }) => ({
  devices: many(devices)
}));

export const categories = sqliteTable('categories', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull().unique(),
  description: text(),
  created_at: int({ mode: 'timestamp' }).default(new Date())
});

export type Category = typeof categories.$inferSelect;

export const categoryRelations = relations(categories, ({ many }) => ({
  devices: many(devices)
}));

export const partsTypes = sqliteTable('parts_types', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull().unique(),
  description: text(),
  created_at: int({ mode: 'timestamp' }).default(new Date())
});

export type PartsType = typeof partsTypes.$inferSelect;

export const partsTypeRelations = relations(partsTypes, ({ many }) => ({
  parts: many(parts)
}));

export const parts = sqliteTable('parts', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 100 }).notNull().unique(),
  description: text(),
  parts_type_id: int().references(() => partsTypes.id, { onDelete: 'set null' }),
  created_at: int({ mode: 'timestamp' }).default(new Date())
});

export const partsRelations = relations(parts, ({ one }) => ({
  parts_type: one(partsTypes, {
    fields: [parts.parts_type_id],
    references: [partsTypes.id]
  })
}));

export const devices = sqliteTable('devices', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 100 }).notNull(),
  brand: int().references(() => brands.id, { onDelete: 'set null' }),
  model: text({ length: 100 }).notNull().unique(),
  release_year: int(),
  created_at: int({ mode: 'timestamp' }).default(new Date())
});

export type Device = typeof devices.$inferSelect;

export const deviceRelations = relations(devices, ({ one, many }) => ({
  brand: one(brands, {
    fields: [devices.brand],
    references: [brands.id]
  }),
  categories: many(deviceToCategories),
  parts: many(deviceToParts)
}));

export const deviceToParts = sqliteTable(
  'devices_to_parts',
  {
    device_id: int().references(() => devices.id, { onDelete: 'cascade' }),
    parts_id: int().references(() => parts.id, { onDelete: 'cascade' }),
    created_at: int({ mode: 'timestamp' }).default(new Date())
  },
  (t) => [primaryKey({ columns: [t.device_id, t.parts_id] })]
);

export const deviceToPartsRelations = relations(deviceToParts, ({ one }) => ({
  device: one(devices, {
    fields: [deviceToParts.device_id],
    references: [devices.id]
  }),
  parts: one(parts, {
    fields: [deviceToParts.parts_id],
    references: [parts.id]
  })
}))

export const deviceToCategories = sqliteTable(
  'devices_to_categories',
  {
    device_id: int().references(() => devices.id, { onDelete: 'cascade' }),
    category_id: int().references(() => categories.id, { onDelete: 'cascade' }),
    created_at: int({ mode: 'timestamp' }).default(new Date())
  },
  (t) => [primaryKey({ columns: [t.device_id, t.category_id] })]
);

export const deviceToCategoriesRelations = relations(deviceToCategories, ({ one }) => ({
  device: one(devices, {
    fields: [deviceToCategories.device_id],
    references: [devices.id]
  }),
  category: one(categories, {
    fields: [deviceToCategories.category_id],
    references: [categories.id]
  })
}));