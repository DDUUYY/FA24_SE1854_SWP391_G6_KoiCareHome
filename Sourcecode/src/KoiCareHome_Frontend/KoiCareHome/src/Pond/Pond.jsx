/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Pond.css';
import HomeIcon from '../assets/HomeButton.png';

const Pond = () => {
    const [ponds, setPonds] = useState([]);
    const [fishCounts, setFishCounts] = useState({});
    const navigate = useNavigate();
    const [selectedPond, setSelectedPond] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState({
        pondID: null,
        size: '',
        depth: '',
        volume: '',
        drainageCount: '',
        pumpCapacity: '',
        equipment: '',
        quantity: '',
    });

    const memberID = parseInt(localStorage.getItem('userID'), 10);

    useEffect(() => {
        const fetchPonds = async () => {
            try {
                // Gọi API để lấy danh sách hồ cá
                const response = await axios.get(`/api/pond/member?memberId=${memberID}`);
                const pondsData = response.data;
    
                // Gọi API để lấy số lượng cá trong từng hồ
                const fishCountPromises = pondsData.map(async (pond) => {
                    try {
                        const fishResponse = await axios.get(`/api/fish/pond/${pond.pondID}/count`);
                        return { pondID: pond.pondID, count: fishResponse.data }; // Trả về số lượng cá
                    } catch (error) {
                        console.error(`Error fetching fish count for pond ${pond.pondID}:`, error);
                        return { pondID: pond.pondID, count: 0 }; // Nếu lỗi, trả về 0
                    }
                });
    
                // Chờ tất cả các promise hoàn thành
                const fishCountsArray = await Promise.all(fishCountPromises);
    
                // Tạo object để lưu số lượng cá theo pondID
                const counts = fishCountsArray.reduce((acc, { pondID, count }) => {
                    acc[pondID] = count;
                    return acc;
                }, {});
    
                // Cập nhật state
                setPonds(pondsData); // Cập nhật danh sách hồ
                setFishCounts(counts); // Cập nhật số lượng cá cho từng hồ
            } catch (error) {
                console.error('Error fetching ponds or fish counts:', error);
            }
        };
        fetchPonds();
    }, [memberID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const savePond = async () => {
        if (!formState.size || !formState.depth || !formState.volume) {
            alert("Please fill in all required fields: size, depth, and volume.");
            return;
        }

        try {
            if (selectedPond) {
                const response = await axios.put(`/api/pond/${selectedPond.pondID}`, formState);
                setPonds((prevPonds) =>
                    prevPonds.map((pond) =>
                        pond.pondID === selectedPond.pondID ? response.data : pond
                    )
                );
                setSelectedPond(response.data);
                alert("Pond updated successfully!");
            } else {
                const response = await axios.post('/api/pond', {
                    ...formState,
                    memberID: localStorage.getItem('userID'),
                    isActive: true,
                });
                setPonds([...ponds, response.data]);
                alert("Pond added successfully!");
            }
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error('Error saving pond:', error.response?.data || error.message);
            alert(`Error saving pond: ${error.response?.data || error.message}`);
        }
    };

    const deletePond = async (id) => {
        if (fishCounts[id] > 0) {
            alert('Cannot delete pond because it contains fish.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this pond?')) {
            try {
                await axios.delete(`/api/pond/${id}`);
                setPonds(ponds.filter((pond) => pond.pondID !== id));
                alert('Pond deleted successfully!');
                setSelectedPond(null);
            } catch (error) {
                console.error('Error deleting pond:', error);
            }
        }
    };

    const resetForm = () => {
        setFormState({
            pondID: null,
            size: '',
            depth: '',
            volume: '',
            drainageCount: '',
            pumpCapacity: '',
            equipment: '',
            quantity: '',
        });
        setShowForm(false);
    };

    return (
        <div className="pond-container">
            <nav className="navbar">
                <img 
                src={HomeIcon} 
                alt="Back to Home" 
                className="home-icon" 
                onClick={() => navigate('/home')} 
                />
                <span className="navbar-title">Pond Management</span>
            </nav>

            <div className="pond-header">
                <button
                    className="create-pond-button"
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                >
                    Create Pond
                </button>
            </div>

            <div className="pond-main">
                <div className="pond-list">
                    {ponds.map((pond) => (
                        <div
                            key={pond.pondID}
                            className={`pond-card ${selectedPond?.pondID === pond.pondID ? 'selected' : ''}`}
                            onClick={() => setSelectedPond(pond)}
                        >
                            <h4>Pond {pond.pondID}</h4>
                            <p><strong>Size:</strong> {pond.size} m²</p>
                            <p><strong>Depth:</strong> {pond.depth} m</p>
                            <p><strong>Volume:</strong> {pond.volume} m³</p>
                        </div>
                    ))}
                </div>

                {selectedPond && (
                    <div className="pond-details">
                        <h3>Pond Details</h3>
                        <p><strong>Size:</strong> {selectedPond.size} m²</p>
                        <p><strong>Depth:</strong> {selectedPond.depth} m</p>
                        <p><strong>Volume:</strong> {selectedPond.volume} m³</p>
                        <p><strong>Drainage Count:</strong> {selectedPond.drainageCount || 'N/A'}</p>
                        <p><strong>Pump Capacity:</strong> {selectedPond.pumpCapacity || 'N/A'} m³/h</p>
                        <p><strong>Equipment:</strong> {selectedPond.equipment || 'N/A'}</p>
                        <p><strong>Quantity:</strong> {selectedPond.quantity || 'N/A'}</p>
                        <p><strong>Fish Count:</strong> {fishCounts[selectedPond.pondID] || 0}</p>
                        <button
                            className="update-button"
                            onClick={() => {
                                setFormState(selectedPond);
                                setShowForm(true);
                            }}
                        >
                            Update Pond
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deletePond(selectedPond.pondID)}
                        >
                            Delete Pond
                        </button>
                    </div>
                )}
            </div>

            {showForm && (
                <div className="pond-form-modal">
                    <div className="pond-form">
                        <h3>{formState.pondID ? 'Update Pond' : 'Add New Pond'}</h3>
                        <form onSubmit={savePond}>
                            <label htmlFor="size">Size (m²)</label>
                            <input
                                id="size"
                                name="size"
                                type="number"
                                value={formState.size}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="depth">Depth (m)</label>
                            <input
                                id="depth"
                                name="depth"
                                type="number"
                                value={formState.depth}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="volume">Volume (m³)</label>
                            <input
                                id="volume"
                                name="volume"
                                type="number"
                                value={formState.volume}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="drainageCount">Drainage Count</label>
                            <input
                                id="drainageCount"
                                name="drainageCount"
                                type="number"
                                value={formState.drainageCount || ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="pumpCapacity">Pump Capacity (m³/h)</label>
                            <input
                                id="pumpCapacity"
                                name="pumpCapacity"
                                type="number"
                                value={formState.pumpCapacity || ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="equipment">Equipment</label>
                            <input
                                id="equipment"
                                name="equipment"
                                type="text"
                                value={formState.equipment || ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={formState.quantity || ''}
                                onChange={handleInputChange}
                            />
                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    {formState.pondID ? 'Update Pond' : 'Add Pond'}
                                </button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pond;
