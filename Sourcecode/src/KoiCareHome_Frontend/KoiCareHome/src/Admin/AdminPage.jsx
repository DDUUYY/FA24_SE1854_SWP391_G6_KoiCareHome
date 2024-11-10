// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [members, setMembers] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const navigate = useNavigate();

  // Kiểm tra quyền truy cập khi component mount
  useEffect(() => {
    const userRoleID = localStorage.getItem('userRoleID');
    if (userRoleID !== "2") { // Kiểm tra nếu không phải Admin (roleID = 2)
      navigate('/login'); // Nếu không phải Admin, điều hướng về trang login
    }
  }, [navigate]);

  // Tải danh sách thành viên
  useEffect(() => {
    fetchMembers();
    fetchPendingPosts();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/admin/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  // Tải danh sách bài viết chờ duyệt
  const fetchPendingPosts = async () => {
    try {
      const response = await axios.get('/api/blogposts/pending');
      setPendingPosts(response.data);
    } catch (error) {
      console.error('Error fetching pending posts:', error);
    }
  };

  // Thay đổi trạng thái thành viên
  const toggleMemberStatus = async (memberId) => {
    try {
      await axios.post(`/api/admin/members/block/${memberId}`);
      fetchMembers();
    } catch (error) {
      console.error('Error toggling member status:', error);
    }
  };

  // Duyệt bài viết
  const reviewPost = async (postId, approved, reason = '') => {
    try {
      await axios.put(`/api/blogposts/review/${postId}`, null, {
        params: { approved, reason },
      });
      fetchPendingPosts();
    } catch (error) {
      console.error('Error reviewing post:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Manage Members</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.MemberID}>
              <td>{member.MemberID}</td>
              <td>{member.FirstName} {member.LastName}</td>
              <td>{member.email}</td>
              <td>{member.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button 
                  className={`status-btn ${member.isActive ? 'block' : 'unblock'}`}
                  onClick={() => toggleMemberStatus(member.MemberID)}
                >
                  {member.isActive ? 'Block' : 'Unblock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Review Blog Posts</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingPosts.map((post) => (
            <tr key={post.postId}>
              <td>{post.postId}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>
                <button 
                  className="approve-btn"
                  onClick={() => reviewPost(post.postId, true)}
                >
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => reviewPost(post.postId, false, 'Reason for rejection')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
