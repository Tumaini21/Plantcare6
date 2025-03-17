import { PostsState } from './types';

export const migrations = {
  0: (state: any) => {
    // Initial migration: Ensure all posts have likes array
    return {
      ...state,
      posts: state.posts.map((post: any) => ({
        ...post,
        likes: Array.isArray(post.likes) ? post.likes : [],
      })),
    };
  },
  1: (state: any) => {
    // Migration: Ensure all posts have comments number
    return {
      ...state,
      posts: state.posts.map((post: any) => ({
        ...post,
        comments: typeof post.comments === 'number' ? post.comments : 0,
      })),
    };
  },
};

export const getCurrentVersion = () => Object.keys(migrations).length;

export function migrateState(persistedState: any, version: number): PostsState {
  let state = persistedState;

  // Apply each migration sequentially
  for (let i = version; i < getCurrentVersion(); i++) {
    if (migrations[i]) {
      state = migrations[i](state);
    }
  }

  return state;
}