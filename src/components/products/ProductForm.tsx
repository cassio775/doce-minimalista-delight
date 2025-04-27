
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct, updateProduct, uploadProductImage, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Trash2 } from 'lucide-react';

interface ProductFormProps {
  initialProduct?: Product;
  onSuccess: () => void;
}

const ProductForm = ({ initialProduct, onSuccess }: ProductFormProps) => {
  const [productData, setProductData] = useState<Omit<Product, 'id'>>({
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData(prev => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setProductData(prev => ({ ...prev, image_url: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!productData.name || !productData.description || productData.price <= 0) {
        toast({
          title: "Erro de Validação",
          description: "Por favor, preencha todos os campos obrigatórios corretamente.",
          variant: "destructive"
        });
        return;
      }
      
      let imageUrl = productData.image_url;
      
      if (selectedImage) {
        imageUrl = await uploadProductImage(selectedImage);
      }

      const finalProductData = {
        ...productData,
        image_url: imageUrl,
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
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-cocoa-700">
          {initialProduct?.id ? 'Editar Produto' : 'Novo Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Nome do Produto</label>
            <Input
              id="name"
              value={productData.name}
              onChange={(e) => setProductData({...productData, name: e.target.value})}
              required
              placeholder="Digite o nome do produto"
              className="border-cocoa-200 focus:ring-cocoa-500"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-muted-foreground mb-2">Preço</label>
            <Input
              id="price"
              type="number"
              value={productData.price}
              onChange={(e) => setProductData({...productData, price: parseFloat(e.target.value)})}
              required
              placeholder="Preço do produto"
              step="0.01"
              min="0"
              className="border-cocoa-200 focus:ring-cocoa-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-2">Descrição</label>
            <Textarea
              id="description"
              value={productData.description}
              onChange={(e) => setProductData({...productData, description: e.target.value})}
              required
              placeholder="Descreva o produto"
              rows={4}
              className="border-cocoa-200 focus:ring-cocoa-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Imagem do Produto</label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label 
                htmlFor="image" 
                className="flex items-center gap-2 px-4 py-2 border border-cocoa-300 rounded-md cursor-pointer hover:bg-cocoa-50 transition"
              >
                <ImagePlus size={20} className="text-cocoa-700" />
                Selecionar Imagem
              </label>
              {(selectedImage || productData.image_url) && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="icon" 
                  onClick={handleRemoveImage}
                  title="Remover Imagem"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
            
            {(selectedImage || productData.image_url) && (
              <div className="mt-4">
                <img 
                  src={selectedImage ? URL.createObjectURL(selectedImage) : productData.image_url} 
                  alt="Imagem do produto" 
                  className="max-w-full h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-cocoa-700 hover:bg-cocoa-800 transition"
          >
            {initialProduct?.id ? 'Atualizar Produto' : 'Cadastrar Produto'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
