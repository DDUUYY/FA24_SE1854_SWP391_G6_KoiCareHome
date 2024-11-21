// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoBlog from '../assets/LogoBlog.jpg';
import './BlogCreator.css'; // Import CSS cho trang

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

    // Kiểm tra xem tiêu đề và nội dung có rỗng không
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    // Chuẩn bị dữ liệu cho bài viết
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

    // Gửi yêu cầu tạo bài viết tới server
    axios.post('/api/blogposts/create', postData)
      .then(response => {
        console.log('Server response:', response);
        setMessage('Post created successfully!');
        setError('');
        navigate('/public-blogs'); // Điều hướng đến trang blog công khai sau khi tạo thành công
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setError('Failed to create post. Please try again.');
        setMessage('');
      });
  };

  return (
    <div className="blog-creator-container">
      {/* Nút "Back to Home" */}
      <div className="navbar">
        <img 
          src={LogoBlog} 
          alt="Back to Public Blog"  
          className="home-icon" 
          onClick={() => navigate('/public-blogs')} 
        />
      </div>

      <h2>Create Blog</h2>
      
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {/* Trường nhập tiêu đề */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
        maxLength={255} // Giới hạn 255 ký tự cho Title
      />
      
      {/* Trường nhập nội dung */}
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea-field"
        maxLength={255} // Giới hạn 255 ký tự cho Content
      />

      {/* Trường nhập tác giả (tùy chọn) */}
      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="input-field"
        maxLength={255} // Giới hạn 255 ký tự cho Author
      />

      {/* Nút lưu bài viết */}
      <button onClick={handleSave} className="save-button">Save</button>
    </div>
  );
};

export default BlogCreator;
