
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada",
      description: "Agradecemos seu contato. Responderemos em breve!",
    });
  };

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-8 text-center">Entre em Contato</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-display mb-4">Informações de Contato</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-muted-foreground">Rua das Flores, 123 - Centro</p>
                  <p className="text-muted-foreground">São Paulo, SP - CEP 01234-567</p>
                </div>
                
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-muted-foreground">(11) 99999-9999</p>
                </div>
                
                <div>
                  <p className="font-medium">E-mail</p>
                  <p className="text-muted-foreground">contato@doceminimalista.com.br</p>
                </div>
                
                <div>
                  <p className="font-medium">Horário de Funcionamento</p>
                  <p className="text-muted-foreground">Segunda a Sexta: 9h às 19h</p>
                  <p className="text-muted-foreground">Sábado: 9h às 16h</p>
                  <p className="text-muted-foreground">Domingo: Fechado</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-cocoa-600 transition-colors">Instagram</a>
                  <a href="#" className="text-muted-foreground hover:text-cocoa-600 transition-colors">Facebook</a>
                  <a href="#" className="text-muted-foreground hover:text-cocoa-600 transition-colors">Pinterest</a>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-display mb-4">Envie uma Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome
                  </label>
                  <Input id="name" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    E-mail
                  </label>
                  <Input id="email" type="email" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Assunto
                  </label>
                  <Input id="subject" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensagem
                  </label>
                  <Textarea id="message" rows={5} required />
                </div>
                
                <Button type="submit" className="bg-cocoa-700 hover:bg-cocoa-800 w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976900292104!2d-46.6537446!3d-23.565213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982bfde4df54830!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1682012345678!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Mapa da localização"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
