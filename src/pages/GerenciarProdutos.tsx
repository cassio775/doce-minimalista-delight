
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Trash2, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';

interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image_url?: string;
}

const GerenciarProdutos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: '',
    price: 0,
    description: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setProducts(data || []);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Erro no upload da imagem",
        description: uploadError.message,
        variant: "destructive"
      });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = currentProduct.image_url;
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
    }

    const productData = {
      ...currentProduct,
      image_url: imageUrl
    };

    const { error } = currentProduct.id
      ? await supabase
          .from('products')
          .update(productData)
          .eq('id', currentProduct.id)
      : await supabase.from('products').insert(productData);

    if (error) {
      toast({
        title: "Erro ao salvar produto",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Produto salvo com sucesso",
        description: currentProduct.id ? "Produto atualizado" : "Novo produto criado"
      });
      fetchProducts();
      setCurrentProduct({ name: '', price: 0, description: '' });
      setSelectedImage(null);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({
        title: "Erro ao excluir produto",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({ title: "Produto excluído com sucesso" });
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Produtos</h1>
        
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4">
          <Input
            placeholder="Nome do Produto"
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
            required
          />
          <Input
            type="number"
            placeholder="Preço"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
            step="0.01"
            required
          />
          <Textarea
            placeholder="Descrição"
            value={currentProduct.description}
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
          </div>
          <Button type="submit">{currentProduct.id ? 'Atualizar' : 'Adicionar'} Produto</Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(product)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(product.id!)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default GerenciarProdutos;
