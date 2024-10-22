// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import './home.css';
import GrCard from '../src/Card/GrCard'; 

const Home = () => {
    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="logo">KoiCareHome</div>
                <div className="manage-fish-link">
                    <Link to="/manage-fish">Manage Fish</Link>
                </div>
                <div className="user-icon">
                    <Link to="/profile">
                        <FaRegUserCircle />
                    </Link>
                </div>
            </nav>
            <div className="card-container">
                <GrCard /> 
            </div>
        </div>
    );
};

export default Home;