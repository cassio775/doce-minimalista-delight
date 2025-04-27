
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Product, deleteProduct } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import {
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: () => void;
}

const ProductsTable = ({ products, onEdit, onDelete }: ProductsTableProps) => {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({ title: "Produto excluído com sucesso" });
      onDelete();
    } catch (error) {
      toast({
        title: "Erro ao excluir produto",
        description: String(error),
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhum produto cadastrado</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => onEdit(product)}
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(product.id)}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
