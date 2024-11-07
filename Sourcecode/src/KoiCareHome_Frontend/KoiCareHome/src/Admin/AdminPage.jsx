// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [members, setMembers] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);

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

  const fetchPendingPosts = async () => {
    try {
      const response = await axios.get('/api/blogposts/pending');
      setPendingPosts(response.data);
    } catch (error) {
      console.error('Error fetching pending posts:', error);
    }
  };

  const toggleMemberStatus = async (memberId) => {
    try {
      await axios.post(`/api/admin/members/block/${memberId}`);
      fetchMembers();
    } catch (error) {
      console.error('Error toggling member status:', error);
    }
  };

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
    <div>
      <h2>Quản lý Members</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
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
                <button onClick={() => toggleMemberStatus(member.MemberID)}>
                  {member.isActive ? 'Khóa' : 'Mở khóa'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Duyệt BlogPost</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pendingPosts.map((post) => (
            <tr key={post.postId}>
              <td>{post.postId}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>
                <button onClick={() => reviewPost(post.postId, true)}>Duyệt</button>
                <button onClick={() => reviewPost(post.postId, false, 'Lý do từ chối')}>
                  Từ chối
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
