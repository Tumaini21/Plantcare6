import React from 'react';
import { formatRelativeTime } from '../../lib/utils';
import { Post } from '../../lib/posts/types';
import { PostHeader } from './PostHeader';
import { PostActions } from './PostActions';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PostCard({ 
  post, 
  onLike, 
  onUnlike, 
  onComment, 
  onShare,
  onDelete 
}: PostCardProps) {
  return (
    <div className="rounded-lg bg-white shadow">
      <PostHeader 
        post={post} 
        onDelete={() => onDelete(post.id)} 
      />
      
      <p className="px-4 py-2">{post.content}</p>
      
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="aspect-video w-full object-cover"
        />
      )}

      <PostActions
        post={post}
        onLike={() => onLike(post.id)}
        onUnlike={() => onUnlike(post.id)}
        onComment={() => onComment(post.id)}
        onShare={() => onShare(post.id)}
      />
    </div>
  );
}