
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <h1 className="text-2xl font-display font-medium">
              <span className="text-cocoa-600">Doce</span>
              <span className="text-cream-600">Minimalista</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-foreground hover:text-cocoa-700 transition-colors link-hover">
              Início
            </Link>
            <Link to="/produtos" className="font-medium text-foreground hover:text-cocoa-700 transition-colors link-hover">
              Produtos
            </Link>
            <Link to="/categorias" className="font-medium text-foreground hover:text-cocoa-700 transition-colors link-hover">
              Categorias
            </Link>
            <Link to="/sobre" className="font-medium text-foreground hover:text-cocoa-700 transition-colors link-hover">
              Sobre
            </Link>
            <Link to="/contato" className="font-medium text-foreground hover:text-cocoa-700 transition-colors link-hover">
              Contato
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/minha-conta" className="p-2 text-foreground hover:text-cocoa-700 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/carrinho" className="p-2 text-foreground hover:text-cocoa-700 transition-colors">
              <ShoppingCart size={20} />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden animate-fade-in">
          <div className="container p-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="shrink-0" onClick={() => setMobileMenuOpen(false)}>
                <h1 className="text-2xl font-display font-medium">
                  <span className="text-cocoa-600">Doce</span>
                  <span className="text-cream-600">Minimalista</span>
                </h1>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col space-y-6 text-center">
              <Link
                to="/"
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/produtos"
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Produtos
              </Link>
              <Link
                to="/categorias"
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categorias
              </Link>
              <Link
                to="/sobre"
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                to="/contato"
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="border-t border-gray-100 pt-6 mt-6">
                <div className="flex justify-center space-x-8">
                  <Link
                    to="/minha-conta"
                    className="flex flex-col items-center space-y-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={24} />
                    <span className="text-sm">Conta</span>
                  </Link>
                  <Link
                    to="/carrinho"
                    className="flex flex-col items-center space-y-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={24} />
                    <span className="text-sm">Carrinho</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
