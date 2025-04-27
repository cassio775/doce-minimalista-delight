
import React from "react";
import Layout from "@/components/layout/Layout";

const Sobre = () => {
  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-medium mb-8 text-center">Nossa História</h1>
            
            <div className="mb-12 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556710808-a2bc27a448f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D" 
                alt="Nossa confeitaria" 
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Fundada em 2018, a Doce Minimalista nasceu do sonho de criar sobremesas que fossem ao mesmo tempo belíssimas e deliciosas. Nossa confeiteira-chefe, Ana Clara, após anos de experiência em renomadas confeitarias europeias, decidiu trazer para o Brasil um conceito de confeitaria que valoriza a elegância na simplicidade.
              </p>
              
              <p>
                Nossa filosofia é baseada no minimalismo: acreditamos que com ingredientes de alta qualidade e técnicas precisas, podemos criar sobremesas que encantam todos os sentidos sem excessos. Cada produto é cuidadosamente elaborado à mão, com atenção aos mínimos detalhes.
              </p>
              
              <h2 className="text-2xl font-display font-medium mt-8 mb-4">Nossos Valores</h2>
              
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Qualidade sem concessões:</strong> utilizamos apenas ingredientes selecionados e da melhor qualidade.</li>
                <li><strong>Estética minimalista:</strong> valorizamos a beleza na simplicidade, com designs elegantes e sofisticados.</li>
                <li><strong>Sabor autêntico:</strong> respeitamos o sabor natural dos ingredientes, com combinações harmoniosas e equilibradas.</li>
                <li><strong>Sustentabilidade:</strong> buscamos práticas responsáveis e embalagens eco-friendly.</li>
              </ul>
              
              <h2 className="text-2xl font-display font-medium mt-8 mb-4">Nossa Equipe</h2>
              
              <p>
                Nossa equipe é composta por profissionais apaixonados pela confeitaria, todos com formação específica e constantemente atualizados com as últimas tendências. Sob a liderança de Ana Clara, trabalhamos em um ambiente que valoriza a criatividade e a excelência.
              </p>
              
              <h2 className="text-2xl font-display font-medium mt-8 mb-4">Nosso Espaço</h2>
              
              <p>
                Nossa loja física, localizada no coração da cidade, foi projetada para refletir nosso conceito minimalista. Um ambiente claro, aconchegante e sofisticado, onde nossos clientes podem desfrutar de momentos especiais enquanto apreciam nossas criações.
              </p>
              
              <p>
                Agradecemos por fazer parte da nossa história. Estamos comprometidos em continuar oferecendo experiências doces e memoráveis, sempre com o cuidado e a qualidade que nos define.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sobre;
