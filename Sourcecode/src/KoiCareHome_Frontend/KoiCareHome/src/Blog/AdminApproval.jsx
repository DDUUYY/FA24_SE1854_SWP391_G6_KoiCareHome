// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApproval = () => {
  const [pendingPosts, setPendingPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/blogposts/pending')
      .then(response => setPendingPosts(response.data))
      .catch(error => console.error('Error fetching pending posts:', error));
  }, []);

  const approvePost = (id) => {
    axios.patch(`/api/blogposts/${id}/approve`)
      .then(() => setPendingPosts(pendingPosts.filter(post => post.id !== id)))
      .catch(error => console.error('Error approving post:', error));
  };

  const rejectPost = (id) => {
    axios.patch(`/api/blogposts/${id}/reject`)
      .then(() => setPendingPosts(pendingPosts.filter(post => post.id !== id)))
      .catch(error => console.error('Error rejecting post:', error));
  };

  return (
    <div>
      <h1>Pending Blog Posts</h1>
      <ul>
        {pendingPosts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => approvePost(post.id)}>Approve</button>
            <button onClick={() => rejectPost(post.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminApproval;
