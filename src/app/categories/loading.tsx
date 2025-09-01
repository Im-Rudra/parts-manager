import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="text-center text-2xl font-bold">
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-full h-40 rounded border-2 p-4">
            <Skeleton className="h-6 w-40"></Skeleton>
            <Skeleton className="h-4 w-20 mt-3"></Skeleton>
            <Skeleton className="h-3 w-full mt-6"></Skeleton>
            <Skeleton className="h-3 w-3/4 mt-2"></Skeleton>
          </div>
        ))}
      </section>
    </div>
  );
}
