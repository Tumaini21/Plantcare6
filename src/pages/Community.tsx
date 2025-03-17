import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CreatePostForm } from '../components/community/CreatePostForm';
import { PostCard } from '../components/community/PostCard';
import { EmptyState } from '../components/community/EmptyState';
import { useAuth } from '../lib/auth';
import { usePosts } from '../lib/posts/store';
import toast from 'react-hot-toast';

export function CommunityPage() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { user } = useAuth();
  const { posts, addPost, deletePost, likePost, unlikePost, commentOnPost } = usePosts();

  const handleCreatePost = (data: any) => {
    if (!user) return;
    
    addPost({
      user: {
        name: user.name,
        avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      },
      content: data.content,
      image: data.image,
    });
    setShowCreatePost(false);
    toast.success('Post created successfully!');
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    toast.success('Post deleted successfully');
  };

  const handleLike = (id: string) => {
    if (!user) {
      toast.error('Please sign in to like posts');
      return;
    }
    likePost(id, user.id);
  };

  const handleUnlike = (id: string) => {
    if (!user) return;
    unlikePost(id, user.id);
  };

  const handleComment = (id: string) => {
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }
    commentOnPost(id);
    toast.success('Comments feature coming soon!');
  };

  const handleShare = (id: string) => {
    const url = `${window.location.origin}/community/post/${id}`;
    navigator.clipboard.writeText(url);
    toast.success('Post link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Community</h1>
          <p className="text-gray-600">Share and connect with other plant enthusiasts</p>
        </div>
        <Button onClick={() => setShowCreatePost(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      {showCreatePost && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium">Create a Post</h2>
          <CreatePostForm
            onClose={() => setShowCreatePost(false)}
            onSubmit={handleCreatePost}
          />
        </div>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onUnlike={handleUnlike}
              onComment={handleComment}
              onShare={handleShare}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}