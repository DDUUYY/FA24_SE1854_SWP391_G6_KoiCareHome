// ReminderCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoReminder01 from '../assets/LogoReminder01.jpg';
import './GrCard.css';

const ReminderCard = () => {
    return (
        <Link to="/reminder"> {/* Đổi từ "/reminders" thành "/reminder" */}
            <div className="card">
                <img className="card-image" src={LogoReminder01} alt="Reminder"></img>
                <h2 className="card-title">Reminder</h2>
                <p className="card-description">Set and manage your fish care reminders.</p>
            </div>
        </Link>
    );
};

export default ReminderCard;
