
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Carrinho = () => {
  const { toast } = useToast();
  
  // Estado inicial do carrinho com alguns produtos de exemplo
  const [itensCarrinho, setItensCarrinho] = useState([
    {
      id: 1,
      nome: "Bolo de Chocolate",
      preco: 89.9,
      imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
      quantidade: 1
    },
    {
      id: 3,
      nome: "Bolo Red Velvet",
      preco: 99.9,
      imagem: "https://images.unsplash.com/photo-1586788224331-947f68671cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
      quantidade: 1
    }
  ]);

  // Função para alterar a quantidade de um item
  const alterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;
    
    setItensCarrinho(itensCarrinho.map(item => 
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    ));
  };

  // Função para remover um item do carrinho
  const removerItem = (id: number) => {
    setItensCarrinho(itensCarrinho.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: "O item foi removido do seu carrinho.",
    });
  };

  // Calcular subtotal
  const subtotal = itensCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  
  // Valores fixos de exemplo
  const entrega = 15.0;
  const total = subtotal + entrega;

  // Finalizar compra
  const finalizarCompra = () => {
    toast({
      title: "Pedido recebido!",
      description: "Seu pedido foi enviado com sucesso!",
    });
    setItensCarrinho([]);
  };

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-8">Seu Carrinho</h1>
          
          {itensCarrinho.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-display mb-4">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground mb-6">Adicione alguns de nossos deliciosos produtos para continuar.</p>
              <Link to="/produtos">
                <Button className="bg-cocoa-700 hover:bg-cocoa-800">
                  Ver Produtos
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-cream-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-cream-50 border-b border-cream-200">
                      <tr>
                        <th className="text-left p-4">Produto</th>
                        <th className="p-4 text-center">Preço</th>
                        <th className="p-4 text-center">Quantidade</th>
                        <th className="p-4 text-center">Subtotal</th>
                        <th className="p-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensCarrinho.map((item) => (
                        <tr key={item.id} className="border-b border-cream-200">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="w-16 h-16 rounded overflow-hidden mr-3">
                                <img 
                                  src={item.imagem} 
                                  alt={item.nome} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium">{item.nome}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">R$ {item.preco.toFixed(2)}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="mx-2 w-8 text-center">{item.quantidade}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="p-4 text-center font-medium">
                            R$ {(item.preco * item.quantidade).toFixed(2)}
                          </td>
                          <td className="p-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removerItem(item.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Link to="/produtos">
                    <Button variant="outline">
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="rounded-lg border border-cream-200 p-6">
                  <h2 className="text-xl font-display font-medium mb-4">Resumo do Pedido</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entrega</span>
                      <span>R$ {entrega.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-cream-200 pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-lg">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-cocoa-700 hover:bg-cocoa-800"
                    onClick={finalizarCompra}
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Carrinho;
