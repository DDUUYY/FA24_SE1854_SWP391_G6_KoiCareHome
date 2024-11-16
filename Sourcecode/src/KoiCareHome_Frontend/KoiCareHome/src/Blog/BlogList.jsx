// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/HomeButton.png'; // Import hình ảnh nút Home
import './BlogList.css'; // Import CSS

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [isUserView, setIsUserView] = useState(false);
  const navigate = useNavigate();

  // Lấy danh sách blog công khai
  const fetchPublicBlogs = () => {
    axios.get('/api/blogposts/public')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching public posts:', error));
  };

  // Lấy danh sách blog của người dùng hiện tại
  const fetchUserBlogs = () => {
    const userId = localStorage.getItem('userID');
    axios.get(`/api/blogposts/member/${userId}`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching user posts:', error));
  };

  // Fetch dữ liệu dựa vào chế độ xem
  useEffect(() => {
    if (isUserView) {
      fetchUserBlogs();
    } else {
      fetchPublicBlogs();
    }
  }, [isUserView]);

  return (
    <div className="blog-list-container">
      {/* Nút "Back to Home" */}
      <div className="navbar">
        <img 
          src={HomeIcon} 
          alt="Back to Home" 
          className="home-icon" 
          onClick={() => navigate('/home')} 
        />
      </div>

      <h1>{isUserView ? 'Your Blogs' : 'Public Blogs'}</h1>
      
      {/* Nút chuyển đổi chế độ xem và tạo blog */}
      <div className="buttons-container">
        <button 
          className={`switch-view-btn ${!isUserView && 'active'}`} 
          onClick={() => setIsUserView(false)}
        >
          Public Blogs
        </button>
        <button 
          className={`switch-view-btn ${isUserView && 'active'}`} 
          onClick={() => setIsUserView(true)}
        >
          Your Blogs
        </button>
        <button className="create-blog-btn" onClick={() => navigate('/create-blog')}>
          Create Blog
        </button>
      </div>

      {/* Danh sách các bài blog */}
      <ul className="blog-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <li key={post.postId} className="blog-item">
              <Link to={`/blogs/${post.postId}`} className="blog-link">
                <h2>{post.title}</h2>
                <p>{post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}</p>
                <p><strong>Author:</strong> {post.author}</p>
                <p><strong>Status:</strong> {post.status}</p>
                {post.publishDate && <p><strong>Published on:</strong> {new Date(post.publishDate).toLocaleDateString()}</p>}
              </Link>
              {isUserView && (
                <button className="edit-btn" onClick={() => navigate(`/edit-blog/${post.postId}`)}>Edit</button>
              )}
            </li>
          ))
        ) : (
          <p className="no-posts-message">No posts available</p>
        )}
      </ul>
    </div>
  );
};

export default BlogList;
