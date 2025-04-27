
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

// Função para buscar todos os produtos
export const fetchAllProducts = async (): Promise<Product[]> => {
  // Usando "any" para contornar a restrição de tipo
  const { data, error } = await (supabase as any).from('products').select('*');
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

// Função para buscar um produto por ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await (supabase as any).from('products').select('*').eq('id', id).maybeSingle();
  
  if (error) {
    throw error;
  }
  
  return data;
};

// Função para criar um produto
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const { data, error } = await (supabase as any).from('products').insert(product).select().single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

// Função para atualizar um produto
export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id'>>): Promise<Product> => {
  const { data, error } = await (supabase as any).from('products').update(product).eq('id', id).select().single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

// Função para deletar um produto
export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await (supabase as any).from('products').delete().eq('id', id);
  
  if (error) {
    throw error;
  }
};

// Função para fazer upload de uma imagem de produto
export const uploadProductImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return publicUrl;
};
