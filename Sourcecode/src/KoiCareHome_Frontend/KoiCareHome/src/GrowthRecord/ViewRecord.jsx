import React from 'react';
import './ViewRecord.css'; 
import { FaTimes } from 'react-icons/fa';

const ViewRecord = ({ isOpen, onClose, record }) => {
    if (!isOpen) return null;

    return (
        <div className="View-overlay">
            <div className="View-content">
                <h2>Growth Record Details</h2>
                <p><strong>Measurement Date:</strong> {record.measurementDate}</p>
                <p><strong>Size:</strong> {record.size} cm</p>
                <p><strong>Weight:</strong> {record.weight} kg</p>
                <p><strong>Description:</strong> {record.description}</p>
                <button onClick={onClose}>
                    <FaTimes style={{ marginRight: '8px' }} /> Close
                </button>
            </div>
        </div>
    );
};

export default ViewRecord;