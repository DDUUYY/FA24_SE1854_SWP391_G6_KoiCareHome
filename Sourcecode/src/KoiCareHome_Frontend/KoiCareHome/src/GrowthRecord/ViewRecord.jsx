/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ViewRecord.css'; 

const ViewRecord = ({ isOpen, onClose, record }) => {
    if (!isOpen) return null;

    return (
        <div className="View-overlay">
            <div className="View-content">
                <h2>Growth Record Details</h2>
                <p><strong>Measurement Date:</strong> {record.measurementDate}</p>
                <p><strong>Size:</strong> {record.size}</p>
                <p><strong>Weight:</strong> {record.weight}</p>
                <p><strong>Description:</strong> {record.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ViewRecord;