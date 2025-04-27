
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Bolos Artesanais",
    subtitle: "Delicadeza e sabor em cada fatia",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1950&auto=format&fit=crop",
    cta: "Ver Coleção",
    link: "/categorias/bolos",
  },
  {
    id: 2,
    title: "Sobremesas Especiais",
    subtitle: "Criações exclusivas para momentos únicos",
    image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=1776&auto=format&fit=crop",
    cta: "Descobrir",
    link: "/categorias/sobremesas",
  },
  {
    id: 3,
    title: "Doces para Eventos",
    subtitle: "Transforme sua celebração em um momento doce",
    image: "https://images.unsplash.com/photo-1557164158-11e97f2bb220?q=80&w=1936&auto=format&fit=crop",
    cta: "Encomendar",
    link: "/contato",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white px-4">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium mb-4 max-w-4xl">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">{slide.subtitle}</p>
            <Link to={slide.link}>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-cocoa-800 transition-colors"
              >
                {slide.cta}
              </Button>
            </Link>
          </div>
        </div>
      ))}

      <Button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white"
        size="icon"
        variant="ghost"
        onClick={prevSlide}
      >
        <ChevronLeft />
      </Button>
      <Button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white"
        size="icon"
        variant="ghost"
        onClick={nextSlide}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default HeroCarousel;
