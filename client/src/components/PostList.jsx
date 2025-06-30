import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const PostList = () => {
  const { posts, loading, error } = useBlog();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <h3>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </h3>
          <p>{post.content.substring(0, 100)}...</p>
          {post.category && <span className="category">{post.category.name}</span>}
          <Link to={`/posts/edit/${post._id}`} className="edit-link">Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
