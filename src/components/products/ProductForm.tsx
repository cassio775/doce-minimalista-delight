
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct, updateProduct, uploadProductImage, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Trash2, Upload, AlertTriangle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
  initialProduct?: Product;
  onSuccess: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().positive("Preço deve ser maior que zero"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image_url: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = ({ initialProduct, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialProduct?.image_url || null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialProduct?.name || "",
      price: initialProduct?.price || 0,
      description: initialProduct?.description || "",
      image_url: initialProduct?.image_url || ""
    }
  });

  useEffect(() => {
    if (initialProduct) {
      form.reset({
        name: initialProduct.name,
        price: initialProduct.price,
        description: initialProduct.description,
        image_url: initialProduct.image_url || ""
      });
      setPreviewUrl(initialProduct.image_url || null);
    }
  }, [initialProduct, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    form.setValue("image_url", "");
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Dados do formulário antes do envio:", values);
      
      let imageUrl = values.image_url || "";
      
      if (selectedImage) {
        console.log("Enviando imagem para upload...");
        try {
          imageUrl = await uploadProductImage(selectedImage);
          console.log("URL da imagem após upload:", imageUrl);
        } catch (error) {
          console.error("Erro no upload da imagem:", error);
          toast({
            title: "Erro no upload da imagem",
            description: String(error),
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Fix for the TypeScript error - ensure all required properties are present
      const productData: Omit<Product, 'id'> = {
        name: values.name,
        price: values.price,
        description: values.description,
        image_url: imageUrl
      };
      
      console.log("Dados do produto a serem salvos:", productData);

      if (initialProduct?.id) {
        await updateProduct(initialProduct.id, productData);
        toast({ 
          title: "Produto atualizado com sucesso!",
          variant: "default" 
        });
      } else {
        await createProduct(productData);
        toast({ 
          title: "Produto criado com sucesso!",
          variant: "default" 
        });
      }

      // Limpa o formulário
      form.reset({
        name: "",
        price: 0,
        description: "",
        image_url: ""
      });
      setSelectedImage(null);
      setPreviewUrl(null);

      // Chama callback de sucesso
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast({
        title: "Erro ao salvar produto",
        description: String(error),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-cocoa-200">
      <CardHeader className="bg-cocoa-50 border-b border-cocoa-100">
        <CardTitle className="text-xl font-bold text-cocoa-800">
          {initialProduct?.id ? 'Editar Produto' : 'Novo Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="space-y-3">
              <FormLabel className="text-cocoa-700 block">Imagem do Produto</FormLabel>
              <div className="flex items-center gap-3">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label 
                  htmlFor="image" 
                  className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-cocoa-100 hover:bg-cocoa-200 transition text-cocoa-800"
                >
                  <Upload size={18} className="text-cocoa-700" />
                  Selecionar Imagem
                </label>
                {previewUrl && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleRemoveImage}
                    title="Remover Imagem"
                  >
                    <Trash2 size={16} />
                    <span className="ml-1">Remover</span>
                  </Button>
                )}
              </div>
              
              {previewUrl ? (
                <div className="mt-4 rounded-md overflow-hidden border border-cocoa-200">
                  <img 
                    src={previewUrl} 
                    alt="Prévia da imagem" 
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 mt-2">
                  <AlertTriangle size={16} />
                  <span className="text-sm">Imagem não selecionada</span>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cocoa-700 hover:bg-cocoa-800 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : (initialProduct?.id ? 'Atualizar Produto' : 'Cadastrar Produto')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
