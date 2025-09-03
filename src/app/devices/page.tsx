import NewDeviceForm from '@/components/forms/new-device-form';
import db from '@/lib/db';

export default async function Devices() {
  const brandList = await db.query.brands.findMany();
  const categoryList = await db.query.categories.findMany();
  return (
    <div>
      <NewDeviceForm brandList={brandList} categoryList={categoryList} />
    </div>
  );
}
