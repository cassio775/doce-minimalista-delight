
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulação de sucesso
    setTimeout(() => {
      toast({
        title: "Inscrição confirmada!",
        description: "Obrigado por se inscrever em nossa newsletter.",
        duration: 5000,
      });
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-cocoa-800 text-white py-16 md:py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            Receba nossas novidades
          </h2>
          <p className="text-cocoa-100 mb-8 md:text-lg">
            Inscreva-se em nossa newsletter e receba receitas exclusivas,
            promoções especiais e novidades em primeira mão.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="bg-cocoa-700 border-cocoa-600 text-white placeholder:text-cocoa-300 focus-visible:ring-cream-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-cream-500 hover:bg-cream-600 text-cocoa-900"
            >
              Inscrever
            </Button>
          </form>
          <p className="text-xs text-cocoa-300 mt-4">
            Ao se inscrever, você concorda com nossa Política de Privacidade.
            Você pode cancelar sua inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
