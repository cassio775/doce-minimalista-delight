
import React from "react";
import { Button } from "@/components/ui/button";

interface Address {
  id: number;
  titulo: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface AddressesTabProps {
  enderecos: Address[];
}

export const AddressesTab = ({ enderecos }: AddressesTabProps) => {
  return (
    <div>
      <h2 className="text-2xl font-display mb-6">Meus Endereços</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enderecos.map((endereco) => (
          <div key={endereco.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium">{endereco.titulo}</h3>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Editar</Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                  Excluir
                </Button>
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
  );
};
