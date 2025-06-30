import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { fetchPost } from '../api/apiService';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetchPost(id);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-page">
      <Navbar />
      <div className="container">
        <h1>{post.title}</h1>
        <div className="post-meta">
          {post.category && <span className="category">{post.category.name}</span>}
        </div>
        <div className="post-content">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
