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
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createCategory } from './actions';
import { paths } from '@/lib/constants';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Category name must be at least 2 characters.'
    })
    .max(50, {
      message: 'Category name must be at most 50 characters.'
    })
    .trim(),
  description: z.string().trim()
});

export type NewCategory = z.infer<typeof formSchema>;

export default function NewCategoryForm() {
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
      const category = await createCategory(values);
      console.log('category', category);
      toast.success(`New category created: "${category[0].name}"`);
      router.push(paths.categories);
    } catch (error: any) {
      console.error('Form submission error', error.message);
      toast.error('Failed to create category.', error.message);
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
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the category name" type="text" {...field} />
              </FormControl>
              <FormDescription>Name of the category</FormDescription>
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
                  placeholder="Enter category description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Describe the category you want to add</FormDescription>
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
