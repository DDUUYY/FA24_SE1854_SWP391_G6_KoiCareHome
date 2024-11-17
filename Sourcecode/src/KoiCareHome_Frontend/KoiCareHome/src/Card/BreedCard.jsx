// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import Feeding_Img from '../assets/FeedingFood.jpg';
import './GrCard.css';


const BreedCard = () => {
    return (
        <Link to="/breed">
            <div className="card">
                <img className="card-image" src={Feeding_Img} alt="FeedingFish"></img>
                <h2 className="card-title">Breed</h2>
                <p className="card-description">Admin create Breed</p>
            </div>
        </Link>

    );
}

export default BreedCard