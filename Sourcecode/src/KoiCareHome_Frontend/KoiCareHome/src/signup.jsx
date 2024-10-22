import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 19, 2024
 */

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Hook to navigate after signup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const data = JSON.stringify(formData);
    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successful!'); // Notify user of success
          navigate('/login');  // Redirect to login page after successful signup
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        setErrorMessage(error.message || 'Signup failed'); // Set error message
      });
  };

  return (
    <body className="login-signup-bg">
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="title">Sign Up</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div className="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className="inputbox">
          <ion-icon name="mail-outline"></ion-icon>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="inputbox">
          <ion-icon name="call-outline"></ion-icon>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>
        <button type="submit">Sign Up</button>
        <div className="register">
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </form>
    </section>
    </body>
  );
};

export default Signup;