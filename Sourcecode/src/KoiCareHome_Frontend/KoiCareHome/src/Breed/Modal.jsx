import React from 'react';
import './Modal.css'; // Optional: For styling

const Modal = ({ isOpen, onClose, breed }) => {
    if (!isOpen) return null;

    return (
        <div className="modals-overlay" onClick={onClose}>
            <div className="modals-content" onClick={(e) => e.stopPropagation()}>
                <h2>Breed Information</h2>
                <p>ID: {breed.breedID}</p>
                <p>Name: {breed.breedName}</p>
                <p>Origin: {breed.origin}</p>
                <p>Description: {breed.description}</p>
                <p>Min Temperature: {breed.minTemperature}</p>
                <p>Max Temperature: {breed.maxTemperature}</p>
                <p>Min pH: {breed.minPH}</p>
                <p>Max pH: {breed.maxPH}</p>
                <p>Min Water Hardness: {breed.minWaterHardness}</p>
                <p>Max Water Hardness: {breed.maxWaterHardness}</p>
                <p>Feeding Instructions: {breed.feedingInstructions}</p>
                <p>Min Size: {breed.minSize}</p>
                <p>Max Size: {breed.maxSize}</p>
                <p>Min Weight: {breed.minWeight}</p>
                <p>Max Weight: {breed.maxWeight}</p>
                <p>Max Age Month: {breed.maxAgeMonth}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
