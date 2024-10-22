// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import growthRecordImg from '../assets/GrowthRecord.jpg';
import './GrCard.css';

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 19, 2024
 */
const GrCard = () => {
    return (
        <Link to="/GrowthRecord">
            <div className="card">
                <img className="card-image" src={growthRecordImg} alt="Growth Record"></img>
                <h2 className="card-title">GrowthRecord</h2>
                <p className="card-description">Users monitor the growth of fish</p>
            </div>
        </Link>
        
    );
}

export default GrCard