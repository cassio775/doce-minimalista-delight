
import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      
      <FeaturedCategories />
      
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6">
                Sabor e elegância em cada detalhe
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Na Doce Minimalista, acreditamos que a beleza está na simplicidade. 
                Cada um de nossos bolos e sobremesas é cuidadosamente elaborado com ingredientes 
                selecionados, técnicas refinadas e uma apresentação elegante.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
                    <span className="text-cocoa-600 font-medium">01</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Ingredientes Selecionados</h3>
                    <p className="text-muted-foreground">
                      Utilizamos apenas ingredientes frescos e de alta qualidade.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
                    <span className="text-cocoa-600 font-medium">02</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Feito à Mão</h3>
                    <p className="text-muted-foreground">
                      Cada item é artesanalmente produzido com cuidado e atenção aos detalhes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
                    <span className="text-cocoa-600 font-medium">03</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Design Único</h3>
                    <p className="text-muted-foreground">
                      Designs modernos e elegantes que encantam os olhos e o paladar.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/sobre">
                  <Button variant="outline" className="border-cocoa-300 text-cocoa-800 hover:bg-cream-100">
                    Conheça Nossa História
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=1974&auto=format&fit=crop"
                  alt="Bolo artesanal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-md overflow-hidden mt-8">
                <img
                  src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1974&auto=format&fit=crop"
                  alt="Processo de confeitaria"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      
      <Testimonials />
      
      <Newsletter />
    </Layout>
  );
};

export default Index;
