import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import PostForm from './components/PostForm';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/edit/:id" element={<PostForm />} />
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;
