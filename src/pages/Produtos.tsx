
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Produtos = () => {
  // Dados de exemplo para produtos
  const produtos = [
    {
      id: 1,
      nome: "Bolo de Chocolate",
      preco: 89.9,
      imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
      descricao: "Delicioso bolo de chocolate com ganache e cerejas"
    },
    {
      id: 2,
      nome: "Cheesecake",
      preco: 79.9,
      imagem: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoZWVzZWNha2V8ZW58MHx8MHx8fDA%3D",
      descricao: "Cheesecake cremoso com calda de frutas vermelhas"
    },
    {
      id: 3,
      nome: "Bolo Red Velvet",
      preco: 99.9,
      imagem: "https://images.unsplash.com/photo-1586788224331-947f68671cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
      descricao: "Tradicional bolo Red Velvet com cobertura de cream cheese"
    },
    {
      id: 4,
      nome: "Torta de Limão",
      preco: 69.9,
      imagem: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVtb24lMjBwaWV8ZW58MHx8MHx8fDA%3D",
      descricao: "Refrescante torta de limão com merengue"
    },
    {
      id: 5,
      nome: "Cupcakes",
      preco: 49.9,
      imagem: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VwY2FrZXN8ZW58MHx8MHx8fDA%3D",
      descricao: "Kit com 6 cupcakes decorados"
    },
    {
      id: 6,
      nome: "Bolo de Morango",
      preco: 85.9,
      imagem: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
      descricao: "Bolo recheado com creme e morangos frescos"
    }
  ];

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-8">Nossos Produtos</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="rounded-lg overflow-hidden border border-cream-200 hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-medium mb-2">{produto.nome}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{produto.descricao}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-cocoa-700">R$ {produto.preco.toFixed(2)}</span>
                    <Button className="bg-cocoa-700 hover:bg-cocoa-800">
                      Adicionar ao Carrinho
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
