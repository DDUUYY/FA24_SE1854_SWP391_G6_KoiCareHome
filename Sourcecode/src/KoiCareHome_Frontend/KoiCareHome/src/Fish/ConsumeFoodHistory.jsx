// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './ConsumeFoodHistory.css';
import { FaFish as Fish, FaSwimmer as Pool, FaBox as Package } from 'react-icons/fa'; 

// import { FaPlus } from 'react-icons/fa';

/*
 * Author: Quach To Anh
 * Date: October 22, 2024
 */

const ConsumeFoodHistory = () => {
  const [selectedPondId, setSelectedPondId] = useState(1);
  const [selectedFishId, setSelectedFishId] = useState(null);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [fishes, setFishes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const [newConsumption, setNewConsumption] = useState({
    fishId: null,
    foodId: null,
    quantity: "",
    description: "",
    consumeDate: new Date().toISOString().slice(0, 16)
  });

  // Fetch fishes when pond changes
  useEffect(() => {
    const fetchFishes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/fish/pond/${selectedPondId}`);
        if (!response.ok) throw new Error('Failed to fetch fishes');
        const data = await response.json();
        setFishes(data);
        setSelectedFishId(null);
        setHistory([]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFishes();
  }, [selectedPondId]);

  // Fetch foods on component mount
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/food');
        if (!response.ok) throw new Error('Failed to fetch foods');
        const data = await response.json();
        setFoods(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFoods();
  }, []);

  // Fetch history when fish changes
  useEffect(() => {
    if (selectedFishId) {
      fetchHistory();
    }
  }, [selectedFishId]);

  const fetchHistory = useCallback(async () => {
    if (!selectedFishId) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/fish/consumeFoodHistory/${selectedFishId}`);
      if (!response.ok) throw new Error('Failed to fetch history');
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedFishId]);

  useEffect(() => {
    if (selectedFishId) {
      fetchHistory();
    }
  }, [selectedFishId, fetchHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFishId || !selectedFoodId) {
      setError('Please select both fish and food');
      return;
    }

    try {
      const payload = {
        ...newConsumption,
        fishId: selectedFishId,
        foodId: selectedFoodId,
      };

      const response = await fetch('http://localhost:8080/api/fish/consumeFoodHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save consumption record');

      const savedRecord = await response.json();
      setHistory(prev => [...prev, savedRecord]);
      setNewConsumption({
        ...newConsumption,
        quantity: "",
        description: "",
        consumeDate: new Date().toISOString().slice(0, 16)
      });
      
      // Show success message
      alert('Consumption record added successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Food Consumption History</h2>
          </div>

          <div className="p-6">
            {/* Selection Controls */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Pool className="w-4 h-4" />
                  Select Pond
                </label>
                <select
                  value={selectedPondId}
                  onChange={(e) => setSelectedPondId(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5].map((id) => (
                    <option key={id} value={id}>Pond {id}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Fish className="w-4 h-4" />
                  Select Fish
                </label>
                <select
                  value={selectedFishId || ''}
                  onChange={(e) => {
                    const newFishId = Number(e.target.value);
                    setSelectedFishId(newFishId);
                    setNewConsumption((prev) => ({ ...prev, fishId: newFishId }));  // Cập nhật fishId
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  disabled={fishes.length === 0}
                >
                  <option value="">Select a fish</option>
                  {fishes.map((fish) => (
                    <option key={fish.id} value={fish.id}>
                      Fish ID: {fish.id} - {fish.name || `Fish ${fish.id}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Package className="w-4 h-4" />
                  Select Food
                </label>
                <select
                  value={selectedFoodId || ''}
                  onChange={(e) => setSelectedFoodId(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select food type</option>
                  {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            ) : selectedFishId ? (
              <>
                {/* Add New Consumption Form */}
                <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Consumption Record</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity (kg)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newConsumption.quantity}
                        onChange={(e) => setNewConsumption({
                          ...newConsumption,
                          quantity: e.target.value
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4" />
                        Feeding Time
                      </label>
                      <input
                        type="datetime-local"
                        value={newConsumption.consumeDate}
                        onChange={(e) => setNewConsumption({
                          ...newConsumption,
                          consumeDate: e.target.value
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        value={newConsumption.description}
                        onChange={(e) => setNewConsumption({
                          ...newConsumption,
                          description: e.target.value
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Add Record
                    </button>
                  </div>
                </form>

                {/* History Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <h3 className="px-6 py-4 bg-gray-50 border-b border-gray-200 text-lg font-medium text-gray-900">
                    Consumption History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Feeding Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Food Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity (kg)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {history.map((record, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(record.consumeDate).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {foods.find(f => f.id === record.foodId)?.name || 'Unknown'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.quantity}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {record.description || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {history.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No consumption history available</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Please select a fish to view its consumption history</p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumeFoodHistory;
