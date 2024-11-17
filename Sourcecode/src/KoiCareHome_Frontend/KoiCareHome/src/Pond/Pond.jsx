/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './Pond.css';

const Pond = () => {
    const [ponds, setPonds] = useState([]);
    const [selectedPond, setSelectedPond] = useState(null); // Hiển thị chi tiết Pond
    const [showForm, setShowForm] = useState(false); // Hiển thị form
    const [formState, setFormState] = useState({
        memberID: '',
        reminderID: '',
        size: '',
        depth: '',
        volume: '',
        drainageCount: '',
        pumpCapacity: '',
        equipment: '',
        quantity: '',
        createBy: 'System', // Giá trị mặc định
        updateBy: '',
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

    // Thêm hoặc cập nhật hồ cá
    const savePond = async () => {
        // Lấy memberID từ localStorage
        const memberID = localStorage.getItem('userID');
    
        // Kiểm tra memberID và các trường bắt buộc
        if (!memberID || !formState.size || !formState.depth || !formState.volume) {
            alert("Please fill in all required fields: memberID, size, depth, and volume.");
            return;
        }
    
        try {
            if (selectedPond) {
                // Cập nhật hồ cá
                await axios.put(`/api/pond/${selectedPond.pondID}`, formState);
                alert('Pond updated successfully!');
            } else {
                // Thêm mới hồ cá
                const response = await axios.post('/api/pond', {
                    ...formState,
                    memberID, // Thêm memberID từ localStorage
                    isActive: true, // Mặc định là true
                });
                setPonds([...ponds, response.data]);
                alert('Pond added successfully!');
            }
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
                setSelectedPond(null);
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
        }); // Reset về trạng thái mặc định
    
        setShowForm(false); // Ẩn form
    };
    
    return (
        <div className="pond-container">
            {/* Header với tiêu đề và nút Create Pond */}
            <div className="pond-header">
                <h1>Pond Management</h1>
                <button
                    className="create-pond-button"
                    onClick={() => {
                        setFormState({
                            pondID: null,
                            memberID: localStorage.getItem('userID'), // Lấy memberID từ localStorage
                            reminderID: 1,
                            size: '',
                            depth: '',
                            volume: '',
                            drainageCount: '',
                            pumpCapacity: '',
                            equipment: '',
                            quantity: '',
                            isActive: true,
                        });
                        setShowForm(true);
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
                            className="pond-card"
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
                        <p><strong>Pond ID:</strong> {selectedPond.pondID}</p>
                        <p><strong>Member ID:</strong> {selectedPond.memberID}</p>
                        <p><strong>Reminder ID:</strong> {selectedPond.reminderID}</p>
                        <p><strong>Size:</strong> {selectedPond.size} m²</p>
                        <p><strong>Depth:</strong> {selectedPond.depth} m</p>
                        <p><strong>Volume:</strong> {selectedPond.volume} m³</p>
                        <p><strong>Drainage Count:</strong> {selectedPond.drainageCount || 'N/A'}</p>
                        <p><strong>Pump Capacity:</strong> {selectedPond.pumpCapacity || 'N/A'} m³/h</p>
                        <p><strong>Equipment:</strong> {selectedPond.equipment || 'N/A'}</p>
                        <p><strong>Quantity:</strong> {selectedPond.quantity || 'N/A'}</p>
                        <button className="update-button" onClick={() => handleEdit(selectedPond)}>Update Pond</button>
                        <button className="delete-button" onClick={() => handleDelete(selectedPond.pondID)}>Delete Pond</button>
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
                                type="number"
                                value={formState.size}
                                onChange={(e) =>
                                    setFormState({ ...formState, size: e.target.value })
                                }
                                required
                            />

                            <label htmlFor="depth">Depth (m)</label>
                            <input
                                id="depth"
                                type="number"
                                value={formState.depth}
                                onChange={(e) =>
                                    setFormState({ ...formState, depth: e.target.value })
                                }
                                required
                            />

                            <label htmlFor="volume">Volume (m³)</label>
                            <input
                                id="volume"
                                type="number"
                                value={formState.volume}
                                onChange={(e) =>
                                    setFormState({ ...formState, volume: e.target.value })
                                }
                                required
                            />

                            <label htmlFor="drainageCount">Drainage Count</label>
                            <input
                                id="drainageCount"
                                type="number"
                                value={formState.drainageCount || ''}
                                onChange={(e) =>
                                    setFormState({ ...formState, drainageCount: e.target.value })
                                }
                            />

                            <label htmlFor="pumpCapacity">Pump Capacity (m³/h)</label>
                            <input
                                id="pumpCapacity"
                                type="number"
                                value={formState.pumpCapacity || ''}
                                onChange={(e) =>
                                    setFormState({ ...formState, pumpCapacity: e.target.value })
                                }
                            />

                            <label htmlFor="equipment">Equipment</label>
                            <input
                                id="equipment"
                                type="text"
                                value={formState.equipment || ''}
                                onChange={(e) =>
                                    setFormState({ ...formState, equipment: e.target.value })
                                }
                            />

                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                value={formState.quantity || ''}
                                onChange={(e) =>
                                    setFormState({ ...formState, quantity: e.target.value })
                                }
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
