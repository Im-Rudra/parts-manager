import { parts } from '@/lib/db/schema/schema';

interface Props {
  parts: typeof parts.$inferSelect[];
}

export default function PartsList({ parts }: Props) {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.id}>{part.name}</div>
      ))}
    </div>
  );
}
