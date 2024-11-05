// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogEditor from './BlogEditor';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [showEditor, setShowEditor] = useState(false); 
  const [editingPost, setEditingPost] = useState(null); 

  const fetchPosts = () => {
    axios.get('/api/blogposts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = () => {
    setShowEditor(false);
    setEditingPost(null);
    fetchPosts();
  };

  const handleCreate = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <button onClick={handleCreate}>Create New Post</button>

      {showEditor && <BlogEditor existingPost={editingPost} onSave={handleSave} />}

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/blogs/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </Link>
            <button onClick={() => handleEdit(post)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
