// eslint-disable-next-line no-unused-vars
import React from 'react';
import './home.css';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import GrCard from './Card/GrCard';
import ManageFishCard from './Card/ManageFishCard';
import FeedingHistoryCard from './Card/FeedingHistoryCard';
import FoodCalculatorCard from './Card/FoodCalculatorCard';

const Home = () => {
    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="logo">KoiCareHome</div>
                <div className="user-icon">
                    <Link to="/profile">
                        <FaRegUserCircle />
                    </Link>
                </div>
            </nav>

            <div className="card-container">
                <GrCard /> 
                <ManageFishCard />
                <FeedingHistoryCard />
                <FoodCalculatorCard />
            </div>
        </div>
    );
};

export default Home;