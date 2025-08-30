import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import db from '@/lib/db';
import { brands } from '@/lib/db/schema/schema';
import { Building2 } from 'lucide-react';
import Link from 'next/link';

export default async function Homepage() {
  const brandCount = await db.$count(brands);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Link prefetch href="/brands">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Building2 className="mr-2 w-5 h-5" />
              <h2 className="text-xl font-semibold">Brands</h2>
            </div>
          </CardHeader>
          <CardContent className="-mt-3">
            <h2 className="text-base">Total Brands: {brandCount}</h2>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
