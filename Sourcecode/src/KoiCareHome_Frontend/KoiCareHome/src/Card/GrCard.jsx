// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import growthRecordImg from '../assets/GrowthRecord.jpg';
import './GrCard.css';

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 22, 2024
 */
const GrCard = () => {
    return (
        <Link to="/GrowthRecord">
            <div className="card">
                <img className="card-image" src={growthRecordImg} alt="Growth Record"></img>
                <h2 className="card-title">GrowthRecord</h2>
                <p className="card-description">Record the growth of your koi fish and view the statistic chart</p>
            </div>
        </Link>
    );
}

export default GrCard