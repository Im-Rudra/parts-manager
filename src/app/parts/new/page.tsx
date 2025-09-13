import NewPartForm from '@/components/forms/new-part-form';
import { buttonVariants } from '@/components/ui/button';
import { paths } from '@/lib/constants';
import db from '@/lib/db';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CreatePart() {
  const partsTypes = await db.query.partsTypes.findMany();
  return (
    <div className="gap-4 max-w-96 mx-auto">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Create Part</h1>
        <Link href={paths.parts} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
          <ChevronLeft />
        </Link>
      </div>
      <NewPartForm partsTypeList={partsTypes} />
    </div>
  );
}
