import { ScrollArea } from '@/components/ui/scroll-area';
import { PartsType } from '@/lib/db/schema/schema';
import { PartsTypeCard } from './parts-type-card';

interface Props {
  partsTypes: PartsType[];
}

export default function PartsTypeList({ partsTypes }: Props) {
  return (
    <div>
      {partsTypes.length ? (
        <ScrollArea className="w-full h-[calc(100vh-216px)]">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {partsTypes.length > 0 &&
              partsTypes.map((pt) => <PartsTypeCard key={pt.id} partsType={pt} />)}
          </section>
        </ScrollArea>
      ) : (
        <h2 className="text-2xl text-center font-bold mt-4">No parts type found</h2>
      )}
    </div>
  );
}
