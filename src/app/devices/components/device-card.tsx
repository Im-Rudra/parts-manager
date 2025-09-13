import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Device } from '@/lib/db/schema/schema';
import { EllipsisVertical } from 'lucide-react';

export function DeviceCard({ device }: { device: Device }) {
  return (
    <Card className="px-4 py-3 rounded-md">
      <CardHeader className="p-0">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">{device.name}</CardTitle>
          <Button className="w-8 h-8 rounded-sm" size="icon" variant="outline">
            <EllipsisVertical className="text-muted-foreground" />
          </Button>
        </div>
        {/* <div className="text-base font-semibold text-muted-foreground flex items-center">
          <span className="text-base">{category.country}</span>
          <Globe className="ml-1 -mt-0.5 w-3.5 h-w-3.5 text-muted-foreground" />
        </div> */}
      </CardHeader>
      <CardContent className="p-0 -mt-2">
        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <p className="text-sm text-muted-foreground line-clamp-2 text-left">{device.model}</p>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-72 text-base">
            {device.model}
            {/* <span className="text-sm text-muted"></span> */}
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
