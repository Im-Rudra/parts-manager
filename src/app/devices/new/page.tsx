import NewDeviceForm from '@/components/forms/new-device-form';
import { buttonVariants } from '@/components/ui/button';
import { paths } from '@/lib/constants';
import db from '@/lib/db';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewDevice() {
  const categoryList = await db.query.categories.findMany();
  const brandList = await db.query.brands.findMany();
  return (
    <div className="gap-4 max-w-96 mx-auto">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Create New device</h1>
        <Link
          href={paths.devices}
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
        >
          <ChevronLeft />
        </Link>
      </div>
      <NewDeviceForm categoryList={categoryList} brandList={brandList} />
    </div>
  );
}
