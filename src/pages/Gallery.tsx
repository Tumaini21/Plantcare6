import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { ImageUpload } from '../components/ui/ImageUpload';
import { PlantPhoto } from '../types';
import toast from 'react-hot-toast';
import { Plus, X } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (photo: Omit<PlantPhoto, 'id' | 'likes'>) => void;
}

function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [image, setImage] = useState<string>();
  const [caption, setCaption] = useState('');
  const [type, setType] = useState<PlantPhoto['type']>('progress');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    onUpload({
      imageUrl: image,
      caption,
      type,
      plantId: '1', // In a real app, you'd select a plant
      userId: '1', // In a real app, this would come from auth
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Upload Photo</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload
            value={image}
            onChange={setImage}
            onRemove={() => setImage(undefined)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Add a caption..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PlantPhoto['type'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="progress">Progress</option>
              <option value="issue">Issue</option>
              <option value="achievement">Achievement</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Upload Photo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function GalleryPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [photos, setPhotos] = useState<PlantPhoto[]>([]);

  const handleUpload = (photo: Omit<PlantPhoto, 'id' | 'likes'>) => {
    const newPhoto: PlantPhoto = {
      ...photo,
      id: crypto.randomUUID(),
      likes: 0,
    };
    setPhotos([newPhoto, ...photos]);
    setShowUploadModal(false);
    toast.success('Photo uploaded successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plant Gallery</h1>
          <p className="text-gray-600">Document your plant's growth journey</p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Photo
        </Button>
      </div>

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}

      {photos.length === 0 ? (
        <div className="flex h-60 items-center justify-center rounded-lg bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600">No photos yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Upload your first plant photo to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div key={photo.id} className="overflow-hidden rounded-lg bg-white shadow">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <div className="mb-2">
                  <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                    photo.type === 'progress' ? 'bg-green-100 text-green-800' :
                    photo.type === 'issue' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {photo.type.charAt(0).toUpperCase() + photo.type.slice(1)}
                  </span>
                </div>
                <p className="text-sm">{photo.caption}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">{photo.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}