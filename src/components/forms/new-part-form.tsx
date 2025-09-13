"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PartsType } from '@/lib/db/schema/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Part name must be at least 2 characters.'
  }),
  parts_type_id: z.number()
});

interface NewPartFormProps {
  partsTypeList: PartsType[];
}

export default function NewPartForm({ partsTypeList }: NewPartFormProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      parts_type_id: 0
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    setIsSaving(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Part name" {...field} />
              </FormControl>
              <FormDescription>This is the Part name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="parts_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parts Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parts type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {partsTypeList.map((pt) => (
                    <SelectItem key={pt.id} value={pt.id.toString()}>
                      {pt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select the parts type for this part.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="parts_type_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Parts Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? partsTypeList.find((pt) => pt.id === field.value)?.name
                        : 'Select parts-type'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search parts type..." />
                    <CommandList>
                      <CommandEmpty>No parts-type found.</CommandEmpty>
                      <CommandGroup>
                        {partsTypeList.map((pt) => (
                          <CommandItem
                            value={pt.id.toString()}
                            key={pt.id}
                            onSelect={() => {
                              form.setValue('parts_type_id', pt.id);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                pt.id === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {pt.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>The parts type for this part.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
