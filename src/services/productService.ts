
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
  
  return data || [];
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error("Erro ao buscar produto por ID:", error);
    throw error;
  }
  
  return data;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  console.log("Enviando produto para Supabase:", product);
  
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
  
  console.log("Produto criado com sucesso:", data);
  return data;
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id'>>): Promise<Product> => {
  console.log(`Atualizando produto ${id}:`, product);
  
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
  
  console.log("Produto atualizado com sucesso:", data);
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  console.log(`Excluindo produto ${id}`);
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }
  
  console.log("Produto excluído com sucesso");
};

export const uploadProductImage = async (file: File): Promise<string> => {
  console.log("Iniciando upload de imagem:", file.name);
  
  if (!file) {
    throw new Error("Nenhum arquivo fornecido para upload");
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  // Verificando se o bucket existe antes de tentar o upload
  const { data: bucketData, error: bucketError } = await supabase.storage
    .getBucket('products');
  
  if (bucketError && bucketError.message.includes('does not exist')) {
    // Bucket não existe, vamos criar
    console.log("Bucket 'products' não existe. Tentando criar...");
    const { error: createError } = await supabase.storage
      .createBucket('products', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });
      
    if (createError) {
      console.error("Erro ao criar bucket 'products':", createError);
      throw createError;
    }
    console.log("Bucket 'products' criado com sucesso");
  } else if (bucketError) {
    console.error("Erro ao verificar bucket:", bucketError);
    throw bucketError;
  }

  // Fazendo upload do arquivo
  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (uploadError) {
    console.error("Erro no upload da imagem:", uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  console.log("Upload de imagem concluído com sucesso:", publicUrl);
  return publicUrl;
};
