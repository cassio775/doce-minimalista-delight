
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - in production this would come from an API or database
const produtos = [
  {
    id: 1,
    nome: "Bolo de Chocolate",
    preco: 89.9,
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Delicioso bolo de chocolate com ganache e cerejas",
    ingredientes: "Farinha de trigo, açúcar, manteiga, ovos, chocolate em pó, essência de baunilha, ganache de chocolate, cerejas",
    tamanho: "Serve até 15 pessoas",
    conservacao: "Conservar em geladeira por até 3 dias"
  },
  {
    id: 2,
    nome: "Cheesecake",
    preco: 79.9,
    imagem: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoZWVzZWNha2V8ZW58MHx8MHx8fDA%3D",
    descricao: "Cheesecake cremoso com calda de frutas vermelhas",
    ingredientes: "Cream cheese, biscoitos tipo graham, manteiga, açúcar, ovos, essência de baunilha, frutas vermelhas",
    tamanho: "Serve até 12 pessoas",
    conservacao: "Conservar em geladeira por até 5 dias"
  },
  {
    id: 3,
    nome: "Bolo Red Velvet",
    preco: 99.9,
    imagem: "https://images.unsplash.com/photo-1586788224331-947f68671cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Tradicional bolo Red Velvet com cobertura de cream cheese",
    ingredientes: "Farinha de trigo, açúcar, manteiga, ovos, buttermilk, corante vermelho, cacau em pó, cream cheese",
    tamanho: "Serve até 15 pessoas",
    conservacao: "Conservar em geladeira por até 4 dias"
  },
  {
    id: 4,
    nome: "Torta de Limão",
    preco: 69.9,
    imagem: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVtb24lMjBwaWV8ZW58MHx8MHx8fDA%3D",
    descricao: "Refrescante torta de limão com merengue",
    ingredientes: "Massa de biscoito, manteiga, leite condensado, suco de limão, ovos, açúcar",
    tamanho: "Serve até 10 pessoas",
    conservacao: "Conservar em geladeira por até 3 dias"
  },
  {
    id: 5,
    nome: "Cupcakes",
    preco: 49.9,
    imagem: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VwY2FrZXN8ZW58MHx8MHx8fDA%3D",
    descricao: "Kit com 6 cupcakes decorados",
    ingredientes: "Farinha de trigo, açúcar, manteiga, ovos, essência de baunilha, cobertura de buttercream",
    tamanho: "6 unidades",
    conservacao: "Conservar em geladeira por até 3 dias"
  },
  {
    id: 6,
    nome: "Bolo de Morango",
    preco: 85.9,
    imagem: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
    descricao: "Bolo recheado com creme e morangos frescos",
    ingredientes: "Farinha de trigo, açúcar, manteiga, ovos, morangos frescos, creme de confeiteiro",
    tamanho: "Serve até 12 pessoas",
    conservacao: "Conservar em geladeira por até 2 dias"
  }
];

const DetalheProduto = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Find the product by ID
  const produto = produtos.find(p => p.id === Number(id)) || null;
  
  const adicionarAoCarrinho = () => {
    if (produto) {
      // In a real app, you would update a cart state or make an API call
      // This is just a simple toast notification for demonstration
      toast({
        title: "Produto adicionado",
        description: `${produto.nome} foi adicionado ao carrinho.`,
      });
    }
  };
  
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
                src={produto.imagem} 
                alt={produto.nome} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-2">{produto.nome}</h1>
              <p className="text-2xl text-cocoa-700 font-medium mb-4">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
              
              <p className="text-muted-foreground mb-6">{produto.descricao}</p>
              
              <Button 
                className="bg-cocoa-700 hover:bg-cocoa-800 mb-8 w-full md:w-auto"
                onClick={adicionarAoCarrinho}
              >
                <ShoppingCart className="mr-2" size={18} />
                Adicionar ao Carrinho
              </Button>
              
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Ingredientes</h3>
                  <p className="text-sm text-muted-foreground">{produto.ingredientes}</p>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Tamanho</h3>
                  <p className="text-sm text-muted-foreground">{produto.tamanho}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Conservação</h3>
                  <p className="text-sm text-muted-foreground">{produto.conservacao}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetalheProduto;
