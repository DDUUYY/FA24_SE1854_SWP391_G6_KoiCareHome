// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ConsumeFoodHistory.css';
// import { FaPlus } from 'react-icons/fa';

/*
 * Author: Quach To Anh
 * Date: October 22, 2024
 */

const ConsumeFoodHistory = () => {
    const [selectedPondId, setSelectedPondId] = useState(1);
    const [selectedFishId, setSelectedFishId] = useState(null);
    const [fishes, setFishes] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [newConsumption, setNewConsumption] = useState({
      fishId: null,
      amount: '',
      feedingTime: new Date().toISOString().slice(0, 16)
    });
  
    // Fetch fishes when pond changes
    useEffect(() => {
      const fetchFishes = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/api/fish/pond/${selectedPondId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch fishes');
          }
          const data = await response.json();
          setFishes(data);
          setSelectedFishId(null); // Reset selected fish when pond changes
          setHistory([]); // Clear history when pond changes
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchFishes();
    }, [selectedPondId]);
  
    // Fetch history when fish changes
    useEffect(() => {
      if (selectedFishId) {
        fetchHistory();
      }
    }, [selectedFishId]);
  
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/fish/consumeFoodHistory/${selectedFishId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handlePondChange = (e) => {
      setSelectedPondId(Number(e.target.value));
    };
  
    const handleFishChange = (e) => {
      const fishId = Number(e.target.value);
      setSelectedFishId(fishId);
      setNewConsumption(prev => ({
        ...prev,
        fishId: fishId
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedFishId) {
        setError('Please select a fish first');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:8080/api/fish/consumeFoodHistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newConsumption),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save consumption record');
        }
  
        const savedRecord = await response.json();
        setHistory(prev => [...prev, savedRecord]);
        setNewConsumption({
          ...newConsumption,
          amount: '',
          feedingTime: new Date().toISOString().slice(0, 16)
        });
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Food Consumption History</h2>
        
        {/* Selection Controls */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Pond</label>
            <select
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Fish</label>
            <select
              value={selectedFishId || ''}
              onChange={handleFishChange}
              className="w-full p-2 border border-gray-300 rounded-md"
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
        </div>
  
        {error && (
          <div className="text-red-600 mb-4">Error: {error}</div>
        )}
  
        {loading ? (
          <div className="text-gray-600 text-center py-4">Loading...</div>
        ) : selectedFishId ? (
          <>
            {/* Add New Consumption Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newConsumption.amount}
                    onChange={(e) => setNewConsumption({
                      ...newConsumption,
                      amount: e.target.value
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Feeding Time</label>
                  <input
                    type="datetime-local"
                    value={newConsumption.feedingTime}
                    onChange={(e) => setNewConsumption({
                      ...newConsumption,
                      feedingTime: e.target.value
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Record
              </button>
            </form>
  
            {/* History Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feeding Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount (kg)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(record.feedingTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {history.length === 0 && (
              <p className="text-gray-500 text-center py-4">No consumption history available</p>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center py-4">Please select a fish to view its consumption history</p>
        )}
        <button onClick={() => navigate('/home')} className="back-button">Back to Home</button>
      </div>
    );
  };
  
  export default ConsumeFoodHistory;