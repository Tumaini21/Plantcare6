import React from 'react';
import { Users } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex h-60 items-center justify-center rounded-lg bg-gray-50">
      <div className="text-center">
        <Users className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-600">No posts yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Be the first to share your plant journey!
        </p>
      </div>
    </div>
  );
}