// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import Calculator from '../assets/Calculator.jpg';
import './GrCard.css';


const FoodCalculatorCard = () => {
    return (
        <Link to="/calulator/food">
            <div className="card">
                <img className="card-image" src={Calculator} alt="FoodCalculator"></img>
                <h2 className="card-title">FoodCalculator</h2>
                <p className="card-description">Know how much food your Koi need in just a click</p>
            </div>
        </Link>

    );
}

export default FoodCalculatorCard