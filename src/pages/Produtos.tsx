
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Produto {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

const Produtos = () => {
  const { toast } = useToast();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setProdutos(data || []);
    }
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    toast({
      title: "Produto adicionado",
      description: `${produto.name} foi adicionado ao carrinho.`,
    });
  };

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-8">Nossos Produtos</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="rounded-lg overflow-hidden border border-cream-200 hover:shadow-md transition-shadow">
                <Link to={`/produto/${produto.id}`} className="block">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={produto.image_url} 
                      alt={produto.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/produto/${produto.id}`} className="block">
                    <h3 className="font-display text-lg font-medium mb-2">{produto.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{produto.description}</p>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-cocoa-700">R$ {produto.price.toFixed(2).replace('.', ',')}</span>
                    <Button 
                      className="bg-cocoa-700 hover:bg-cocoa-800"
                      onClick={(e) => {
                        e.preventDefault();
                        adicionarAoCarrinho(produto);
                      }}
                    >
                      <ShoppingCart size={18} className="mr-1" /> Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Produtos;
