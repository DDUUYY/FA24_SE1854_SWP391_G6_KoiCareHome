// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import LogoAdmin from '../assets/LogoAdmin.jpg';
import './GrCard.css';

const AdminCard = () => {
    return (
        <Link to="/admin">
            <div className="card">
                <img className="card-image" src={LogoAdmin} alt="Admin"></img>
                <h2 className="card-title">Admin Page</h2>
                <p className="card-description">Empowering Tools and Features for Admin Control.</p>
            </div>
        </Link>
    );
};

export default AdminCard;
