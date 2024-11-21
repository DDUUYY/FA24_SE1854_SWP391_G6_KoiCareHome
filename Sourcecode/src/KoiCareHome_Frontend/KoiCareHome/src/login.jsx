import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 19, 2024
 */

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        // Save the user ID to localStorage 
        localStorage.setItem('userID', data);
        navigate('/home');
      })
      .catch((error) => {
        setErrorMessage(error.message || 'Login failed');
      });
  };

  return (
    <div className="login-signup-bg">
        <section>
            <form onSubmit={handleSubmit}>
                <h1 className="title">Login</h1>
                {errorMessage && (
                    <div className="dialog-row">
                        <label className="text-center redText">{errorMessage}</label>
                    </div>
                )}
                <div className="inputbox">
                    <input name="email" id="email" type="email" required />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="inputbox">
                    <input name="password" type="password" id="password" required />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit">Log in</button>
                <div className="register">
                    <p>
                        Do not have an account? <a href="/signup">Register!!</a>
                    </p>
                </div>
            </form>
        </section>
    </div>
  );
};

export default Login;