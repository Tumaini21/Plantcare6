import { usePosts } from './store';
import toast from 'react-hot-toast';

export function deletePost(id: string) {
  try {
    usePosts.getState().deletePost(id);
    toast.success('Post deleted successfully');
  } catch (error) {
    console.error('Failed to delete post:', error);
    toast.error('Failed to delete post');
  }
}

export function sharePost(id: string) {
  try {
    const url = `${window.location.origin}/community/post/${id}`;
    navigator.clipboard.writeText(url);
    toast.success('Post link copied to clipboard!');
  } catch (error) {
    console.error('Failed to share post:', error);
    toast.error('Failed to share post');
  }
}