
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct, updateProduct, uploadProductImage, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "./form/ImageUpload";
import { ProductFormFields, formSchema, FormValues } from "./form/ProductFormFields";

interface ProductFormProps {
  initialProduct?: Product;
  onSuccess: () => void;
}

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

      form.reset({
        name: "",
        price: 0,
        description: "",
        image_url: ""
      });
      setSelectedImage(null);
      setPreviewUrl(null);
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
            <ProductFormFields form={form} />
            <ImageUpload 
              previewUrl={previewUrl}
              onImageUpload={handleImageUpload}
              onRemoveImage={handleRemoveImage}
            />
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
