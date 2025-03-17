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

export interface PostsState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp'>) => void;
  deletePost: (id: string) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  commentOnPost: (id: string) => void;
}