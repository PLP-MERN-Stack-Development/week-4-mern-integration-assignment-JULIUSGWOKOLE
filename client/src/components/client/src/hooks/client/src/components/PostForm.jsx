import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { fetchPost, createPost, updatePost } from '../api/apiService';

const PostForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { categories, addPost, updatePostInList } = useBlog();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const loadPost = async () => {
        setLoading(true);
        try {
          const response = await fetchPost(id);
          setFormData({
            title: response.data.title,
            content: response.data.content,
            category: response.data.category._id
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadPost();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        const response = await updatePost(id, formData);
        updatePostInList(response.data);
      } else {
        const response = await createPost(formData);
        addPost(response.data);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.title) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;
