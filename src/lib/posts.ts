import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: number;
  timestamp: string;
}

interface PostsState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp'>) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  commentOnPost: (id: string) => void;
}

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
    }
  )
);