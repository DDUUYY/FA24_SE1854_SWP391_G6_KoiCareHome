
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import Koi_Img from '../assets/Koi_Img.jpg';
import './GrCard.css';


const ManageFishCard = () => {
    return (
        <Link to="/manage-fish">
            <div className="card">
                <img className="card-image" src={Koi_Img} alt="Koi"></img>
                <h2 className="card-title">ManageKoi</h2>
                <p className="card-description">An efficiently way to track, nurture, and organize your Kois</p>
            </div>
        </Link>

    );
}

export default ManageFishCard


