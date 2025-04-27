
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { FormLabel } from "@/components/ui/form";

interface ImageUploadProps {
  previewUrl: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  isUploading?: boolean;
}

export const ImageUpload = ({ previewUrl, onImageUpload, onRemoveImage, isUploading = false }: ImageUploadProps) => {
  return (
    <div className="space-y-3">
      <FormLabel className="text-cocoa-700 block">Imagem do Produto</FormLabel>
      <div className="flex items-center gap-3">
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
          disabled={isUploading}
        />
        <label 
          htmlFor="image" 
          className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-cocoa-100 hover:bg-cocoa-200 transition text-cocoa-800 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <Loader2 size={18} className="text-cocoa-700 animate-spin" />
          ) : (
            <Upload size={18} className="text-cocoa-700" />
          )}
          {isUploading ? 'Enviando...' : 'Selecionar Imagem'}
        </label>
        {previewUrl && (
          <Button 
            type="button" 
            variant="destructive" 
            size="sm" 
            onClick={onRemoveImage}
            title="Remover Imagem"
            disabled={isUploading}
          >
            <Trash2 size={16} />
            <span className="ml-1">Remover</span>
          </Button>
        )}
      </div>
      
      {previewUrl ? (
        <div className="mt-4 rounded-md overflow-hidden border border-cocoa-200">
          <img 
            src={previewUrl} 
            alt="Prévia da imagem" 
            className="w-full h-48 object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-amber-600 mt-2">
          <AlertTriangle size={16} />
          <span className="text-sm">Imagem não selecionada</span>
        </div>
      )}
    </div>
  );
};
