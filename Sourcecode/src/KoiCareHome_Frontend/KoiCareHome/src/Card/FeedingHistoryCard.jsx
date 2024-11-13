// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import Feeding_Img from '../assets/FeedingFood.jpg';
import './GrCard.css';


const FeedingHistoryCard = () => {
    return (
        <Link to="/consume-food-history">
            <div className="card">
                <img className="card-image" src={Feeding_Img} alt="FeedingFish"></img>
                <h2 className="card-title">FeedingHistory</h2>
                <p className="card-description">Store your Kois' consumption histories here</p>
            </div>
        </Link>

    );
}

export default FeedingHistoryCard