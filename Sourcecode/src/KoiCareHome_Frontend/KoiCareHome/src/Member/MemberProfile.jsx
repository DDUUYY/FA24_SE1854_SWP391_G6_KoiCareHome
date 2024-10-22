// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './MemberProfile.css';
import UserProfile from "../assets/User_Profile.jpg";

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 19, 2024
 */

const MemberProfile = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    const id = localStorage.getItem('userID'); // Get the ID from localStorage
    if (!id) {
      navigate('/login'); // Redirect to login if no ID found
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/Member/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMember(data);
      } else {
        console.error("Error loading member data:", response.statusText);
      }
    } catch (error) {
      console.error("Error loading member data", error);
    }
  };

  const handleDelete = async () => {
    const id = localStorage.getItem('userID'); // Get the ID from localStorage
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/Member/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.removeItem('userID'); // Remove the userID from localStorage
          navigate("/login");
        } else {
          console.error("Error deleting account:", response.statusText);
          alert("Failed to delete the account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account", error);
        alert("Failed to delete the account. Please try again.");
      }
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-content">
          <img
              src={UserProfile}
              alt="User Profile"
              className="profile-avatar"
            />
            <div className="profile-buttons">
              <button
                type="button"
                className="profile-button"
                onClick={() => navigate(`/UpdateMember/${localStorage.getItem('userID')}`)} 
              >
                Update
              </button>
              <button
                type="button"
                className="profile-button delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <button
              type="button"
              className="profile-button back-button"
              onClick={() => navigate(`/home`)}
            >
              Back
            </button>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="label">First Name:</span>
            <span className="value">{member.firstName}</span>
          </div>
          <hr />
          <div className="detail-row">
            <span className="label">Last Name:</span>
            <span className="value">{member.lastName}</span>
          </div>
          <hr />
          <div className="detail-row">
            <span className="label">Email:</span>
            <span className="value">{member.email}</span>
          </div>
          <hr />
          <div className="detail-row">
            <span className="label">Phone:</span>
            <span className="value">{member.phoneNumber}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberProfile;