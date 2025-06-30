import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Blog App</Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/posts/new">New Post</Link>
        <Link to="/categories">Categories</Link>
      </div>
    </nav>
  );
};

export default Navbar;
