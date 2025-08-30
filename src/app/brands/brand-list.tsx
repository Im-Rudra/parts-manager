"use client";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brand } from '@/lib/db/schema/schema';
import { BrandCard } from './brand-card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function BrandList({ brands }: { brands: Brand[] }) {
  const [search, setSearch] = useState<string>('');
  const searchedBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Input
        placeholder="Search brand..."
        className="mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <ScrollArea className="w-full h-[calc(100vh-216px)]">
        {searchedBrands.length === 0 && (
          <h2 className="text-2xl text-center font-bold mt-4">No brands found</h2>
        )}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {searchedBrands.length > 0 &&
            searchedBrands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
        </section>
      </ScrollArea>
    </div>
  );
}
