import React from 'react';
import { Link } from 'react-router-dom';
import './GrCard.css';
import calculatorsalt from '../assets/calculatorsalt.jpg';
import Calculator from '../assets/Calculator.jpg';

const SaltCalculation = () => {
    return (
        <Link to="/salt-calculation">
            <div className="card">
                <img className="card-image" src={Calculator} alt="Koi" />
                <h2 className="card-title">Salt Calculator</h2>
                <p className="card-description">Users calculate salt of pond</p>
            </div>
        </Link>
    );
}

export default SaltCalculation