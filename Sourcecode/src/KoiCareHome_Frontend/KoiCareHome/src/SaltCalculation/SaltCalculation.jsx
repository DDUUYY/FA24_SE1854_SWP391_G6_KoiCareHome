import React, { useState } from 'react';
import './SaltCalculation.css';

const SaltCalculation = () => {
    const [pondVolume, setPondVolume] = useState('');
    const [currentConcentration, setCurrentConcentration] = useState('');
    const [desiredConcentration, setDesiredConcentration] = useState('');
    const [waterChange, setWaterChange] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            pondVolume: parseFloat(pondVolume),
            currentConcentration: parseFloat(currentConcentration),
            desiredConcentration: parseFloat(desiredConcentration),
            waterChange: parseFloat(waterChange),
        };

        const memberId = localStorage.getItem('userID');
        if (!memberId) {
            console.error('Error: memberID not found in localStorage.');
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
                throw new Error(`Failed to fetch: ${errorMessage}`);
            }

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error fetching salt calculation:', error.message);
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
                <button type="submit" className="salt-calc-submit-btn">Calculate Salt</button>
            </form>

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


/* // src/SaltCalculation/SaltCalculation.jsx
import React, { useState } from 'react';
import './SaltCalculation.css';

const SaltCalculation = () => {
    const [pondVolume, setPondVolume] = useState('');
    const [currentConcentration, setCurrentConcentration] = useState('');
    const [desiredConcentration, setDesiredConcentration] = useState('');
    const [waterChange, setWaterChange] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            pondVolume: parseFloat(pondVolume),
            currentConcentration: parseFloat(currentConcentration),
            desiredConcentration: parseFloat(desiredConcentration),
            waterChange: parseFloat(waterChange),
        };


        // Lấy memberID từ localStorage
        const memberId = localStorage.getItem('userID'); // Dùng userID như là memberID

        // Kiểm tra nếu memberID không tồn tại
        if (!memberId) {
            console.error('Error: memberID not found in localStorage.');
            return; // Ngừng thực hiện nếu không có memberID
        }

        try {
            const res = await fetch(`http://localhost:8080/api/calculate-salt?memberID=${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            // Kiểm tra nếu phản hồi không thành công
            if (!res.ok) {
                const errorMessage = await res.text();
                throw new Error(`Failed to fetch: ${errorMessage}`);
            }

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error fetching salt calculation:', error.message);
        }
    };



    return (
        <div className="salt-calculation-container">
            <h2>Salt Calculation</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Pond Volume (liters):
                    <input
                        type="number"
                        value={pondVolume}
                        onChange={(e) => setPondVolume(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Current Concentration (%):
                    <input
                        type="number"
                        value={currentConcentration}
                        onChange={(e) => setCurrentConcentration(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Desired Concentration (%):
                    <input
                        type="number"
                        value={desiredConcentration}
                        onChange={(e) => setDesiredConcentration(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Water Change (liters):
                    <input
                        type="number"
                        value={waterChange}
                        onChange={(e) => setWaterChange(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Calculate Salt</button>
            </form>

            {response && (
                <div className="calculation-results">
                    <h3>Results:</h3>
                    <p>Total Salt Needed: {response.totalSalt} kg</p>
                    <p>Salt for Water Change: {response.saltPerWaterChange} kg</p>
                    <p>{response.message}</p>
                </div>
            )}
        </div>
    );
};

export default SaltCalculation;
 */