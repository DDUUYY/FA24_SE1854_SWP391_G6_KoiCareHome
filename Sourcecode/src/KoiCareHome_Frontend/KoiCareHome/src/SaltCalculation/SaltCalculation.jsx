import React, { useState } from 'react';
import './SaltCalculation.css';

const SaltCalculation = () => {
    const [pondVolume, setPondVolume] = useState('');
    const [currentConcentration, setCurrentConcentration] = useState('');
    const [desiredConcentration, setDesiredConcentration] = useState('');
    const [waterChange, setWaterChange] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error and response before starting calculation
        setError(null);
        setResponse(null);

        const requestData = {
            pondVolume: parseFloat(pondVolume),
            currentConcentration: parseFloat(currentConcentration),
            desiredConcentration: parseFloat(desiredConcentration),
            waterChange: parseFloat(waterChange),
        };

        const memberId = localStorage.getItem('userID');
        if (!memberId) {
            setError('Member ID not found in local storage.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/calculate-salt?memberID=${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }

            const data = await res.json();
            setResponse(data);
            setError(null); // Clear any previous errors

        } catch (error) {
            setError(error.message); // Set the error message
        }
    };

    return (
        <div className="salt-calc-container">
            <h2 className="salt-calc-heading">Salt Calculation</h2>
            <form onSubmit={handleSubmit} className="salt-calc-form">
                <label className="salt-calc-label">
                    Pond Volume (liters):
                    <input
                        type="number"
                        value={pondVolume}
                        onChange={(e) => setPondVolume(e.target.value)}
                        required
                        className="salt-calc-input"
                    />
                </label>
                <label className="salt-calc-label">
                    Current Concentration (%):
                    <input
                        type="number"
                        value={currentConcentration}
                        onChange={(e) => setCurrentConcentration(e.target.value)}
                        required
                        className="salt-calc-input"
                    />
                </label>
                <label className="salt-calc-label">
                    Desired Concentration (%):
                    <input
                        type="number"
                        value={desiredConcentration}
                        onChange={(e) => setDesiredConcentration(e.target.value)}
                        required
                        className="salt-calc-input"
                    />
                </label>
                <label className="salt-calc-label">
                    Water Change (liters):
                    <input
                        type="number"
                        value={waterChange}
                        onChange={(e) => setWaterChange(e.target.value)}
                        required
                        className="salt-calc-input"
                    />
                </label>
                <button type="submit" className="salt-calc-submit-btn">Calculate</button>
            </form>

            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}

            {response && (
                <div className="salt-calc-results">
                    <h3 className="salt-calc-results-heading">Results:</h3>
                    <p className="salt-calc-results-text">Total Salt Needed: {response.totalSalt} kg</p>
                    <p className="salt-calc-results-text">Salt for Water Change: {response.saltPerWaterChange} kg</p>
                    <p className="salt-calc-results-text">{response.message}</p>
                </div>
            )}
        </div>
    );
};

export default SaltCalculation;
