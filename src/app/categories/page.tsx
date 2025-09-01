import NewCreateButton from '@/components/new-create-button';
import { paths, SearchKeys } from '@/lib/constants';
import db from '@/lib/db';
import CategoryList from './components/category-list';
import Search from '@/components/search';
import { categories } from '@/lib/db/schema/schema';
import { Badge } from '@/components/ui/badge';

type SearchQuery = {
  search: string;
};

interface Props {
  searchParams: Promise<SearchQuery>;
}

export default async function Categories({ searchParams }: Props) {
  const { search } = await searchParams;
  const categoryCount = await db.$count(categories);
  const categoryList = await db.query.categories.findMany({
    where: search ? (category, op) => op.like(category.name, `%${search}%`) : undefined
  });
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="flex items-center gap-2">
        <h1 className="text-center text-2xl font-semibold flex items-center">
          <span>Categories</span>
          {categoryCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-blue-500 text-white dark:bg-blue-600">
              {categoryCount}
            </Badge>
          )}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center justify-between gap-3">
          <Search searchKey={SearchKeys.CATEGORY} searchQuery={search} />
          <NewCreateButton creationType="category" href={paths.newCategory} />
        </div>
      </div>
      <CategoryList categories={categoryList} />
    </div>
  );
}
