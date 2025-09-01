'use client';

import { Input } from '@/components/ui/input';
import { paths, SearchKeys } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface BrandSearchProps extends React.HTMLAttributes<HTMLInputElement> {
  searchQuery: string | undefined;
  searchKey: SearchKeys;
}

export default function Search({ className, searchQuery, searchKey }: BrandSearchProps) {
  const [value, setValue] = useState<string>(searchQuery || '');
  const router = useRouter();

  const setTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (setTimeoutRef.current) {
      clearTimeout(setTimeoutRef.current);
    }
    setTimeoutRef.current = setTimeout(() => {
      const search = value.trim();
      if (!search) {
        router.push(paths[searchKey]);
        return;
      }
      if (search === searchQuery) return;
      router.push(`${paths[searchKey]}?search=${search}`);
    }, 1000);
  }, [value]);
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn(className)}
      placeholder="Search brand..."
    />
  );
}
