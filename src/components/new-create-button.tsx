import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CirclePlus } from 'lucide-react';
import Link, { LinkProps } from 'next/link';

interface NewBrandButtonProps extends LinkProps {
  href: string;
  className?: string;
  creationType: string;
}

export default function NewCreateButton({
  href,
  className,
  creationType,
  ...props
}: NewBrandButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          {...props}
          href={href || '#'}
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), className)}
        >
          <CirclePlus className="w-5 h-5" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="top">Create a new {creationType}</TooltipContent>
    </Tooltip>
  );
}
