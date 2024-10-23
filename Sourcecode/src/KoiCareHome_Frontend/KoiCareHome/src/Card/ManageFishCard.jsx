
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
                <p className="card-description">Users manage their own Kois</p>
            </div>
        </Link>
        
    );
}

export default ManageFishCard


