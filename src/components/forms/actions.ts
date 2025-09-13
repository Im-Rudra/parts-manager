'use server';

import db from '@/lib/db';
import { brands, categories, partsTypes } from '@/lib/db/schema/schema';
import { NewBrand } from './new-brand-form';
import { NewCategory } from './new-category-form';

export async function createBrand(brand: NewBrand) {
  return await db.insert(brands).values(brand).returning();
}

export async function createCategory(category: NewCategory) {
  return await db.insert(categories).values(category).returning();
}

export async function createPartsTypes(partsType: NewCategory) {
  const newPartsTypes = await db.insert(partsTypes).values(partsType).returning();
  return newPartsTypes[0];
}


