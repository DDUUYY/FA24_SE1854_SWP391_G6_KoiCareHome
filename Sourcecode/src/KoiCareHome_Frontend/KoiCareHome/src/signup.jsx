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
<<<<<<< HEAD
  const navigate = useNavigate();  
=======
  const navigate = useNavigate();
>>>>>>> GrowthRecord

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
=======

    const { phoneNumber, password, confirmPassword, email, firstName, lastName } = formData;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(password)) {
      setErrorMessage("Password must be at least 7 characters long, containing at least one letter and one number.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
>>>>>>> GrowthRecord
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
<<<<<<< HEAD
          alert('Signup successful!'); // Notify user of success
          navigate('/login');  // Redirect to login page after successful signup
=======
          alert('Signup successful!');
          navigate('/login');
>>>>>>> GrowthRecord
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
<<<<<<< HEAD
        setErrorMessage(error.message || 'Signup failed'); // Set error message
=======
        setErrorMessage(error.message || 'Signup failed');
>>>>>>> GrowthRecord
      });
  };

  return (
    <body className="login-signup-bg">
<<<<<<< HEAD
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
=======
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
>>>>>>> GrowthRecord
    </body>
  );
};

export default Signup;