
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cream-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-display mb-4">Doce Minimalista</h3>
            <p className="text-muted-foreground mb-4">
              Deliciosos bolos artesanais e sobremesas elegantes para momentos especiais.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                Pinterest
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/politica-de-privacidade" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/entrega" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Política de Entrega
                </Link>
              </li>
              <li>
                <Link to="/devolucao" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Política de Devolução
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-cocoa-600 transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Rua das Flores, 123 - Centro
              </li>
              <li className="text-muted-foreground">São Paulo, SP</li>
              <li className="text-muted-foreground">contato@doceminimalista.com.br</li>
              <li className="text-muted-foreground">(11) 99999-9999</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Doce Minimalista. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-cocoa-600 transition-colors">
                Admin
              </Link>
              <Link to="/termos-de-uso" className="text-sm text-muted-foreground hover:text-cocoa-600 transition-colors">
                Termos
              </Link>
              <Link to="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-cocoa-600 transition-colors">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
