import NewCreateButton from '@/components/new-create-button';
import { Badge } from '@/components/ui/badge';
import { paths, SearchKeys } from '@/lib/constants';
import db from '@/lib/db';
import { parts } from '@/lib/db/schema/schema';
import PartsList from './components/parts-list';
import Search from '../../components/search';

type SearchQuery = {
  search: string;
};

interface Props {
  searchParams: Promise<SearchQuery>;
}

export default async function Parts({ searchParams }: Props) {
  const { search } = await searchParams;
  const partsCount = await db.$count(parts);
  const partsList = await db.query.parts.findMany({
    orderBy: (part, op) => op.asc(part.name),
    where: search ? (part, op) => op.like(part.name, `%${search}%`) : undefined
  });
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="flex items-center gap-2">
        <h1 className="text-center text-2xl font-semibold flex items-center">
          <span>Parts</span>
          {partsCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-blue-500 text-white dark:bg-blue-600">
              {partsCount}
            </Badge>
          )}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center justify-between gap-3">
          <Search searchKey={SearchKeys.PART} searchQuery={search} />
          <NewCreateButton creationType="part" href={paths.newPart} />
        </div>
      </div>
      <PartsList parts={partsList} />
    </div>
  );
}
