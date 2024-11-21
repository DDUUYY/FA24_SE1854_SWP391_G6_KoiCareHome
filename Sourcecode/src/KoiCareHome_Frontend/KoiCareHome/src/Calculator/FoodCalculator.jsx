import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBalanceScale, FaFish, FaWater} from 'react-icons/fa';
import { FaCircleArrowLeft } from "react-icons/fa6";
import './FoodCalculator.css';
import readPonds from '../Fish/ViewAllPonds';

const growthRates = [
  { id: 'slow', label: 'Slow Growth', value: 0.5, description: 'Conservative growth rate' },
  { id: 'medium', label: 'Medium Growth', value: 1.0, description: 'Standard growth rate' },
  { id: 'fast', label: 'Fast Growth', value: 1.5, description: 'Accelerated growth rate' }
];

const PondCard = ({ pond, onSelect, isSelected }) => (
  <div
    className={`pond-card ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(pond.pondID)}
  >
    <div className="pond-icon">
      <FaWater size={24} />
    </div>
    <div className="pond-info">
      <h3>{pond.pondID}</h3>
    </div>
  </div>
);

const GrowthRateSelector = ({ selectedRate, onSelect }) => (
  <div className="growth-rate-section">
    <h2>Select Growth Rate</h2>
    <div className="growth-rate-options">
      {growthRates.map(rate => (
        <div
          key={rate.id}
          className={`growth-rate-card ${selectedRate === rate.id ? 'selected' : ''}`}
          onClick={() => onSelect(rate.id)}
        >
          <div className="growth-rate-content">
            <h3>{rate.label}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FoodCalculation = ({ calculatedAmount }) => (
  <div className="calculation-result">
    <div className="result-header">
      <FaBalanceScale size={24} />
      <h3>Recommended Daily Food Amount</h3>
    </div>
    <div className="result-value">
      {calculatedAmount ? (
        <>
          <span className="amount">{calculatedAmount}</span>
          <span className="unit">grams</span>
        </>
      ) : (
        <span className="loading">Calculating...</span>
      )}
    </div>
  </div>
);

const FoodCalculator = () => {
  const [memberID, setMemberID] = useState(null);
  const [ponds, setPonds] = useState([]);
  const [selectedPondId, setSelectedPondId] = useState(null);
  const [selectedGrowthRate, setSelectedGrowthRate] = useState('medium');
  const [calculatedAmount, setCalculatedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [noFishMessage, setNoFishMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userID");
    if (!id) {
      navigate('/login');
      return;
    }
    setMemberID(parseInt(id, 10));
  }, [navigate]);

  useEffect(() => {
    const fetchPonds = async (memberID) => {
      try {
        const data = await readPonds(memberID);
        setPonds(data);
      } catch (error) {
        console.error('Error fetching ponds:', error);
        setError('Failed to fetch ponds. Please try again later.');
      }
    };

    if (memberID) {
      fetchPonds(memberID);
    }
  }, [memberID]);

  useEffect(() => {
    const calculateFood = async () => {
      if (!selectedPondId || !selectedGrowthRate) return;

      try {
        setCalculatedAmount(null);
        const growthRateValue = growthRates.find(rate => rate.id === selectedGrowthRate).value;
        
        const response = await fetch(`http://localhost:8080/api/calculate/food/${selectedPondId}?growthStage=${growthRateValue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        });

        if (!response.ok) throw new Error('Failed to calculate food amount');
        const amount = await response.json();
        setCalculatedAmount(amount);
        setNoFishMessage(amount === 0);
      } catch (err) {
        setError('Failed to calculate food amount. Please try again later.');
      }
    };

    calculateFood();
  }, [selectedPondId, selectedGrowthRate]);

  const handlePondSelect = (pondId) => {
    setSelectedPondId(pondId);
    setError(null);
  };

  const handleGrowthRateSelect = (rateId) => {
    setSelectedGrowthRate(rateId);
    setError(null);
  };

  return (
    <div className="calculate-food-container">
      <header className="page-header">
        <h1>
          <FaFish className="header-icon" />
          Calculate Food Amount
        </h1>
        <p>Select a pond and growth rate to calculate the recommended daily food amount</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <GrowthRateSelector
        selectedRate={selectedGrowthRate}
        onSelect={handleGrowthRateSelect}
      />

      {ponds.length === 0 ? (
        <div className="no-ponds-message">
          <h3>No ponds available. Please add a pond.</h3>
        </div>
      ) : (
        <>
          <h2>Select Pond</h2>
          <div className="ponds-grid">
            {ponds.map(pond => (
              <PondCard
                key={pond.pondID}
                pond={pond}
                onSelect={handlePondSelect}
                isSelected={selectedPondId === pond.pondID}
              />
            ))}
          </div>
        </>
      )}

      {selectedPondId && calculatedAmount !== null && noFishMessage && (
        <div className="no-fish-message">
          <h3>This pond has no fish. Please add fish to calculate food amount.</h3>
        </div>
      )}

      {selectedPondId && !noFishMessage && (
        <FoodCalculation
          calculatedAmount={calculatedAmount}
        />
      )}

      <div className="back-btn-icon">
        <FaCircleArrowLeft onClick={() => navigate('/home')} className="back-btn-plus" />
      </div>
    </div>
  );
};

export default FoodCalculator;