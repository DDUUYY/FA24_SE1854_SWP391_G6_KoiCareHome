import React, { useState } from 'react';
import './SaltCalculation.css'; // Importing the CSS file

const SaltCalculation = () => {
    const [pondVolume, setPondVolume] = useState('');
    const [currentConcentration, setCurrentConcentration] = useState('');
    const [desiredConcentration, setDesiredConcentration] = useState('');
    const [waterChange, setWaterChange] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Prepare the data to send to the API
        const data = {
            pondVolume: parseFloat(pondVolume),
            currentConcentration: parseFloat(currentConcentration),
            desiredConcentration: parseFloat(desiredConcentration),
            waterChange: parseFloat(waterChange),
        };

        try {
            // Fetch request to the Spring Boot API
            const response = await fetch('http://localhost:8080/api/calculate-salt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                setResult(responseData);
            } else {
                setError('Failed to calculate salt. Please check your input.');
            }
        } catch (err) {
            setError('Error connecting to the server.');
        }
    };

    return (
        <div className="salt-calculation">
            <h1>Salt Calculation for Koi Pond</h1>
            <p>Enter the details below to calculate the amount of salt needed for your pond.</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Pond Volume (liters):</label>
                    <input
                        type="number"
                        value={pondVolume}
                        onChange={(e) => setPondVolume(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Current Salt Concentration (%):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={currentConcentration}
                        onChange={(e) => setCurrentConcentration(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Desired Salt Concentration (%):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={desiredConcentration}
                        onChange={(e) => setDesiredConcentration(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Water Change (liters):</label>
                    <input
                        type="number"
                        value={waterChange}
                        onChange={(e) => setWaterChange(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="calculate-button">Calculate Salt</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {result && (
                <div className="result">
                    <h2>Calculation Results</h2>
                    <p>Total Salt Needed: {result.totalSalt} kg</p>
                    <p>Salt per Water Change: {result.saltPerWaterChange} kg</p>
                </div>
            )}
        </div>
    );
};

export default SaltCalculation;
