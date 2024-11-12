
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import './home.css';
import GrCard from '../src/Card/GrCard';
import Koi_Img from './assets/Koi_Img.jpg';
import KoiGraphic from './assets/Welcome.jpg';
import LogoKoiFish from './assets/logokoifish.png';

import SaltCalculator from './assets/calculator.jpg';
import Order from './assets/order.png';



=======
import {  useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import './home.css';
import GrCard from '../src/Card/GrCard'; 
import KoiGraphic from './assets/Welcome.jpg'; 
import LogoKoiFish from './assets/logokoifish.png';
import ManageFishCard from './Card/ManageFishCard';
import FeedingHistoryCard from './Card/FeedingHistoryCard';
import FoodCalculatorCard from './Card/FoodCalculatorCard';
>>>>>>> GrowthRecord

const Home = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

<<<<<<< HEAD


=======
>>>>>>> GrowthRecord
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
<<<<<<< HEAD
        navigate('/login');
=======
        localStorage.removeItem('userID');  // Optionally clear user data
        navigate('/login', { replace: true });  // This replaces the current page in the history stack
>>>>>>> GrowthRecord
    };

    const handleProfile = () => {
        navigate('/profile');
    };

<<<<<<< HEAD
    // Refs for smooth scrolling
    const homeRef = useRef(null);
    const featureRef = useRef(null);

    const orderRef = useRef(null);


=======
    const homeRef = useRef(null);
    const featureRef = useRef(null);

>>>>>>> GrowthRecord
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-container">

            <nav className="navbar sticky-navbar">
<<<<<<< HEAD
                <div className="logo-container" onClick={() => scrollToSection(homeRef)}>
=======
            <div className="logo-container" onClick={() => scrollToSection(homeRef)}>
>>>>>>> GrowthRecord
                    <img src={LogoKoiFish} alt="Logo Koi Fish" className="logo-image" />
                    <div className="logo-text">KoiCareHome</div>
                </div>
                <ul className="nav-links">
<<<<<<< HEAD
                    <li onClick={() => scrollToSection(homeRef)}>Home</li>
                    <li onClick={() => scrollToSection(featureRef)}>Feature</li>
=======
                    <li onClick={() => scrollToSection(homeRef)}><strong>Home</strong></li>
                    <li onClick={() => scrollToSection(featureRef)}><strong>Feature</strong></li>
>>>>>>> GrowthRecord
                </ul>
                <div className="user-icon" onClick={toggleDropdown}>
                    <FaRegUserCircle />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={handleProfile}>
                                Personal Information
                            </div>
                            <div className="dropdown-item" onClick={handleLogout}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </nav>

<<<<<<< HEAD

=======
          
>>>>>>> GrowthRecord
            <div ref={homeRef} className="welcome-home">
                <div className="welcome-text">
                    <h1>KoiCareHome - <br></br>Your Go-To Koi Pond Buddy</h1>
                    <p className="subheading">
<<<<<<< HEAD
                        Effortlessly manage your water parameters, koi, and ponds with our app!
                    </p>
                    <p className="description">
                        Say goodbye to the hassle of recording water values and koi information on paper -
=======
                        Effortlessly manage your water parameters, koi <br></br> and ponds with our app!
                    </p>
                    <p className="description">
                        Say goodbye to the hassle of recording water values <br></br> and koi information on paper - 
>>>>>>> GrowthRecord
                        <span className="highlight"> KoiCareHome</span> streamlines it all for you.
                    </p>
                </div>
                <div className="welcome-image">
                    <img src={KoiGraphic} alt="Koi Pond Graphic" />
                </div>
            </div>
<<<<<<< HEAD
            <div className="Feature"><h1>Our Feature</h1></div>

            <div ref={featureRef} className="card-container">
                <div className='Feature-container'>

                    <GrCard />
                    <Link to="/manage-fish">
                        <div className="card">
                            <img className="card-image" src={Koi_Img} alt="Koi" />
                            <h2 className="card-title">ManageKoi</h2>
                            <p className="card-description">Users manage their own Kois</p>
                        </div>
                    </Link>

                    <Link to="/salt-calculation">
                        <div className="card">
                            <img className="card-image" src={SaltCalculator} alt="Koi" />
                            <h2 className="card-title">Salt Calculator</h2>
                            <p className="card-description">Users manage their own Kois</p>
                        </div>
                    </Link><Link to="/order">
                        <div className="card">
                            <img className="card-image" src={Order} alt="Koi" />
                            <h2 className="card-title">Manage Order</h2>
                            <p className="card-description">Users manage their own Kois</p>
                        </div>
                    </Link>



                </div>
=======

            <div ref={featureRef} className="card-container">
                <div className='Feature-container'>
            <h1>Our Feature</h1>       
            <ManageFishCard />
                <FeedingHistoryCard />
                <FoodCalculatorCard />
                <GrCard /> 
            </div>
>>>>>>> GrowthRecord
            </div>
        </div>
    );
};

export default Home;