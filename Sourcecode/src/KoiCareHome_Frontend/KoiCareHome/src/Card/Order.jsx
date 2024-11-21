import React from 'react';
import { Link } from 'react-router-dom';
import './GrCard.css';
import order from '../assets/OrderImage.jpg';

const Order = () => {
    return (
        <Link to="/order">
            <div className="card">
                <img className="card-image" src={order} alt="Koi" />
                <h2 className="card-title">Manage Order</h2>
                <p className="card-description">Users manage their orders for their Koi and pond</p>
            </div>
        </Link>
    );
}

export default Order