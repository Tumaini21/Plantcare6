import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post, PostsState } from './types';
import { getCurrentVersion, migrateState } from './migrations';

export const usePosts = create<PostsState>()(
  persist(
    (set) => ({
      posts: [],
      addPost: (post) =>
        set((state) => ({
          posts: [
            {
              ...post,
              id: crypto.randomUUID(),
              likes: [],
              comments: 0,
              timestamp: new Date().toISOString(),
            },
            ...state.posts,
          ],
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
      likePost: (postId, userId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, likes: [...post.likes, userId] }
              : post
          ),
        })),
      unlikePost: (postId, userId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, likes: post.likes.filter((id) => id !== userId) }
              : post
          ),
        })),
      commentOnPost: (id) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, comments: post.comments + 1 } : post
          ),
        })),
    }),
    {
      name: 'posts-storage',
      version: getCurrentVersion(),
      migrate: migrateState,
    }
  )
);