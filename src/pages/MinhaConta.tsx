import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, User, LogOut, MapPin } from "lucide-react";
import { ProfileTab } from "@/components/account/ProfileTab";
import { OrdersTab } from "@/components/account/OrdersTab";
import { AddressesTab } from "@/components/account/AddressesTab";

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
              <ProfileTab usuario={usuario} />
            </TabsContent>
            
            <TabsContent value="pedidos">
              <OrdersTab pedidos={pedidos} />
            </TabsContent>
            
            <TabsContent value="enderecos">
              <AddressesTab enderecos={enderecos} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MinhaConta;
