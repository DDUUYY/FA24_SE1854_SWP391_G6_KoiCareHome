import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaFish, FaWater, FaBalanceScale, FaWeight, FaEdit, FaTrash } from 'react-icons/fa';
import { FaCircleArrowLeft } from "react-icons/fa6";
import './ManageFish.css';
import createFish from './AddFish';
import readFishes from './ViewAllFishes';
import readPonds from './ViewAllPonds';
import updateFish from './UpdateFish';
import deleteFish from './DeleteFish';
import fetchBreeds from '../Breed/ViewAllBreeds';

const FishForm = ({ fish, onSubmit, onCancel, title, ponds, breeds }) => {
    const [formData, setFormData] = useState(fish);
    const [ageMonth, setAgeMonth] = useState(0);

    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - birth.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
        setAgeMonth(diffMonths);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'birthday') {
            calculateAge(value);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ ...formData, ageMonth });
                }} className="fish-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>
                                <FaWater className="input-icon" />
                                Select Pond
                            </label>
                            <select
                                name="pondID"
                                value={formData.pondID}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose a pond</option>
                                {ponds.map(pond => (
                                    <option key={pond.pondID} value={pond.pondID}>
                                        {`Pond ${pond.pondID}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                <FaFish className="input-icon" />
                                Koi Breed
                            </label>
                            <select
                                name="breedID"
                                value={formData.breedID}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select breed</option>
                                {breeds.map(breed => (
                                    <option key={breed.breedID} value={breed.breedID}>{breed.breedName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Fish Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter fish name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div className="gender-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === "Male"}
                                        onChange={handleChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === "Female"}
                                        onChange={handleChange}
                                    />
                                    Female
                                </label>
                            </div>
                        </div>


                        <div className="form-group">
                            <label>
                                <FaBalanceScale className="input-icon" />
                                Size (cm)
                            </label>
                            <input
                                type="number"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                step="0.1"
                                placeholder="Enter size"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <FaWeight className="input-icon" />
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                step="0.1"
                                placeholder="Enter weight"
                            />
                        </div>

                        <div className="form-group">
                            <label>Birthday</label>
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                required
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                        <div className="form-group">
                            <label>Age (Months)</label>
                            <input
                                type="number"
                                value={ageMonth}
                                readOnly
                                className="readonly-input"
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="submit-button">
                            {title === "Add New Fish" ? "Add" : "Update"}
                        </button>
                        <button type="button" onClick={onCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FishCard = ({ fish, breeds, onEdit, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this fish?")) {
            onDelete(fish.fishID);
        }
    };

    return (
        <div className="fish-card">
            <h3>{fish.name}</h3>
            <div className="fish-details">
                <p>Pond: {fish.pondID}</p>
                <p>Breed: {breeds.find(b => b.breedID === fish.breedID)?.breedName}</p>
                <p>Size: {fish.size} cm</p>
                <p>Weight: {fish.weight} kg</p>
                <p>Age: {fish.ageMonth} months</p>
                <p>Gender: {fish.gender}</p>
            </div>
            <div className="fish-actions">
                <button onClick={() => onEdit(fish)} className="edit-btn">
                    <FaEdit /> Edit
                </button>
                <button onClick={handleDelete} className="delete-btn">
                    <FaTrash /> Delete
                </button>
            </div>
        </div>
    );
};

const ManageFish = () => {
    const [fishes, setFishes] = useState([]);
    const [memberID, setMemberID] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedFish, setSelectedFish] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [ponds, setPonds] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const navigate = useNavigate();

    const emptyFish = {
        name: '',
        pondID: '',
        breedID: '',
        gender: '',
        birthday: '',
        size: '',
        weight: '',
    };

    const extractErrorMessage = (error) => {
        if (error.response) {
            // Handle structured error response
            if (error.response.data && error.response.data.message) {
                return error.response.data.message;
            }
            // Handle plain text error response
            if (typeof error.response.data === 'string') {
                return error.response.data;
            }
            // Handle HTTP status text
            return `Error: ${error.response.statusText}`;
        }
        // Handle network errors or other issues
        return error.message || 'An unexpected error occurred';
    };

    useEffect(() => {
        const id = localStorage.getItem('userID');
        if (id) {
            setMemberID(parseInt(id, 10));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const loadData = async () => {
            if (!memberID) return;

            try {
                const [fishesData, pondData, breedData] = await Promise.all([
                    readFishes(memberID),
                    readPonds(memberID),
                    fetchBreeds()
                ]);

                setFishes(fishesData);
                setPonds(pondData);
                setBreeds(breedData);
            } catch (error) {
                const errorMessage = extractErrorMessage(error);
                showNotification(errorMessage, 'error');
            }
        };

        loadData();
    }, [memberID]);

    const handleCreate = async (fishData) => {
        try {
            const createdFish = await createFish(fishData, memberID);
            setFishes(prev => [...prev, createdFish]);
            setShowAddForm(false);
            showNotification('Fish added successfully!');
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showNotification(errorMessage, 'error');
        }
    };

    const handleUpdate = async (fishData) => {
        // Kiểm tra xem tên cá đã tồn tại trong danh sách cá hay chưa
        const isNameExists = fishes.some(fish => fish.name === fishData.name && fish.fishID !== fishData.fishID);
        if (isNameExists) {
            showNotification('Fish name has already existed in this pond!', 'error');
            return; // Dừng lại nếu tên đã tồn tại
        }

        try {
            const updatedFish = await updateFish({ ...fishData });
            setFishes(prev => prev.map(fishData =>
                fishData.fishID === updatedFish.fishID ? updatedFish : fishData
            ));
            setSelectedFish(null);
            showNotification('Fish updated successfully!');
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showNotification(errorMessage, 'error');
        }
    };

    const handleDelete = async (fishId) => {
        try {
            await deleteFish(fishId);
            setFishes(prev => prev.filter(fish => fish.fishID !== fishId));
            showNotification('Fish deleted successfully!');
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showNotification(errorMessage, 'error');
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    return (
        <div className="fish-management">
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <div className="header">
                <h1>Fish Management</h1>
                <div className="add-koi-btn-icon">
                    <FaPlusCircle
                        className="add-koi-btn-plus"
                        onClick={() => setShowAddForm(true)}
                    />
                </div>
            </div>

            <div className="fish-grid">
                {fishes.map(fish => (
                    <FishCard
                        key={fish.fishID}
                        fish={fish}
                        onEdit={setSelectedFish}
                        onDelete={handleDelete}
                        breeds={breeds}
                        ponds={ponds}
                    />
                ))}
            </div>

            {showAddForm && (
                <FishForm
                    fish={emptyFish}
                    onSubmit={handleCreate}
                    onCancel={() => setShowAddForm(false)}
                    title="Add New Fish"
                    memberID={memberID}
                    ponds={ponds}
                    breeds={breeds}
                />
            )}

            {selectedFish && (
                <FishForm
                    fish={selectedFish}
                    onSubmit={handleUpdate}
                    onCancel={() => setSelectedFish(null)}
                    title="Edit Fish"
                    memberID={memberID}
                    ponds={ponds}
                    breeds={breeds}
                />
            )}

            <div className="back-btn-icon">
                <FaCircleArrowLeft
                    onClick={() => navigate('/home')}
                    className="back-btn-plus"
                />
            </div>
        </div>
    );
};

export default ManageFish;