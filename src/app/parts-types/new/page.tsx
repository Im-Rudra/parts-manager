import NewPartsTypeForm from '@/components/forms/new-parts-type-form';
import { buttonVariants } from '@/components/ui/button';
import { paths } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreatePartsType() {
  return (
    <div className="gap-4 max-w-96 mx-auto">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Create Parts Type</h1>
        <Link href={paths.parts_types} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
          <ChevronLeft />
        </Link>
      </div>
      <NewPartsTypeForm />
    </div>
  );
}
