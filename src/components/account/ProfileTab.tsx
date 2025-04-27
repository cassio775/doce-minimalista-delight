
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  nome: string;
  email: string;
  telefone: string;
}

interface ProfileTabProps {
  usuario: ProfileData;
}

export const ProfileTab = ({ usuario }: ProfileTabProps) => {
  const { toast } = useToast();

  const salvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  return (
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
  );
};
