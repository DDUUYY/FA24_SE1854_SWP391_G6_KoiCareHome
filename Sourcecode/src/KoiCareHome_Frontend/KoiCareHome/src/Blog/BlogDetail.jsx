// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoBlog from '../assets/LogoBlog.jpg'; // Import hình ảnh nút Back to Public Blog
import './BlogDetail.css'; // Import CSS

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Lấy chi tiết blog hiện tại
  useEffect(() => {
    axios.get(`/api/blogposts/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => {
        console.error('Error loading blog details:', error);
        setError('Failed to load blog details.');
      });
  }, [id]);

  // Lấy danh sách các blog khác
  useEffect(() => {
    axios.get('/api/blogposts/public')
      .then(response => {
        const filteredBlogs = response.data.filter(post => post.postId !== parseInt(id));
        setOtherBlogs(filteredBlogs);
      })
      .catch(error => console.error('Error fetching other blogs:', error));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail-container">
      {/* Nút "Back to Public Blog" */}
      <div className="back-button-container">
        <img 
          src={LogoBlog} 
          alt="Back to Public Blog" 
          className="back-button-icon" 
          onClick={() => navigate('/public-blogs')} 
        />
      </div>

      {/* Chi tiết blog */}
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-author"><strong>Author:</strong> {blog.author}</p>
      {blog.publishDate && <p className="blog-date"><strong>Published on:</strong> {new Date(blog.publishDate).toLocaleDateString()}</p>}
      <div className="blog-content">{blog.content}</div>

      {/* Danh sách các blog khác */}
      <h2>Other Blogs</h2>
      <ul className="other-blogs-list">
        {otherBlogs.map(post => (
          <li key={post.postId} className="other-blog-item">
            <span className="other-blog-title" onClick={() => navigate(`/blogs/${post.postId}`)}>
              {post.title}
            </span>
            <p className="other-blog-author">by {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetail;
