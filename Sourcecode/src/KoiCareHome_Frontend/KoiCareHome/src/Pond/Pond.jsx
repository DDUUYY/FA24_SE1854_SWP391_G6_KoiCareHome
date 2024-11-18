/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Pond.css';
import HomeIcon from '../assets/HomeButton.png';

const Pond = () => {
    const [ponds, setPonds] = useState([]);
    const navigate = useNavigate();
    const [selectedPond, setSelectedPond] = useState(null); // Hiển thị chi tiết Pond
    const [showForm, setShowForm] = useState(false); // Hiển thị form
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

    const memberID = parseInt(localStorage.getItem('userID'), 10); // Lấy userID từ localStorage

    // Gọi API để lấy danh sách hồ cá
    useEffect(() => {
        const fetchPonds = async () => {
            try {
                const response = await axios.get(`/api/pond/member?memberId=${memberID}`);
                setPonds(response.data);
            } catch (error) {
                console.error('Error fetching ponds:', error);
            }
        };
        fetchPonds();
    }, [memberID]);

    // Xử lý khi nhập dữ liệu vào form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    // Lưu hồ cá (thêm mới hoặc cập nhật)
    const savePond = async () => {
        if (!formState.size || !formState.depth || !formState.volume) {
            alert("Please fill in all required fields: size, depth, and volume.");
            return;
        }
    
        try {
            if (selectedPond) {
                // Gửi yêu cầu cập nhật
                const response = await axios.put(`/api/pond/${selectedPond.pondID}`, formState);
    
                // Cập nhật danh sách Pond trong state
                setPonds((prevPonds) =>
                    prevPonds.map((pond) =>
                        pond.pondID === selectedPond.pondID ? response.data : pond
                    )
                );
    
                // Cập nhật Pond chi tiết đang hiển thị
                setSelectedPond(response.data);
    
                alert("Pond updated successfully!");
            } else {
                // Gửi yêu cầu thêm mới
                const response = await axios.post('/api/pond', {
                    ...formState,
                    memberID: localStorage.getItem('userID'),
                    isActive: true,
                });
                setPonds([...ponds, response.data]);
                alert("Pond added successfully!");
            }
    
            // Reset form và đóng modal
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error('Error saving pond:', error.response?.data || error.message);
            alert(`Error saving pond: ${error.response?.data || error.message}`);
        }
    };
    

    // Xóa hồ cá
    const deletePond = async (id) => {
        if (window.confirm('Are you sure you want to delete this pond?')) {
            try {
                await axios.delete(`/api/pond/${id}`);
                setPonds(ponds.filter((pond) => pond.pondID !== id));
                alert('Pond deleted successfully!');
                setSelectedPond(null); // Xóa thông tin chi tiết
            } catch (error) {
                console.error('Error deleting pond:', error);
            }
        }
    };

    // Reset form
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
        }); // Reset trạng thái form
        setShowForm(false); // Đóng form
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
            {/* Header với tiêu đề và nút Create Pond */}
            <div className="pond-header">
                <button
                    className="create-pond-button"
                    onClick={() => {
                        resetForm();
                        setShowForm(true); // Hiển thị form thêm mới
                    }}
                >
                    Create Pond
                </button>
            </div>

            {/* Layout chính */}
            <div className="pond-main">
                {/* Danh sách Pond bên trái */}
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

                {/* Chi tiết Pond bên phải */}
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
                        <button
                            className="update-button"
                            onClick={() => {
                                setFormState(selectedPond);
                                setShowForm(true); // Hiển thị form cập nhật
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

            {/* Form thêm hoặc cập nhật Pond */}
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
