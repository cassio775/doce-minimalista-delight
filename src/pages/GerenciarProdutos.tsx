
import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { fetchAllProducts, Product } from "@/services/productService";
import ProductForm from "@/components/products/ProductForm";
import ProductsTable from "@/components/products/ProductsTable";

const GerenciarProdutos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { toast } = useToast();

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

  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductSuccess = () => {
    loadProducts();
    setEditingProduct(undefined);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Produtos</h1>
        <ProductForm 
          initialProduct={editingProduct} 
          onSuccess={handleProductSuccess}
        />
        <ProductsTable 
          products={products}
          onEdit={handleEdit}
          onDelete={loadProducts}
        />
      </div>
    </Layout>
  );
};

export default GerenciarProdutos;
