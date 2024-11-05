// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './BlogEditor.css';

const BlogEditor = ({ existingPost, onSave }) => {
  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [author, setAuthor] = useState(existingPost?.author || ''); // Cho phép người dùng nhập author
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    // Reset message và error trước khi bắt đầu quá trình lưu
    setMessage('');
    setError('');

    // Kiểm tra điều kiện rỗng cho tiêu đề và nội dung
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    // Lấy memberID từ localStorage và kiểm tra nếu tồn tại
    const memberID = localStorage.getItem('userID');
    if (!memberID) {
      setError('User ID not found. Please log in again.');
      return;
    }

    // Kiểm tra và đặt giá trị mặc định cho author nếu trống
    const authorToSave = author.trim() ? author : 'Unknown User';

    // Tạo đối tượng postData để gửi đến backend
    const postData = { 
      title, 
      content, 
      author: authorToSave, 
      memberId: parseInt(memberID, 10) // Đảm bảo `memberId` là số nguyên
    };

    // Gửi yêu cầu tạo hoặc chỉnh sửa bài viết
    const request = existingPost && existingPost.id
      ? axios.put(`/api/blogposts/edit/${existingPost.id}`, postData)
      : axios.post('/api/blogposts/create', postData);

      request
      .then(response => {
        console.log('Server response:', response);
        setMessage('Post saved successfully!');
        setError(''); // Xóa thông báo lỗi nếu lưu thành công
        if (onSave && typeof onSave === 'function') {
          onSave();
        } else {
          console.error('onSave is not a function or is undefined');
        }
      })
      .catch(error => {
        console.error('Error saving post:', error);
        setError(`Failed to save post: ${error.response?.data?.message || 'Please try again.'}`);
        setMessage(''); // Xóa thông báo thành công nếu lưu thất bại
      });
  };

  return (
    <div className="blog-editor-container">
      <h2>{existingPost ? 'Edit Blog' : 'Create Blog'}</h2>
      
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

BlogEditor.propTypes = {
  existingPost: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default BlogEditor;
