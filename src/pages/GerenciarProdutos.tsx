
import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import ProductForm from "@/components/products/ProductForm";
import ProductsTable from "@/components/products/ProductsTable";
import { fetchAllProducts, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GerenciarProdutos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log("Buscando produtos do Supabase...");
      const data = await fetchAllProducts();
      console.log("Produtos recuperados:", data);
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast({
        title: "Erro ao carregar produtos",
        description: String(error),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductSuccess = () => {
    console.log("Produto salvo com sucesso, recarregando lista...");
    loadProducts();
    setEditingProduct(undefined);
  };

  const handleEdit = (product: Product) => {
    console.log("Editando produto:", product);
    setEditingProduct(product);
  };

  const handleCancel = () => {
    setEditingProduct(undefined);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-cocoa-800 mb-6">Gerenciamento de Produtos</h1>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <ProductForm 
              initialProduct={editingProduct} 
              onSuccess={handleProductSuccess}
            />
          </div>
          
          <div className="flex flex-col space-y-4">
            {editingProduct && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-amber-800">
                      Editando: <span className="font-bold">{editingProduct.name}</span>
                    </p>
                  </div>
                  <button 
                    onClick={handleCancel}
                    className="px-3 py-1 rounded-md bg-amber-200 hover:bg-amber-300 text-amber-800 text-sm"
                  >
                    Cancelar Edição
                  </button>
                </CardContent>
              </Card>
            )}
            
            <ProductsTable 
              products={products}
              onEdit={handleEdit}
              onDelete={loadProducts}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GerenciarProdutos;
