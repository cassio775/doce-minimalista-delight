
import React from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const Categorias = () => {
  const categorias = [
    {
      id: 1,
      nome: "Bolos",
      imagem: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D",
      descricao: "Bolos artesanais para qualquer ocasião"
    },
    {
      id: 2,
      nome: "Tortas",
      imagem: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVtb24lMjBwaWV8ZW58MHx8MHx8fDA%3D",
      descricao: "Tortas doces e salgadas"
    },
    {
      id: 3,
      nome: "Docinhos",
      imagem: "https://images.unsplash.com/photo-1551529489-526f863a9b69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJ1ZmZsZXN8ZW58MHx8MHx8fDA%3D",
      descricao: "Brigadeiros, trufas e bombons"
    },
    {
      id: 4,
      nome: "Cupcakes",
      imagem: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
      descricao: "Cupcakes decorados para festas"
    },
    {
      id: 5,
      nome: "Sobremesas Geladas",
      imagem: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlJTIwY3JlYW0lMjBkZXNzZXJ0fGVufDB8fDB8fHww",
      descricao: "Mousses, pavês e sorvetes"
    },
    {
      id: 6,
      nome: "Vegano",
      imagem: "https://images.unsplash.com/photo-1611293388250-580b08c4a145?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVnYW4lMjBkZXNzZXJ0fGVufDB8fDB8fHww",
      descricao: "Opções sem ingredientes de origem animal"
    }
  ];

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-8">Categorias</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorias.map((categoria) => (
              <Link 
                to={`/categorias/${categoria.nome.toLowerCase()}`} 
                key={categoria.id} 
                className="group block"
              >
                <div className="rounded-lg overflow-hidden border border-cream-200 hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={categoria.imagem} 
                      alt={categoria.nome} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-medium mb-2">{categoria.nome}</h3>
                    <p className="text-muted-foreground text-sm">{categoria.descricao}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categorias;
