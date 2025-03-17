import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Post } from '../../lib/posts/types';
import { useAuth } from '../../lib/auth';
import { formatRelativeTime } from '../../lib/utils';

interface PostHeaderProps {
  post: Post;
  onDelete: () => void;
}

export function PostHeader({ post, onDelete }: PostHeaderProps) {
  const { user } = useAuth();
  const isOwner = user?.id === post.user.id;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{post.user.name}</h3>
          <p className="text-sm text-gray-500">
            {formatRelativeTime(post.timestamp)}
          </p>
        </div>
      </div>
      {isOwner && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}