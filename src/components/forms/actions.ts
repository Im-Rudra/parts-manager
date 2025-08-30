'use server';

import db from '@/lib/db';
import { brands } from '@/lib/db/schema/schema';
import { NewBrand } from './new-brand-form';

export async function createBrand(brand: NewBrand) {
  return await db.insert(brands).values(brand).returning();
}
