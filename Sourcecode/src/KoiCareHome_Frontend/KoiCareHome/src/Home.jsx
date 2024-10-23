// eslint-disable-next-line no-unused-vars
import React from 'react';
import './home.css';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Koi_Img from './assets/Koi_Img.jpg';
import Calculator from './assets/Calculator.jpg';
import Feeding_Img from './assets/FeedingFood.jpg';

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

            <Link to="/manage-fish">
                <div className="card">
                    <img className="card-image" src={Koi_Img} alt="Koi"></img>
                    <h2 className="card-title">ManageKoi</h2>
                    <p className="card-description">Users manage their own Kois</p>
                </div>
            </Link>

            <Link to="/calulator/food">
                <div className="card">
                    <img className="card-image" src={Calculator} alt="FoodCalculator"></img>
                    <h2 className="card-title">FoodCalculator</h2>
                    <p className="card-description"></p>
                </div>
            </Link>

            <Link to="/consume-food-history">
                <div className="card">
                    <img className="card-image" src={Feeding_Img} alt="FeedingFish"></img>
                    <h2 className="card-title">FeedingHistory</h2>
                    <p className="card-description"></p>
                </div>
            </Link>
        </div>
    );
};

export default Home;