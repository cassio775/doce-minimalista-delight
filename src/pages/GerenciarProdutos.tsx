
import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import ProductForm from "@/components/products/ProductForm";
import ProductsTable from "@/components/products/ProductsTable";
import { fetchAllProducts, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

const GerenciarProdutos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: String(error),
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
      <div className="container mx-auto p-6 grid md:grid-cols-2 gap-6">
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
