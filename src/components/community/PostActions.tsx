import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../../lib/posts/types';
import { useAuth } from '../../lib/auth';

interface PostActionsProps {
  post: Post;
  onLike: () => void;
  onUnlike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export function PostActions({ 
  post, 
  onLike, 
  onUnlike, 
  onComment, 
  onShare,
}: PostActionsProps) {
  const { user } = useAuth();
  const isLiked = user ? post.likes.includes(user.id) : false;

  return (
    <div className="flex items-center justify-between border-t p-4">
      <button 
        onClick={isLiked ? onUnlike : onLike}
        className={`flex items-center gap-2 ${
          isLiked ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
        }`}
        disabled={!user}
      >
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        <span>{post.likes.length}</span>
      </button>
      <button 
        onClick={onComment}
        className="flex items-center gap-2 text-gray-600 hover:text-green-600"
      >
        <MessageCircle className="h-5 w-5" />
        <span>{post.comments}</span>
      </button>
      <button 
        onClick={onShare}
        className="flex items-center gap-2 text-gray-600 hover:text-green-600"
      >
        <Share2 className="h-5 w-5" />
        <span>Share</span>
      </button>
    </div>
  );
}