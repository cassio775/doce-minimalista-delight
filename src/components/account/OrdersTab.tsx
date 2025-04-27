
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface OrderItem {
  nome: string;
  quantidade: number;
  preco: number;
}

interface Order {
  id: string;
  data: string;
  status: string;
  itens: OrderItem[];
  total: number;
}

interface OrdersTabProps {
  pedidos: Order[];
}

export const OrdersTab = ({ pedidos }: OrdersTabProps) => {
  return (
    <div>
      <h2 className="text-2xl font-display mb-6">Meus Pedidos</h2>
      
      {pedidos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Você ainda não realizou nenhum pedido.</p>
          <Link to="/produtos">
            <Button className="bg-cocoa-700 hover:bg-cocoa-800">
              Ver Produtos
            </Button>
          </Link>
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
  );
};
