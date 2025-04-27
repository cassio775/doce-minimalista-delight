
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct, updateProduct, uploadProductImage } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/services/productService";

interface ProductFormProps {
  initialProduct?: Partial<Product>;
  onSuccess: () => void;
}

const ProductForm = ({ initialProduct, onSuccess }: ProductFormProps) => {
  const [productData, setProductData] = useState<Partial<Product>>({
    name: initialProduct?.name || '',
    price: initialProduct?.price || 0,
    description: initialProduct?.description || '',
    image_url: initialProduct?.image_url || '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = productData.image_url;
      
      if (selectedImage) {
        imageUrl = await uploadProductImage(selectedImage);
      }

      const finalProductData = {
        ...productData,
        image_url: imageUrl || '',
      };

      if (initialProduct?.id) {
        await updateProduct(initialProduct.id, finalProductData);
        toast({ title: "Produto atualizado com sucesso!" });
      } else {
        await createProduct(finalProductData);
        toast({ title: "Produto criado com sucesso!" });
      }

      // Reset form
      setProductData({
        name: '',
        price: 0,
        description: '',
        image_url: '',
      });
      setSelectedImage(null);

      // Call success callback
      onSuccess();
    } catch (error) {
      toast({
        title: "Erro ao salvar produto",
        description: String(error),
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{initialProduct?.id ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Nome do Produto</label>
            <Input
              id="name"
              value={productData.name}
              onChange={(e) => setProductData({...productData, name: e.target.value})}
              required
              placeholder="Digite o nome do produto"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2">Preço</label>
            <Input
              id="price"
              type="number"
              value={productData.price}
              onChange={(e) => setProductData({...productData, price: parseFloat(e.target.value)})}
              required
              placeholder="Preço do produto"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">Descrição</label>
            <Textarea
              id="description"
              value={productData.description}
              onChange={(e) => setProductData({...productData, description: e.target.value})}
              required
              placeholder="Descreva o produto"
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">Imagem do Produto</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm hover:file:bg-primary/20"
            />
            {selectedImage && (
              <p className="mt-2 text-sm text-muted-foreground">
                Imagem selecionada: {selectedImage.name}
              </p>
            )}
            {productData.image_url && !selectedImage && (
              <img 
                src={productData.image_url} 
                alt="Imagem do produto" 
                className="mt-2 max-w-full h-40 object-cover rounded"
              />
            )}
          </div>

          <Button type="submit" className="w-full">
            {initialProduct?.id ? 'Atualizar Produto' : 'Cadastrar Produto'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
