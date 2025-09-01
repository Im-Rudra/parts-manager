import { ScrollArea } from '@/components/ui/scroll-area';
import { Category } from '@/lib/db/schema/schema';
import { CategoryCard } from './category-card';

interface Props {
  categories: Category[];
}

export default function CategoryList({ categories }: Props) {
  return (
    <div>
      {categories.length ? (
        <ScrollArea className="w-full h-[calc(100vh-216px)]">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.length > 0 && categories.map((category) => <CategoryCard key={category.id} category={category} />)}
          </section>
        </ScrollArea>
      ) : (
        <h2 className="text-2xl text-center font-bold mt-4">No category found</h2>
      )}
    </div>
  );
}
