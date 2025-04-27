
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Produto {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

const DetalheProduto = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduto();
  }, [id]);

  const fetchProduto = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      toast({
        title: "Erro ao carregar produto",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    setProduto(data);
    setLoading(false);
  };

  const adicionarAoCarrinho = () => {
    if (produto) {
      toast({
        title: "Produto adicionado",
        description: `${produto.name} foi adicionado ao carrinho.`,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-custom">
            <p>Carregando...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!produto) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-display font-medium mb-8">Produto não encontrado</h1>
            <p>O produto que você está procurando não existe.</p>
            <Link to="/produtos">
              <Button className="mt-4">Voltar aos produtos</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <Link to="/produtos" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition">
            <ArrowLeft size={18} className="mr-2" />
            Voltar aos produtos
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={produto.image_url} 
                alt={produto.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-2">{produto.name}</h1>
              <p className="text-2xl text-cocoa-700 font-medium mb-4">R$ {produto.price.toFixed(2).replace('.', ',')}</p>
              
              <p className="text-muted-foreground mb-6">{produto.description}</p>
              
              <Button 
                className="bg-cocoa-700 hover:bg-cocoa-800 mb-8 w-full md:w-auto"
                onClick={adicionarAoCarrinho}
              >
                <ShoppingCart className="mr-2" size={18} />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetalheProduto;
