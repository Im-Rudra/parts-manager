import { ScrollArea } from '@/components/ui/scroll-area';
import { Brand } from '@/lib/db/schema/schema';
import { BrandCard } from './brand-card';

interface Props {
  brands: Brand[];
}

export default function BrandList({ brands }: Props) {
  return (
    <div>
      {brands.length ? (
        <ScrollArea className="w-full h-[calc(100vh-216px)]">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {brands.length > 0 && brands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
          </section>
        </ScrollArea>
      ) : (
        <h2 className="text-2xl text-center font-bold mt-4">No brands found</h2>
      )}
    </div>
  );
}
