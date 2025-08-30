import { buttonVariants } from '@/components/ui/button';
import db from '@/lib/db';
import { cn } from '@/lib/utils';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import BrandList from './brand-list';

export default async function Brands() {
  const brandList = await db.query.brands.findMany({
    orderBy: (brand, op) => op.asc(brand.name)
  });
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="flex items-center gap-2">
        <h1 className="text-center text-2xl font-semibold">Brands({brandList.length})</h1>
        <Link
          href="/create-brand"
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
        >
          <CirclePlus className="w-5 h-5" />
        </Link>
      </div>
      <BrandList brands={brandList} />
    </div>
  );
}
