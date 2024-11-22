/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import './Pond.css';
import HomeIcon from '../assets/HomeButton.png';

const equipmentOptions = [
    { value: 'Bộ lọc cơ học', label: 'Bộ lọc cơ học' },
    { value: 'Bộ lọc sinh học', label: 'Bộ lọc sinh học' },
    { value: 'Lọc hóa học', label: 'Lọc hóa học' },
    { value: 'Máy bơm nước', label: 'Máy bơm nước' },
    { value: 'Máy sục khí (máy oxy)', label: 'Máy sục khí (máy oxy)' },
    { value: 'Đèn UV', label: 'Đèn UV' },
    { value: 'Hệ thống cấp và thoát nước', label: 'Hệ thống cấp và thoát nước' },
    { value: 'Máy sưởi (nếu cần)', label: 'Máy sưởi (nếu cần)' },
    { value: 'Thiết bị đo nước', label: 'Thiết bị đo nước' },
    { value: 'Máy cho ăn tự động (tùy chọn)', label: 'Máy cho ăn tự động (tùy chọn)' },
    { value: 'Hệ thống che chắn', label: 'Hệ thống che chắn' },
    { value: 'Đá, cây thủy sinh, hoặc trang trí', label: 'Đá, cây thủy sinh, hoặc trang trí' },
];

const Pond = () => {
    const [ponds, setPonds] = useState([]);
    const [fishCounts, setFishCounts] = useState({});
    const [selectedPond, setSelectedPond] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState({
        pondID: null,
        size: '',
        depth: '',
        volume: '',
        drainageCount: '',
        pumpCapacity: '',
        equipment: [],
        quantity: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const memberID = parseInt(localStorage.getItem('userID'), 10);

    useEffect(() => {
        const fetchPonds = async () => {
            try {
                const response = await axios.get(`/api/pond/member?memberId=${memberID}`);
                const pondsData = response.data;

                const fishCountPromises = pondsData.map(async (pond) => {
                    try {
                        const fishResponse = await axios.get(`/api/fish/pond/${pond.pondID}/count`);
                        return { pondID: pond.pondID, count: fishResponse.data };
                    } catch (error) {
                        console.error(`Error fetching fish count for pond ${pond.pondID}:`, error);
                        return { pondID: pond.pondID, count: 0 };
                    }
                });

                const fishCountsArray = await Promise.all(fishCountPromises);
                const counts = fishCountsArray.reduce((acc, { pondID, count }) => {
                    acc[pondID] = count;
                    return acc;
                }, {});

                setPonds(pondsData);
                setFishCounts(counts);
            } catch (error) {
                console.error('Error fetching ponds:', error);
            }
        };

        fetchPonds();
    }, [memberID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleEquipmentChange = (selectedOptions) => {
        setFormState({
            ...formState,
            equipment: selectedOptions ? selectedOptions.map(option => option.value) : [],
        });
    };

    const validatePond = (pond) => {
        const errors = {};
        if (!pond.size || pond.size <= 0) errors.size = 'Size must be greater than 0';
        if (!pond.depth || pond.depth <= 0) errors.depth = 'Depth must be greater than 0';
        if (!pond.volume || pond.volume <= 0) errors.volume = 'Volume must be greater than 0';
        if (pond.drainageCount !== undefined && pond.drainageCount < 0)
            errors.drainageCount = 'Drainage Count must be 0 or greater';
        if (pond.pumpCapacity !== undefined && pond.pumpCapacity <= 0)
            errors.pumpCapacity = 'Pump Capacity must be greater than 0';
        if (pond.equipment && pond.equipment.length > 255)
            errors.equipment = 'Equipment must be at most 255 characters';
        if (pond.quantity !== undefined && pond.quantity < 0)
            errors.quantity = 'Quantity must be 0 or greater';

        return errors;
    };

    const savePond = async () => {
        const errors = validatePond(formState);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            if (selectedPond) {
                const response = await axios.put(`/api/pond/${selectedPond.pondID}`, {
                    ...formState,
                    equipment: formState.equipment.join(', '), // Convert mảng thành chuỗi
                });
                setPonds((prevPonds) =>
                    prevPonds.map((pond) =>
                        pond.pondID === selectedPond.pondID ? response.data : pond
                    )
                );
                setSelectedPond(response.data);
                alert('Pond updated successfully!');
            } else {
                const response = await axios.post('/api/pond', {
                    ...formState,
                    equipment: formState.equipment.join(', '), // Convert mảng thành chuỗi
                    memberID: localStorage.getItem('userID'),
                    isActive: true,
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
            equipment: [],
            quantity: '',
        });
        setFormErrors({});
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
                            className={`pond-card ${
                                selectedPond?.pondID === pond.pondID ? 'selected' : ''
                            }`}
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                savePond();
                            }}
                        >
                            <label htmlFor="size">Size (m²)</label>
                            <input
                                id="size"
                                name="size"
                                type="number"
                                value={formState.size}
                                onChange={handleInputChange}
                            />
                            {formErrors.size && <span className="error">{formErrors.size}</span>}

                            <label htmlFor="depth">Depth (m)</label>
                            <input
                                id="depth"
                                name="depth"
                                type="number"
                                value={formState.depth}
                                onChange={handleInputChange}
                            />
                            {formErrors.depth && <span className="error">{formErrors.depth}</span>}

                            <label htmlFor="volume">Volume (m³)</label>
                            <input
                                id="volume"
                                name="volume"
                                type="number"
                                value={formState.volume}
                                onChange={handleInputChange}
                            />
                            {formErrors.volume && <span className="error">{formErrors.volume}</span>}

                            <label htmlFor="drainageCount">Drainage Count</label>
                            <input
                                id="drainageCount"
                                name="drainageCount"
                                type="number"
                                value={formState.drainageCount || ''}
                                onChange={handleInputChange}
                            />
                            {formErrors.drainageCount && (
                                <span className="error">{formErrors.drainageCount}</span>
                            )}

                            <label htmlFor="pumpCapacity">Pump Capacity (m³/h)</label>
                            <input
                                id="pumpCapacity"
                                name="pumpCapacity"
                                type="number"
                                value={formState.pumpCapacity || ''}
                                onChange={handleInputChange}
                            />
                            {formErrors.pumpCapacity && (
                                <span className="error">{formErrors.pumpCapacity}</span>
                            )}

                            <label htmlFor="equipment">Equipment</label>
                            <Select
                                id="equipment"
                                isMulti
                                options={equipmentOptions}
                                onChange={handleEquipmentChange}
                                value={equipmentOptions.filter(option =>
                                    formState.equipment.includes(option.value)
                                )}
                            />
                            {formErrors.equipment && (
                                <span className="error">{formErrors.equipment}</span>
                            )}

                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={formState.quantity || ''}
                                onChange={handleInputChange}
                            />
                            {formErrors.quantity && (
                                <span className="error">{formErrors.quantity}</span>
                            )}

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