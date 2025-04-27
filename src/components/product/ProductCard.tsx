
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductProps) => {
  return (
    <div className="product-card group animate-fade-in">
      <Link to={`/produto/${id}`} className="relative block overflow-hidden">
        <div className="aspect-square overflow-hidden bg-cream-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2 py-1 text-xs bg-white/80 backdrop-blur-sm rounded-full text-cocoa-700">
            {category}
          </span>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/produto/${id}`} className="block hover:underline">
          <h3 className="font-medium text-base md:text-lg mb-1 line-clamp-2">{name}</h3>
        </Link>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-lg font-medium">
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-cream-100">
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
