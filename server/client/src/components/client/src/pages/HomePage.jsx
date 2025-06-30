import PostList from '../components/PostList';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="container">
        <h1>Latest Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
