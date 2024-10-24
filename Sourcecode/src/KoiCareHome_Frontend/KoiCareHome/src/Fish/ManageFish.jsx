import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ManageFish.css';

const API_BASE_URL = 'http://localhost:8080/api/fish';

const FishForm = ({ fish, onSubmit, onCancel, title }) => {
    const [formData, setFormData] = useState(fish);
    console.log('Form data:', formData); // Thêm dòng này

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['pondID', 'size', 'weight', 'age', 'price'];
        setFormData(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? (value === '' ? '' : parseInt(value, 10)) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit} className="fish-form">
                    <input
                        type="number"
                        name="pondID"
                        value={formData.pondID}
                        onChange={handleChange}
                        placeholder="Pond ID"
                        min="0"
                        step="1"
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Fish Name"
                        required
                    />
                    <input
                        type="number"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder="Fish Size"
                        min="0"
                    />
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Fish Weight"
                        min="0"
                    />
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Fish Age"
                        min="0"
                        step="1"
                    />
                    <div className="radio-group">
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
                    <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        placeholder="Fish Breed"
                        required
                    />
                    <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        placeholder="Fish Origin"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Fish Price"
                        min="0"
                        required
                    />
                    <div className="button-group">
                        <button type="submit">{title === "Add New Fish" ? "Add" : "Update"}</button>
                        <button type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FishCard = ({ fish, onEdit, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this fish?")) {
            onDelete(fish.fishID);
        }
    };

    return (
        <div className="fish-card">
            <h3>{fish.name}</h3>
            <div className="fish-details">
                <p>Pond ID: {fish.pondID}</p>
                <p>Breed: {fish.breed}</p>
                <p>Size: {fish.size}</p>
                <p>Weight: {fish.weight}</p>
                <p>Age: {fish.age}</p>
                <p>Gender: {fish.gender}</p>
                <p>Origin: {fish.origin}</p>
                <p>Price: ${fish.price}</p>
            </div>
            <div className="fish-actions">
                <button onClick={() => onEdit(fish)} className="edit-btn">Edit</button>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
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
    const navigate = useNavigate();

    const emptyFish = {
        name: '',
        pondID: '',
        memberID: memberID,
        size: '',
        weight: '',
        age: '',
        gender: '',
        breed: '',
        origin: '',
        price: ''
    };

    useEffect(() => {
        const id = localStorage.getItem("userID");
        if (id) {
            setMemberID(parseInt(id, 10));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (memberID) {
            loadFishes(memberID);
        }
    }, [memberID]);

    const loadFishes = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/member?memberId=${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            const parsedFishes = Array.isArray(data) ? data.map(fish => ({
                ...fish,
                fishID: parseInt(fish.fishID, 10),
                pondID: parseInt(fish.pondID, 10),
                size: fish.size ? parseInt(fish.size, 10) : null,
                weight: fish.weight ? parseInt(fish.weight, 10) : null,
                age: fish.age ? parseInt(fish.age, 10) : null,
                price: parseInt(fish.price, 10)
            })) : [];

            setFishes(parsedFishes);
            console.log('Loaded fishes:', parsedFishes); // Thêm dòng này
        } catch (error) {
            showNotification('Error loading fishes', 'error');
        }
    };

    const handleCreate = async (fishData) => {
        const fishToAdd = {
            ...fishData,
            memberID,
            pondID: parseInt(fishData.pondID, 10),
            size: fishData.size ? parseInt(fishData.size, 10) : null,
            weight: fishData.weight ? parseInt(fishData.weight, 10) : null,
            age: fishData.age ? parseInt(fishData.age, 10) : null,
            price: parseInt(fishData.price, 10)
        };

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fishToAdd),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const createdFish = await response.json();
            console.log('Created fish:', createdFish); // Thêm dòng này
            setFishes(prev => [...prev, {
                ...createdFish,
                fishID: parseInt(createdFish.fishID, 10),
                pondID: parseInt(createdFish.pondID, 10)
            }]);
            setShowAddForm(false);
            showNotification('Fish added successfully!');
        } catch (error) {
            showNotification('Error adding fish', 'error');
        }
    };

    const handleUpdate = async (fishData) => {
        const fishID = parseInt(fishData.fishID, 10);
        if (isNaN(fishID)) {
            showNotification('Invalid fish ID', 'error');
            return;
        }

        const updatedFish = {
            ...fishData,
            fishID: fishID,
            pondID: parseInt(fishData.pondID, 10),
            size: fishData.size ? parseInt(fishData.size, 10) : null,
            weight: fishData.weight ? parseInt(fishData.weight, 10) : null,
            age: fishData.age ? parseInt(fishData.age, 10) : null,
            price: parseInt(fishData.price, 10)
        };

        try {
            const response = await fetch(`${API_BASE_URL}?fishId=${fishID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFish),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            setFishes(prev => prev.map(fish =>
                fish.fishID === fishID ? updatedFish : fish
            ));
            setSelectedFish(null);
            showNotification('Fish updated successfully!');
        } catch (error) {
            showNotification('Error updating fish', 'error');
        }
    };

    const handleDelete = async (id) => {
        const fishID = parseInt(id, 10);
        if (isNaN(fishID)) {
            showNotification('Invalid fish ID', 'error');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}?fishId=${fishID}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            setFishes(prev => prev.filter(fish => fish.fishID !== fishID));
            showNotification('Fish deleted successfully!');
        } catch (error) {
            showNotification('Error deleting fish', 'error');
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
                <button onClick={() => setShowAddForm(true)} className="add-btn">
                    Add New Fish
                </button>
            </div>

            <div className="fish-grid">
                {fishes.map(fish => (
                    <FishCard
                        key={fish.fishID}
                        fish={fish}
                        onEdit={setSelectedFish}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {showAddForm && (
                <FishForm
                    fish={emptyFish}
                    onSubmit={handleCreate}
                    onCancel={() => setShowAddForm(false)}
                    title="Add New Fish"
                />
            )}

            {selectedFish && selectedFish.fishID && (
                <FishForm
                    fish={selectedFish}
                    onSubmit={handleUpdate}
                    onCancel={() => setSelectedFish(null)}
                    title="Edit Fish"
                />
            )}

            <button onClick={() => navigate('/home')} className="back-button">
                Back to Home
            </button>
        </div>
    );
};

export default ManageFish;
