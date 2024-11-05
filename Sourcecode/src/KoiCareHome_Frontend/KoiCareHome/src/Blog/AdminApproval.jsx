// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApproval = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [rejectionReasons, setRejectionReasons] = useState({}); // Trạng thái lưu lý do từ chối

  useEffect(() => {
    // Lấy danh sách các bài viết chờ duyệt từ server
    axios.get('/api/blogposts/pending')
      .then(response => setPendingPosts(response.data))
      .catch(error => console.error('Error fetching pending posts:', error));
  }, []);

  // Hàm duyệt bài viết
  const approvePost = (id) => {
    axios.put(`/api/blogposts/review/${id}`, null, {
      params: {
        approved: true,
      }
    })
      .then(() => setPendingPosts(pendingPosts.filter(post => post.id !== id))) // Loại bỏ bài viết khỏi danh sách sau khi duyệt
      .catch(error => console.error('Error approving post:', error));
  };

  // Hàm từ chối bài viết
  const rejectPost = (id) => {
    const reason = rejectionReasons[id] || "The blog does not comply with community standards.";
    axios.put(`/api/blogposts/review/${id}`, null, {
      params: {
        approved: false,
        reason: reason
      }
    })
      .then(() => setPendingPosts(pendingPosts.filter(post => post.id !== id))) // Loại bỏ bài viết khỏi danh sách sau khi từ chối
      .catch(error => console.error('Error rejecting post:', error));
  };

  // Cập nhật lý do từ chối trong trạng thái
  const handleReasonChange = (id, value) => {
    setRejectionReasons(prev => ({ ...prev, [id]: value }));
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
            <textarea
              placeholder="Enter rejection reason (optional)"
              value={rejectionReasons[post.id] || ''}
              onChange={(e) => handleReasonChange(post.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminApproval;
