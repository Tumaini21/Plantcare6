import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { ImageUpload } from '../ui/ImageUpload';
import toast from 'react-hot-toast';

const postSchema = z.object({
  content: z.string().min(1, 'Post content is required').max(500, 'Post content cannot exceed 500 characters'),
  image: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface CreatePostFormProps {
  onClose: () => void;
  onSubmit: (data: PostFormData) => void;
}

export function CreatePostForm({ onClose, onSubmit }: CreatePostFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const imageValue = watch('image');

  const handleImageUpload = (imageData: string) => {
    setValue('image', imageData);
    toast.success('Image uploaded successfully!');
  };

  const handleImageRemove = () => {
    setValue('image', undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Share your plant journey
        </label>
        <div className="mt-1">
          <textarea
            {...register('content')}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            placeholder="What's happening with your plants?"
          />
        </div>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <ImageUpload
        value={imageValue}
        onChange={handleImageUpload}
        onRemove={handleImageRemove}
      />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Post
        </Button>
      </div>
    </form>
  );
}