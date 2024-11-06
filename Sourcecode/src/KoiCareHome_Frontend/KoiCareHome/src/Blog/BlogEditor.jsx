// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogEditor = () => {
  const { id } = useParams(); // Lấy ID của bài viết từ URL
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Chỉ tải dữ liệu nếu có ID
    if (id) {
      axios.get(`/api/blogposts/${id}`)
        .then(response => {
          const { title, content, author } = response.data;
          setTitle(title);
          setContent(content);
          setAuthor(author || 'Unknown Author'); // Thiết lập tác giả mặc định nếu không có
        })
        .catch(error => {
          console.error('Error loading post:', error);
          setError('Failed to load post. Please try again.');
        });
    }
  }, [id]);

  const handleSave = () => {
    setMessage('');
    setError('');

    // Kiểm tra rỗng cho tiêu đề và nội dung
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    // Chuẩn bị dữ liệu để gửi lên server
    const postData = { title, content, author: author || 'Unknown Author' };

    // Quyết định phương thức gọi API: PUT cho chỉnh sửa và POST cho tạo mới
    const request = id
      ? axios.put(`/api/blogposts/edit/${id}`, postData)
      : axios.post('/api/blogposts/create', postData);

    request
      .then(response => {
        console.log('Server response:', response);
        setMessage(id ? 'Post updated successfully!' : 'Post created successfully!');
        setError('');
        
        // Điều hướng về trang "View Your Blogs" sau khi lưu thành công
        navigate('/public-blogs');
      })
      .catch(error => {
        console.error('Error saving post:', error);
        setError(id ? 'Failed to update post. Please try again.' : 'Failed to create post. Please try again.');
        setMessage('');
      });
  };

  return (
    <div className="blog-editor-container">
      <h2>{id ? 'Edit Blog' : 'Create Blog'}</h2>

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
      <button onClick={handleSave}>{id ? 'Update' : 'Create'}</button>
    </div>
  );
};

export default BlogEditor;
