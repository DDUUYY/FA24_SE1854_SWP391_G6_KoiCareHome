import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBalanceScale, FaFish, FaWater } from 'react-icons/fa';
import { FaCircleArrowLeft } from "react-icons/fa6";
import './FoodCalculator.css';
import readPonds from '../Fish/ViewAllPonds';

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

const CalculateFood = () => {
  const [memberID, setMemberID] = useState(null);
  const [ponds, setPonds] = useState([]);
  const [selectedPondId, setSelectedPondId] = useState(null);
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
      }
    };

    if (memberID) {
      fetchPonds(memberID);
    }
  }, [memberID]);

  useEffect(() => {
    const calculateFood = async () => {
      if (!selectedPondId) return;

      try {
        setCalculatedAmount(null);
        const response = await fetch(`http://localhost:8080/api/calculate/food/${selectedPondId}`);
        if (!response.ok) throw new Error('Failed to calculate food amount');
        const amount = await response.json();
        setCalculatedAmount(amount);
        setNoFishMessage(amount === 0); // Assuming API returns 0 if there are no fish
      } catch (err) {
        setError('Failed to calculate food amount. Please try again later.');
      }
    };

    calculateFood();
  }, [selectedPondId]);

  const handlePondSelect = (pondId) => {
    setSelectedPondId(pondId);
    setError(null);
  };

  return (
    <div className="calculate-food-container">
      <header className="page-header">
        <h1>
          <FaFish className="header-icon" />
          Calculate Food Amount
        </h1>
        <p>Select a pond to calculate the recommended daily food amount for your koi</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {ponds.length === 0 ? (
        <div className="no-ponds-message">
          <h3>No ponds available. Please add a pond.</h3>
        </div>

      ) : (
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
      )}

      {selectedPondId && calculatedAmount !== null && noFishMessage && (
        <div className="no-fish-message">
          <h3>This pond has no fish. Please add fish to calculate food amount.</h3>
        </div>
      )}

      {selectedPondId && !noFishMessage && (
        <FoodCalculation
          pondId={selectedPondId}
          calculatedAmount={calculatedAmount}
        />
      )}
      <div className="back-btn-icon">
        <FaCircleArrowLeft onClick={() => navigate('/home')} className="back-btn-plus" />
      </div>
    </div>
  );
};

export default CalculateFood;
