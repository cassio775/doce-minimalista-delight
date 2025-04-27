
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Package, User, LogOut, MapPin } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const MinhaConta = () => {
  const { toast } = useToast();
  
  // Estado fictício para simulação de usuário logado
  const [usuario] = useState({
    nome: "Maria Silva",
    email: "maria.silva@exemplo.com",
    telefone: "(11) 99999-9999"
  });

  // Pedidos fictícios para ilustração
  const pedidos = [
    {
      id: "PED12345",
      data: "15/04/2025",
      status: "Entregue",
      itens: [
        { nome: "Bolo de Chocolate", quantidade: 1, preco: 89.9 },
        { nome: "Cupcakes", quantidade: 6, preco: 49.9 }
      ],
      total: 139.8
    },
    {
      id: "PED12344",
      data: "02/04/2025",
      status: "Entregue",
      itens: [
        { nome: "Bolo Red Velvet", quantidade: 1, preco: 99.9 }
      ],
      total: 99.9
    }
  ];

  // Endereços fictícios para ilustração
  const enderecos = [
    {
      id: 1,
      titulo: "Casa",
      logradouro: "Rua das Flores",
      numero: "123",
      complemento: "Apto 101",
      bairro: "Jardim das Flores",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567"
    },
    {
      id: 2,
      titulo: "Trabalho",
      logradouro: "Avenida Paulista",
      numero: "1000",
      complemento: "Sala 25",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01310-100"
    }
  ];
  
  // Handler para salvar dados do perfil
  const salvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };
  
  // Handler para logout
  const fazerLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
  };

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-medium">Minha Conta</h1>
            <Button variant="outline" onClick={fazerLogout} className="flex items-center gap-2">
              <LogOut size={16} />
              Sair
            </Button>
          </div>
          
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mb-8">
              <TabsTrigger value="perfil" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Package size={16} />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="enderecos" className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="hidden sm:inline">Endereços</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="perfil">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-display mb-6">Meu Perfil</h2>
                
                <form onSubmit={salvarPerfil} className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium mb-1">
                      Nome Completo
                    </label>
                    <Input id="nome" defaultValue={usuario.nome} />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      E-mail
                    </label>
                    <Input id="email" type="email" defaultValue={usuario.email} />
                  </div>
                  
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium mb-1">
                      Telefone
                    </label>
                    <Input id="telefone" defaultValue={usuario.telefone} />
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" className="bg-cocoa-700 hover:bg-cocoa-800">
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
                
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-xl font-display mb-4">Alterar Senha</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="senha-atual" className="block text-sm font-medium mb-1">
                        Senha Atual
                      </label>
                      <Input id="senha-atual" type="password" />
                    </div>
                    
                    <div>
                      <label htmlFor="nova-senha" className="block text-sm font-medium mb-1">
                        Nova Senha
                      </label>
                      <Input id="nova-senha" type="password" />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmar-senha" className="block text-sm font-medium mb-1">
                        Confirmar Nova Senha
                      </label>
                      <Input id="confirmar-senha" type="password" />
                    </div>
                    
                    <div className="pt-2">
                      <Button type="submit" className="bg-cocoa-700 hover:bg-cocoa-800">
                        Alterar Senha
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pedidos">
              <div>
                <h2 className="text-2xl font-display mb-6">Meus Pedidos</h2>
                
                {pedidos.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Você ainda não realizou nenhum pedido.</p>
                    <RouterLink to="/produtos">
                      <Button className="bg-cocoa-700 hover:bg-cocoa-800">
                        Ver Produtos
                      </Button>
                    </RouterLink>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pedidos.map((pedido) => (
                      <div key={pedido.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-cream-50 p-4 flex flex-wrap gap-4 justify-between items-center border-b">
                          <div>
                            <span className="block text-sm text-muted-foreground">Pedido nº</span>
                            <span className="font-medium">{pedido.id}</span>
                          </div>
                          <div>
                            <span className="block text-sm text-muted-foreground">Data</span>
                            <span>{pedido.data}</span>
                          </div>
                          <div>
                            <span className="block text-sm text-muted-foreground">Status</span>
                            <span className="font-medium text-green-600">{pedido.status}</span>
                          </div>
                          <div>
                            <span className="block text-sm text-muted-foreground">Total</span>
                            <span className="font-medium">R$ {pedido.total.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium mb-3">Itens do Pedido</h3>
                          <div className="space-y-2">
                            {pedido.itens.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.quantidade}x {item.nome}</span>
                                <span>R$ {(item.quantidade * item.preco).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="enderecos">
              <div>
                <h2 className="text-2xl font-display mb-6">Meus Endereços</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enderecos.map((endereco) => (
                    <div key={endereco.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{endereco.titulo}</h3>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Excluir</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <p>{endereco.logradouro}, {endereco.numero} {endereco.complemento}</p>
                        <p>{endereco.bairro}</p>
                        <p>{endereco.cidade} - {endereco.estado}</p>
                        <p>CEP: {endereco.cep}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed rounded-lg p-4 flex items-center justify-center">
                    <Button variant="ghost">+ Adicionar Novo Endereço</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

// No custom Link component needed anymore as we're using RouterLink directly
export default MinhaConta;
