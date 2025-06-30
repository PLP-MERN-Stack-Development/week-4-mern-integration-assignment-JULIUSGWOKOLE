import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPosts, fetchCategories } from '../api/apiService';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetchPosts();
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const updatePostInList = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  const removePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  return (
    <BlogContext.Provider value={{
      posts,
      categories,
      loading,
      error,
      addPost,
      updatePostInList,
      removePost,
      refreshPosts: loadPosts,
      refreshCategories: loadCategories
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
