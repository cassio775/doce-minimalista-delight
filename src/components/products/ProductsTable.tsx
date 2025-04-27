
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Product, deleteProduct } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

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
    } catch (error: any) {
      toast({
        title: "Erro ao excluir produto",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>R$ {product.price.toFixed(2)}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onEdit(product)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
