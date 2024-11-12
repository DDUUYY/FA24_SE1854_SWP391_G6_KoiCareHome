// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogCreator = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    setMessage('');
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    const memberID = localStorage.getItem('userID');
    if (!memberID) {
      setError('User ID not found. Please log in again.');
      return;
    }

    const postData = {
      title,
      content,
      author: author.trim() ? author : 'Unknown User',
      memberId: parseInt(memberID, 10),
    };

    axios.post('/api/blogposts/create', postData)
      .then(response => {
        console.log('Server response:', response);
        setMessage('Post created successfully!');
        setError('');
        navigate('/public-blogs');
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setError('Failed to create post. Please try again.');
        setMessage('');
      });
  };

  return (
    <div className="blog-editor-container">
      <h2>Create Blog</h2>
      
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BlogCreator;
