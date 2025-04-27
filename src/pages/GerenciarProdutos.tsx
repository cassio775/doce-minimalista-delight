
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Trash2, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import { 
  fetchAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  uploadProductImage,
  Product 
} from '@/services/productService';

const GerenciarProdutos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive"
      });
    }
  };

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

      loadProducts();
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

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({ title: "Produto excluído com sucesso" });
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir produto",
        description: error.message,
        variant: "destructive"
      });
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
                      onClick={() => handleDelete(product.id)}
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
