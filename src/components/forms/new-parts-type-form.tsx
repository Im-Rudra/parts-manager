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
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/constants';
import { createPartsTypes } from './actions';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Parts Type name must be at least 2 characters.'
  }),
  description: z.string()
});

export type NewPartsType = z.infer<typeof formSchema>;

export default function NewPartsTypeForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const [creating, setCreating] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setCreating(true);
      const partsType = await createPartsTypes(values);
      toast.success(`New parts-type created: "${partsType.name}"`);
      router.push(paths.parts_types);
    } catch (error: any) {
      console.error('Form submission error', error.message);
      toast.error('Failed to create parts-type.', error.message);
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter parts-type name" {...field} />
              </FormControl>
              <FormDescription>This is the Parts Type name.</FormDescription>
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
                  placeholder="Enter parts-type description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Describe the parts-type you want to add</FormDescription>
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
