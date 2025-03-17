import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  className?: string;
  maxSize?: number; // in MB
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  className,
  maxSize = 10 // default 10MB
}: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className={cn('space-y-4', className)}>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Uploaded"
            className="h-64 w-full rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="absolute right-2 top-2"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors',
            isDragActive && 'border-green-500 bg-green-50',
            'hover:border-green-500 hover:bg-green-50'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag & drop an image here, or click to select
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to {maxSize}MB
          </p>
        </div>
      )}
    </div>
  );
}