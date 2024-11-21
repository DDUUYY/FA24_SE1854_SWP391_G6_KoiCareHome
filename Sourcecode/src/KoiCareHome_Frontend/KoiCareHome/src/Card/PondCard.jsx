// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import './GrCard.css';
import Pond from '../assets/logoPond.jpg';

const PondCard = () => {
    return (
        <Link to="/pond">
            <div className="card">
                <img className="card-image" src={Pond} alt="Pond" />
                <h2 className="card-title">Manage Pond</h2>
                <p className="card-description">manage and monitor information about your koi ponds</p>
            </div>
        </Link>
    );
}

export default PondCard