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

    console.log('Login attempt with:', { email, password }); // In ra để kiểm tra

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Giả sử API trả về JSON
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        console.log('Login response data:', data); // In ra toàn bộ dữ liệu nhận được từ API

        // Xử lý nếu data là số (ví dụ: userID)
        if (typeof data === 'number') {
          localStorage.setItem('userID', data); // Lưu userID vào localStorage
          console.log('User ID stored:', data);
          navigate('/home');
        }
        // Xử lý nếu data là một đối tượng JSON có userID
        else if (data.userID) {
          localStorage.setItem('userID', data.userID); // Lưu userID vào localStorage
          console.log('User ID stored:', data.userID);
          navigate('/home');
        } else {
          throw new Error('userID not found in response');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error.message);
      });
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;

  //   console.log('Login attempt with:', { email, password }); // In ra để kiểm tra

  //   fetch('http://localhost:8080/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         return response.text().then((text) => {
  //           throw new Error(text);
  //         });
  //       }
  //     })
  //     .then((data) => {
  //       console.log('Login response data:', data); // In ra toàn bộ dữ liệu nhận được từ API
  //       // Kiểm tra xem userID và token có tồn tại trong phản hồi không
  //       if (data.userID && data.token) {
  //         localStorage.setItem('userID', data.userID); // Lưu userID vào localStorage
  //         localStorage.setItem('token', data.token); // Lưu token vào localStorage
  //         console.log('User ID stored:', data.userID);
  //         console.log('Token stored:', data.token);
  //         navigate('/home');
  //       } else {
  //         throw new Error('userID or token not found in response');
  //       }
  //     })

  // };

  return (
    <div className="login-signup-bg">
      <section >
        <form onSubmit={handleSubmit}>
          <h1 className="title" >Login</h1>
          {errorMessage && (
            <div className="dialog-row">
              <label className="text-center redText">{errorMessage}</label>
            </div>
          )}
          <div className="inputbox">
            <ion-icon name="email-outline"></ion-icon>
            <input name="email" id="email" type="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
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