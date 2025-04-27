
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialProps {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Aniversário de 30 anos",
    text: "O bolo que encomendei para meu aniversário foi simplesmente perfeito! Não só visualmente lindo, mas o sabor superou minhas expectativas. Todos os convidados ficaram impressionados.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Casamento",
    text: "Contratar a Doce Minimalista para o nosso casamento foi uma das melhores decisões que tomamos. A mesa de doces estava impecável e os sabores divinos. Profissionalismo do início ao fim.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Cliente Frequente",
    text: "Sou cliente há mais de 2 anos e nunca me decepcionei. Os bolos são sempre frescos, bonitos e saborosos. O atendimento é excelente e as entregas sempre pontuais.",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1989&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="page-title mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="subtitle">
            A satisfação dos nossos clientes é nossa maior recompensa.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 ${
                index === current ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              <div className="bg-cream-50 p-8 md:p-12 rounded-lg border border-cream-200 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg md:text-xl font-display italic mb-6">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-medium text-cocoa-800">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-cream-200 hover:bg-cream-100"
              onClick={prevTestimonial}
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-cream-200 hover:bg-cream-100"
              onClick={nextTestimonial}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
