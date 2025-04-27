
import { useState } from "react";
import ProductCard, { ProductProps } from "../product/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredProducts: ProductProps[] = [
  {
    id: "1",
    name: "Torta de Morango",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=1776&auto=format&fit=crop",
    category: "Tortas",
  },
  {
    id: "2",
    name: "Bolo de Chocolate com Frutas Vermelhas",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop",
    category: "Bolos",
  },
  {
    id: "3",
    name: "Cheesecake de Limão",
    price: 75.90,
    image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?q=80&w=1964&auto=format&fit=crop",
    category: "Tortas",
  },
  {
    id: "4",
    name: "Macarons Variados (10 unidades)",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1612201143788-b15f883b9fca?q=80&w=1974&auto=format&fit=crop",
    category: "Doces",
  },
  {
    id: "5",
    name: "Bolo de Coco com Abacaxi",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1974&auto=format&fit=crop",
    category: "Bolos",
  },
  {
    id: "6",
    name: "Petit Gateau (6 unidades)",
    price: 48.90,
    image: "https://images.unsplash.com/photo-1514508985285-52fa96afe696?q=80&w=2070&auto=format&fit=crop",
    category: "Doces",
  },
  {
    id: "7",
    name: "Bolo Red Velvet",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=1974&auto=format&fit=crop",
    category: "Bolos",
  },
  {
    id: "8",
    name: "Caixa de Brownies (9 unidades)",
    price: 56.90,
    image: "https://images.unsplash.com/photo-1611505908502-5b67e53f9355?q=80&w=2070&auto=format&fit=crop",
    category: "Doces",
  },
];

const tabs = ["Todos", "Bolos", "Tortas", "Doces"];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("Todos");

  const filteredProducts = activeTab === "Todos"
    ? featuredProducts
    : featuredProducts.filter(product => product.category === activeTab);

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="page-title mb-4">Produtos em Destaque</h2>
          <p className="subtitle">
            Conheça alguns dos nossos produtos mais amados pelos clientes.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-cream-100 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-white shadow-sm text-cocoa-800"
                    : "text-muted-foreground hover:text-cocoa-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/produtos">
            <Button
              variant="outline"
              className="bg-transparent border-cocoa-300 text-cocoa-800 hover:bg-cocoa-100 hover:border-cocoa-400"
            >
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
