
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import './home.css';
import GrCard from '../src/Card/GrCard';
import KoiGraphic from './assets/Welcome.jpg';
import LogoKoiFish from './assets/logokoifish.png';
import ManageFishCard from './Card/ManageFishCard';
import FeedingHistoryCard from './Card/FeedingHistoryCard';
import FoodCalculatorCard from './Card/FoodCalculatorCard';
import BreedCard from './Card/BreedCard';

const Home = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        navigate('/login'); // Điều hướng tới trang đăng nhập
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const homeRef = useRef(null);
    const featureRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-container">

            <nav className="navbar sticky-navbar">
                <div className="logo-container" onClick={() => scrollToSection(homeRef)}>
                    <img src={LogoKoiFish} alt="Logo Koi Fish" className="logo-image" />
                    <div className="logo-text">KoiCareHome</div>
                </div>
                <ul className="nav-links">
                    <li onClick={() => scrollToSection(homeRef)}><strong>Home</strong></li>
                    <li onClick={() => scrollToSection(featureRef)}><strong>Feature</strong></li>
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


            <div ref={homeRef} className="welcome-home">
                <div className="welcome-text">
                    <h1>KoiCareHome - <br></br>Your Go-To Koi Pond Buddy</h1>
                    <p className="subheading">
                        Effortlessly manage your water parameters, koi <br></br> and ponds with our app!
                    </p>
                    <p className="description">
                        Say goodbye to the hassle of recording water values <br></br> and koi information on paper -
                        <span className="highlight"> KoiCareHome</span> streamlines it all for you.
                    </p>
                </div>
                <div className="welcome-image">
                    <img src={KoiGraphic} alt="Koi Pond Graphic" />
                </div>
            </div>

            <div ref={featureRef} className="card-container">
                <div className='Feature-container'>
                    <h1>Our Feature</h1>
                    <ManageFishCard />
                    <FeedingHistoryCard />
                    <FoodCalculatorCard />
                    <GrCard />
                    <BreedCard />
                </div>
            </div>
        </div>
    );
};

export default Home;