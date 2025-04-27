
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl md:text-8xl font-display font-medium text-cocoa-300 mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-display mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link to="/">
          <Button className="bg-cocoa-700 text-white hover:bg-cocoa-800">
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
