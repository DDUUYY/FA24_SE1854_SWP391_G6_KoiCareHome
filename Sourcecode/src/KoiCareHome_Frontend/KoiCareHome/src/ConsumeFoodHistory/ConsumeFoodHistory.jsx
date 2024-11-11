import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ConsumeFoodHistory.css';
import createConsumptionHistory from './CreateConsumeHistory';
import readFishes from '../Fish/ViewAllFishes';
import readFood from '../Calculator/ViewAllFood';
import readHistory from './ViewAllHistories';
import deleteHistory from './DeleteConsumeFoodHistory';
import { FaFish, FaBox, FaClock, FaPlusCircle } from 'react-icons/fa';
import { FaCircleArrowLeft } from "react-icons/fa6";

const ConsumptionForm = ({ onSubmit, onCancel, title, foodOptions, fishes }) => {
  const [formData, setFormData] = useState({
    fishID: '',
    foodID: '',
    quantity: '',
    description: '',
    consumeDate: new Date().toISOString().slice(0, 16)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? (value === '' ? '' : parseInt(value, 10)) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fishID || !formData.foodID || !formData.quantity || !formData.consumeDate) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit} className="consumption-form">
          <select
            name="fishID"
            value={formData.fishID}
            onChange={handleChange}
            required
          >
            <option value="">Select Fish</option>
            {fishes.map(fish => (
              <option key={fish.fishID} value={fish.fishID}>
                {fish.name}
              </option>
            ))}
          </select>

          <select
            name="foodID"
            value={formData.foodID}
            onChange={handleChange}
            required
          >
            <option value="">Select Food</option>
            {foodOptions.map(food => (
              <option key={food.foodID} value={food.foodID}>
                {food.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            min="1"
            required
          />

          <input
            type="datetime-local"
            name="consumeDate"
            value={formData.consumeDate}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
          />

          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ConsumptionCard = ({ consumeFoodHistory, onDelete, fishes, food }) => {
  const fish = fishes.find(f => f.fishID === consumeFoodHistory.fishID);
  const foodItem = food.find(f => f.foodID === consumeFoodHistory.foodID);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this consumption history?")) {
      onDelete(consumeFoodHistory.consumeFoodHistoryID);
    }
  };

  return (
    <div className="consumption-card">
      <h3>
        <FaClock className="icon" />
        {new Date(consumeFoodHistory.consumeDate).toLocaleDateString()}
      </h3>
      <div className="consumption-details">
        <p>
          <FaFish className="icon" />
          Fish: {fish?.name || 'Unknown Fish'}
        </p>
        <p>
          <FaBox className="icon" />
          Food: {foodItem?.name || 'Unknown Food'}
        </p>
        <p>Quantity: {consumeFoodHistory.quantity}</p>
        {consumeFoodHistory.description && (
          <p>Description: {consumeFoodHistory.description}</p>
        )}
      </div>
      <div className="consumption-actions">
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

const ManageConsumeFoodHistory = () => {
  const [fishes, setFishes] = useState([]);
  const [food, setFood] = useState([]);
  const [consumeFoodHistories, setConsumeFoodHistories] = useState([]);
  const [memberID, setMemberID] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFishID, setSelectedFishID] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
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
    const loadData = async () => {
      if (!memberID) return;

      try {
        const [fishesData, foodData] = await Promise.all([
          readFishes(memberID),
          readFood()
        ]);

        setFishes(fishesData);
        setFood(foodData);
      } catch (error) {
        showNotification('Error loading data', 'error');
      }
    };

    loadData();
  }, [memberID]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!selectedFishID) {
        setConsumeFoodHistories([]);
        return;
      }

      try {
        const data = await readHistory(selectedFishID);
        setConsumeFoodHistories(data);
      } catch (error) {
        showNotification('Error loading consumption history', 'error');
      }
    };

    loadHistory();
  }, [selectedFishID]);

  const handleCreate = async (formData) => {
    try {
      const createdConsumption = await createConsumptionHistory({
        ...formData,
        memberID
      });

      setConsumeFoodHistories(prev => [...prev, createdConsumption]);
      setShowAddForm(false);
      showNotification('Consumption record added successfully!');

      // Refresh the history for the selected fish
      if (selectedFishID) {
        const updatedHistory = await readHistory(selectedFishID);
        setConsumeFoodHistories(updatedHistory);
      }
    } catch (error) {
      showNotification('Error adding consumption record', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);
      setConsumeFoodHistories(prev =>
        prev.filter(history => history.consumeFoodHistoryID !== id)
      );
      showNotification('Consumption record deleted successfully!');
    } catch (error) {
      showNotification('Error deleting consumption record', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  return (
    <div className="consumeFoodHistory-management">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="header">
        <h1>Consume Food History</h1>
      </div>
      <div className="fish-select">
        <label htmlFor="fish">Select Fish:</label>
        <select
          id="fish"
          value={selectedFishID}
          onChange={(e) => setSelectedFishID(e.target.value)}
          className="fish-select"
          required
        >
          <option className="fish-selection" value="" disabled>Select a fish</option>
          {fishes.map(fish => (
            <option key={fish.fishID} value={fish.fishID}>
              {fish.name}
            </option>
          ))}
        </select>
      </div>
      <div className="add-btn-icon">
        <FaPlusCircle className="add-btn-plus" onClick={() => setShowAddForm(true)} />
      </div>

      <div className="consumption-grid">
        {consumeFoodHistories.length === 0 ? (
          <div className="no-history-container">
            <div className="no-history-message">
              No consumption history available for this fish.
            </div>
          </div>
        ) : (
          consumeFoodHistories.map(history => (
            <ConsumptionCard
              key={history.consumeFoodHistoryID}
              consumeFoodHistory={history}
              onDelete={handleDelete}
              fishes={fishes}
              food={food}
            />
          ))
        )}
      </div>


      {showAddForm && (
        <ConsumptionForm
          onSubmit={handleCreate}
          onCancel={() => setShowAddForm(false)}
          title="Add New Consumption Record"
          foodOptions={food}
          fishes={fishes}
        />
      )}

      <div className="back-btn-icon">
        <FaCircleArrowLeft onClick={() => navigate('/home')} className="back-btn-plus" />
      </div>
    </div>
  );
};

export default ManageConsumeFoodHistory