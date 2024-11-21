/* eslint-disable no-unused-vars */
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
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    const id = localStorage.getItem('userID');
    if (!id) {
      navigate('/login');
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
    const id = localStorage.getItem('userID');
    try {
      const response = await fetch(`http://localhost:8080/api/Member/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.removeItem('userID');
        navigate("/login");
      } else {
        console.error("Error deleting account:", response.statusText);
        alert("Failed to delete the account. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account", error);
      alert("Failed to delete the account. Please try again.");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);  // popup visibility
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
                onClick={togglePopup}
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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete your account?</p>
            <div className="popup-buttons">
              <button className="popup-button yes" onClick={handleDelete}>Yes</button>
              <button className="popup-button no" onClick={togglePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemberProfile;