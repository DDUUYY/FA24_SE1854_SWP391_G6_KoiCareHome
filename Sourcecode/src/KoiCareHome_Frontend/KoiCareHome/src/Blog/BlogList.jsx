// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    if (isUserView) {
      fetchUserBlogs();
    } else {
      fetchPublicBlogs();
    }
  }, [isUserView]);

  return (
    <div>
      <h1>{isUserView ? 'Your Blogs' : 'Public Blogs'}</h1>
      <button onClick={() => setIsUserView(false)}>Public Blogs</button>
      <button onClick={() => setIsUserView(true)}>View Your Blogs</button>
      <button onClick={() => navigate('/create-blog')}>Create Your Blog</button>

      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            <Link to={`/blogs/${post.postId}`}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>Author: {post.author}</p>
              <p>Status: {post.status}</p>
              {post.publishDate && <p>Published on: {post.publishDate}</p>}
            </Link>
            {isUserView && (
              <button onClick={() => navigate(`/edit-blog/${post.postId}`)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
