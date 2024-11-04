// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './BlogEditor.css';

const BlogEditor = ({ existingPost, onSave }) => {
  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');

  const handleSave = () => {
    const postData = { title, content };
    if (existingPost && existingPost.id) {
      // Cập nhật bài viết
      axios.put(`/api/blogposts/${existingPost.id}`, postData)
        .then(onSave)
        .catch(error => console.error('Error updating post:', error));
    } else {
      // Tạo mới bài viết
      axios.post('/api/blogposts', postData)
        .then(onSave)
        .catch(error => console.error('Error creating post:', error));
    }
  };

  return (
    <div>
      <h2>{existingPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Nội dung"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Lưu</button>
    </div>
  );
};

// Kiểm tra kiểu dữ liệu của props bằng PropTypes
BlogEditor.propTypes = {
  existingPost: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default BlogEditor;
