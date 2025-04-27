
import { Link } from "react-router-dom";

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const categories: CategoryProps[] = [
  {
    id: "bolos",
    name: "Bolos",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1950&auto=format&fit=crop",
    description: "Bolos tradicionais e especiais para todas as ocasiões",
  },
  {
    id: "doces",
    name: "Doces",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710123?q=80&w=1978&auto=format&fit=crop",
    description: "Pequenos doces e sobremesas individuais",
  },
  {
    id: "tortas",
    name: "Tortas",
    image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?q=80&w=1989&auto=format&fit=crop",
    description: "Tortas doces e salgadas para todos os gostos",
  },
  {
    id: "para-presente",
    name: "Para Presente",
    image: "https://images.unsplash.com/photo-1557164158-11e97f2bb220?q=80&w=1936&auto=format&fit=crop",
    description: "Embalagens especiais para presentear quem você ama",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="page-title mb-4">Nossas Categorias</h2>
          <p className="subtitle">
            Explore nossa seleção de doces e sobremesas artesanais, feitos com ingredientes selecionados e muito carinho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/categorias/${category.id}`}
              key={category.id}
              className="group relative overflow-hidden rounded-md aspect-square border border-cream-200"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-display mb-2">{category.name}</h3>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
