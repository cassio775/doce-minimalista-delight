
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Product, deleteProduct } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import {
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: () => void;
  isLoading?: boolean;
}

const ProductsTable = ({ products, onEdit, onDelete, isLoading = false }: ProductsTableProps) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    
    try {
      setIsDeleting(true);
      console.log(`Excluindo produto ${deletingId}`);
      await deleteProduct(deletingId);
      toast({ 
        title: "Produto excluído com sucesso",
        variant: "default"
      });
      onDelete();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast({
        title: "Erro ao excluir produto",
        description: String(error),
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const LoadingRow = () => (
    <TableRow>
      <TableCell colSpan={3} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cocoa-700"></div>
          <div className="text-cocoa-600">Carregando produtos...</div>
        </div>
      </TableCell>
    </TableRow>
  );

  const EmptyRow = () => (
    <TableRow>
      <TableCell colSpan={3} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
          <div className="text-muted-foreground">Nenhum produto cadastrado</div>
          <div className="text-sm text-muted-foreground">
            Utilize o formulário para adicionar produtos
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <Card>
        <CardHeader className="bg-cocoa-50 border-b border-cocoa-100">
          <CardTitle className="text-xl text-cocoa-800">Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-cocoa-50/50">
                <TableHead className="font-medium">Nome</TableHead>
                <TableHead className="font-medium">Preço</TableHead>
                <TableHead className="font-medium text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingRow />
              ) : products.length === 0 ? (
                <EmptyRow />
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-cocoa-50/50">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => onEdit(product)}
                          title="Editar"
                          className="hover:bg-cocoa-100 hover:text-cocoa-700"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => confirmDelete(product.id!)}
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!deletingId} onOpenChange={() => !isDeleting && cancelDelete()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductsTable;
