import './UpdateMember.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 19, 2024
 */

const UpdateMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/Member/${id}`);
        const data = await response.json();
        setFormData({
          ...data,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });
      } catch (error) {
        console.error("Error fetching member data:", error.message);
      }
    };

    fetchMember();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const updatePayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      };

      // Include new password only if provided
      if (formData.newPassword) {
        updatePayload.password = formData.newPassword;
      }

      const response = await fetch(`http://localhost:8080/api/Member/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Member updated:", data);
        navigate(`/profile`);
      } else {
        setError("Error updating member.");
      }
    } catch (error) {
      setError("Error updating member: " + error.message);
    }
  };

  const handleBack = () => {
    navigate(`/profile`);
  };

  return (
    <div className="update-member-form-container">
      <h1 className="update-member-title">Update your information</h1>
      {error && <p className="update-member-error">{error}</p>}
      <form onSubmit={handleSubmit} className="update-member-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="update-member-input"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          className="update-member-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="update-member-input"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="update-member-input"
        />
        
        {/* Password update are optional */}
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleInputChange}
          className="update-member-input"
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
          className="update-member-input"
        />
        <button type="submit" className="update-member-submit-btn">Update </button>
        <button type="button" className="back-button" onClick={handleBack}>Back</button>
      </form>
    </div>
  );
};

export default UpdateMember;