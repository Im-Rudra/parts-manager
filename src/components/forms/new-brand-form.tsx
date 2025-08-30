'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LocationSelector from '@/components/ui/location-selector';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createBrand } from './actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Brand name must be at least 2 characters.'
    })
    .max(100, {
      message: 'Brand name must be at most 100 characters.'
    }).trim(),
  country: z.string().nonempty({
    message: 'Please select a country.'
  }),
  description: z.string().trim()
});

export type NewBrand = z.infer<typeof formSchema>;

export default function NewBrandForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      country: '',
      description: ''
    }
  });

  const [creating, setCreating] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setCreating(true);
      const brand = await createBrand(values);
      console.log("brand", brand);
      toast.success(`New brand created: "${brand[0].name}"`);
      router.push('/brands');
    } catch (error: any) {
      console.error('Form submission error', error.message);
      toast.error('Failed to create brand.', error.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the brand name" type="text" {...field} />
              </FormControl>
              <FormDescription>Name of the brand</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country Selector</FormLabel>
              {/* <div className="flex w-full gap-2"> */}
              <LocationSelector
                className="w-full"
                onCountryChange={(country) => {
                  form.setValue(field.name, country?.name || '');
                }}
              />
              {/* <Button
                  onClick={() => form.setValue(field.name, '')}
                  type="button"
                  size="icon"
                  variant="outline"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div> */}
              <FormDescription>Select the country where the brand is located</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter brand description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Describe the brand you want to add</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={creating} type="submit">
          Submit
          {creating && <LoaderCircle className="animate-spin ml-2" />}
        </Button>
      </form>
    </Form>
  );
}
