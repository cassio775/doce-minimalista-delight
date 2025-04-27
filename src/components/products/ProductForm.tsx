
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Product, createProduct, updateProduct, uploadProductImage } from "@/services/productService";

interface ProductFormProps {
  initialProduct?: Partial<Product>;
  onSuccess: () => void;
}

const ProductForm = ({ initialProduct, onSuccess }: ProductFormProps) => {
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>(
    initialProduct || {
      name: '',
      price: 0,
      description: ''
    }
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = currentProduct.image_url;
      if (selectedImage) {
        imageUrl = await uploadProductImage(selectedImage);
      }

      const productData = {
        name: currentProduct.name || '',
        price: currentProduct.price || 0,
        description: currentProduct.description || '',
        image_url: imageUrl || ''
      };

      if (currentProduct.id) {
        await updateProduct(currentProduct.id, productData);
        toast({
          title: "Produto atualizado com sucesso"
        });
      } else {
        await createProduct(productData);
        toast({
          title: "Produto criado com sucesso"
        });
      }

      onSuccess();
      setCurrentProduct({ name: '', price: 0, description: '' });
      setSelectedImage(null);
    } catch (error: any) {
      toast({
        title: "Erro ao salvar produto",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid gap-4">
      <Input
        placeholder="Nome do Produto"
        value={currentProduct.name || ''}
        onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
        required
      />
      <Input
        type="number"
        placeholder="Preço"
        value={currentProduct.price || 0}
        onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
        step="0.01"
        required
      />
      <Textarea
        placeholder="Descrição"
        value={currentProduct.description || ''}
        onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
        required
      />
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {selectedImage && <p>Imagem selecionada: {selectedImage.name}</p>}
        {currentProduct.image_url && !selectedImage && (
          <div className="mt-2">
            <p>Imagem atual:</p>
            <img 
              src={currentProduct.image_url} 
              alt="Imagem atual" 
              className="w-40 h-40 object-cover mt-1"
            />
          </div>
        )}
      </div>
      <Button type="submit">
        <Upload size={16} className="mr-2" />
        {currentProduct.id ? 'Atualizar' : 'Adicionar'} Produto
      </Button>
    </form>
  );
};

export default ProductForm;
