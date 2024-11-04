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
      axios.put(`/api/blogposts/${existingPost.id}`, postData)
        .then(onSave)
        .catch(error => console.error('Error updating post:', error));
    } else {
      axios.post('/api/blogposts', postData)
        .then(onSave)
        .catch(error => console.error('Error creating post:', error));
    }
  };

  return (
    <div className="blog-editor-container">
      <h2>{existingPost ? 'Edit Blog' : 'Create Blog'}</h2>
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
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

BlogEditor.propTypes = {
  existingPost: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default BlogEditor;
