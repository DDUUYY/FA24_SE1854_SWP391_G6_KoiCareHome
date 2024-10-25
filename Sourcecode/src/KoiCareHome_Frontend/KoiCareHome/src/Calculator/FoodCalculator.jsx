// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './FoodCalculator.css';

/*
 * Author: Quach To Anh
 * Date: October 21, 2024
 */

const FoodCalculator = () => {
  const [selectedPondId, setSelectedPondId] = useState(1);
  const [foodAmount, setFoodAmount] = useState(null);
  const [totalWeight, setTotalWeight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchFoodCalculation = async (pondId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch both food calculation and total weight
      const [foodResponse, weightResponse] = await Promise.all([
        fetch(`http://localhost:8080/api/calculate/food/${pondId}`),
        fetch(`http://localhost:8080/api/calculate/food/weight/${pondId}`)
      ]);

      if (!foodResponse.ok || !weightResponse.ok) {
        throw new Error('Failed to fetch calculations');
      }

      const [foodData, weightData] = await Promise.all([
        foodResponse.json(),
        weightResponse.json()
      ]);

      setFoodAmount(foodData);
      setTotalWeight(weightData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePondChange = (e) => {
    const newPondId = Number(e.target.value);
    setSelectedPondId(newPondId);
    fetchFoodCalculation(newPondId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Koi Care Home - Food Calculator</h1>
        
        <div className="mb-6">
          <label htmlFor="pondId" className="block text-sm font-medium text-gray-700 mb-2">
            Select Pond ID
          </label>
          <select
            id="pondId"
            value={selectedPondId}
            onChange={handlePondChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                Pond {id}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Food Calculation Result</h2>
          {loading && (
            <div className="text-gray-600">Loading calculations...</div>
          )}
          {error && (
            <div className="text-red-600">Error: {error}</div>
          )}
          {!loading && !error && (
            <div className="space-y-4">
              {totalWeight !== null && (
                <p className="text-lg">
                  Total fish weight in pond: <span className="font-bold">{totalWeight} kg</span>
                </p>
              )}
              {foodAmount !== null && (
                <p className="text-lg">
                  Recommended food amount: <span className="font-bold">{foodAmount} kg</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <button onClick={() => navigate('/home')} className="back-button">Back to Home</button>
    </div>
  );
};

export default FoodCalculator;