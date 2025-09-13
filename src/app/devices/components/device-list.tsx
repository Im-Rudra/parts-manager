import { ScrollArea } from '@/components/ui/scroll-area';
import { Device } from '@/lib/db/schema/schema';
import { DeviceCard } from './device-card';

interface Props {
  devices: Device[];
}

export default function DeviceList({ devices: devices }: Props) {
  return (
    <div>
      {devices.length ? (
        <ScrollArea className="w-full h-[calc(100vh-216px)]">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {devices.length > 0 &&
              devices.map((device) => <DeviceCard key={device.id} device={device} />)}
          </section>
        </ScrollArea>
      ) : (
        <h2 className="text-2xl text-center font-bold mt-4">No device found</h2>
      )}
    </div>
  );
}
