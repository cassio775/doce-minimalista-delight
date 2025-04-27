
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().positive("Preço deve ser maior que zero"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image_url: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const ProductFormFields = ({ form }: ProductFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-cocoa-700">Nome do Produto</FormLabel>
            <FormControl>
              <Input 
                placeholder="Digite o nome do produto" 
                className="border-cocoa-200 focus-visible:ring-cocoa-500" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-cocoa-700">Preço (R$)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01"
                min="0"
                placeholder="0,00" 
                className="border-cocoa-200 focus-visible:ring-cocoa-500" 
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-cocoa-700">Descrição</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descreva o produto" 
                className="border-cocoa-200 focus-visible:ring-cocoa-500 min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { formSchema };
export type { FormValues };
