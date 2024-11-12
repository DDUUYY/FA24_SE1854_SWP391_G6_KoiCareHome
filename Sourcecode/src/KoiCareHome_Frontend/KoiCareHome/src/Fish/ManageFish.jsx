<<<<<<< HEAD
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ManageFish.css';
// import { FaPlus } from 'react-icons/fa';

/*
 * Author: Quach To Anh
 * Date: October 20, 2024
 */
const API_BASE_URL = 'http://localhost:8080/api/fish';


const ManageFish = () => {
    const [fishes, setFishes] = useState([]);
    const [memberID, setMemberID] = useState();
    const [newFish, setNewFish] = useState({ name: '', pondID: '', memberID: memberID, size: '', weight: '', age: '', gender: '', breed: '', origin: '', price: '' });
    const [selectedFish, setSelectedFish] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const id = localStorage.getItem("userID");
            if (id) {
                setMemberID(id);
                loadFishes(id);
            } else {
                console.error('User ID not found');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }

    }, [navigate]);

    useEffect(() => {
        if (memberID) {
            setNewFish((prev) => ({ ...prev, memberID })); // Update memberID in newFish
            loadFishes(memberID);
        }
    }, [memberID]);

    const loadFishes = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/member?memberId=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setFishes(data);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching fishes:', error);
            // Show a user-friendly error to the user, if needed
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFish, memberID ),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setNewFish({ name: '', pondID: '', memberID: memberID, size: '', weight: '', age: '', gender: '', breed: '', origin: '', price: '' });
            loadFishes(memberID);
        } catch (error) {
            console.error('Error creating fish:', error);
            // Show an error message to the user, if desired
        }
    };
    

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this fish?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${API_BASE_URL}?fishId=${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    loadFishes(memberID);
                } else {
                    console.error('Error deleting fish:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting fish:', error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}?fishId=${selectedFish.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedFish),
            });
            if (response.ok) {
                setSelectedFish(null);
                loadFishes(memberID);
            } else {
                console.error('Error updating fish:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating fish:', error);
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ManageFish.css';
import createFish from './AddFish';
import readFishes from './ViewAllFishes';
import updateFish from './UpdateFish';
import deleteFish from './DeleteFish';

const FishForm = ({ fish, onSubmit, onCancel, title, memberID }) => {
    const [formData, setFormData] = useState(fish);
    const [ponds, setPonds] = useState([]);

    useEffect(() => {
        const fetchPonds = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/pond/member?memberId=${memberID}`);
                if (!response.ok) throw new Error('Failed to fetch ponds');
                const data = await response.json();
                setPonds(data);
            } catch (error) {
                console.error('Error fetching ponds:', error);
            }
        };

        if (memberID) {
            fetchPonds();
        }
    }, [memberID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['pondID', 'size', 'weight', 'age', 'price'];
        setFormData(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? (value === '' ? '' : parseInt(value, 10)) : value
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }} className="fish-form">
                    <select
                        name="pondID"
                        value={formData.pondID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Pond</option>
                        {ponds && ponds.map(pond => (
                            <option key={pond.pondID} value={pond.pondID}>
                                Pond: {pond.pondID}
                            </option>
                        ))}
                    </select>
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
                        placeholder="Fish Size - cm"
                        min="0"
                    />
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Fish Weight - kg"
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
>>>>>>> GrowthRecord
        }
    };

    return (
<<<<<<< HEAD
        <div className="fish-component">
            <h2>Fish List</h2>
            <ul className="fish-list">
                {fishes.map((fish) => (
                    <li key={fish.id} className="fish-item">
                        {fish.name} - (Pond ID: {fish.pondID})
                        <button onClick={() => setSelectedFish(fish)}>Edit</button>
                        <button onClick={() => handleDelete(fish.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Add New Fish</h2>
            <form onSubmit={handleSubmit} className="fish-form">
                <input
                    type="number"
                    name="pondID"
                    value={newFish.pondID}
                    onChange={(e) => setNewFish({ ...newFish, pondID: e.target.value })}
                    placeholder="Pond ID"
                    min="0"
                    step="1"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={newFish.name}
                    onChange={(e) => setNewFish({ ...newFish, name: e.target.value })}
                    placeholder="Fish Name"
                    required
                />
                <input
                    type="number"
                    name="size"
                    value={newFish.size}
                    onChange={(e) => setNewFish({ ...newFish, size: e.target.value })}
                    min="0"
                    placeholder="Fish Size"
                />
                <input
                    type="number"
                    name="weight"
                    value={newFish.weight}
                    onChange={(e) => setNewFish({ ...newFish, weight: e.target.value })}
                    min="0"
                    placeholder="Fish Weight"
                />
                <input
                    type="number"
                    name="age"
                    value={newFish.age}
                    onChange={(e) => setNewFish({ ...newFish, age: e.target.value })}
                    min="0"
                    step="1"
                    placeholder="Fish Age"
                />
                <input
                    type="radio"
                    name="gender"
                    value="Male" // Set value for Male
                    checked={newFish.gender === "Male"} // Check if this is the selected value
                    onChange={(e) => setNewFish({ ...newFish, gender: e.target.value })}
                />
                Male
                <input
                    type="radio"
                    name="gender"
                    value="Female" // Set value for Female
                    checked={newFish.gender === "Female"} // Check if this is the selected value
                    onChange={(e) => setNewFish({ ...newFish, gender: e.target.value })}
                />
                Female
                <input
                    type="text"
                    name="breed"
                    value={newFish.breed}
                    onChange={(e) => setNewFish({ ...newFish, breed: e.target.value })}
                    placeholder="Fish Breed"
                    required
                />
                <input
                    type="text"
                    name="origin"
                    value={newFish.origin}
                    onChange={(e) => setNewFish({ ...newFish, origin: e.target.value })}

                    placeholder="Fish Origin"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newFish.price}
                    onChange={(e) => setNewFish({ ...newFish, price: e.target.value })}
                    placeholder="Fish Price"
                    min="0"
                    required
                />
                <input type="hidden" name="memberID" value={memberID} />
                <button type="submit">Add Fish</button>
            </form>

            {selectedFish && (
                <div className="edit-fish">
                    <h2>Edit Fish</h2>
                    <form onSubmit={handleUpdate} className="fish-form">
                        <input
                            type="number"
                            name="pondID"
                            value={selectedFish.pondID}
                            onChange={(e) => setSelectedFish({ ...selectedFish, pondID: e.target.value })}
                            placeholder="Pond ID"
                            min="0"
                            step="1"
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            value={selectedFish.name}
                            onChange={(e) => setSelectedFish({ ...selectedFish, name: e.target.value })}
                            placeholder="Fish Name"
                            required
                        />
                        <input
                            type="number"
                            name="size"
                            value={selectedFish.size}
                            onChange={(e) => setSelectedFish({ ...selectedFish, size: e.target.value })}
                            placeholder="Fish Size"
                            min="0"
                        />
                        <input
                            type="number"
                            name="weight"
                            value={selectedFish.weight}
                            onChange={(e) => setSelectedFish({ ...selectedFish, weight: e.target.value })}
                            placeholder="Fish Weight"
                            min="0"
                        />
                        <input
                            type="number"
                            name="age"
                            value={selectedFish.age}
                            onChange={(e) => setSelectedFish({ ...selectedFish, age: e.target.value })}
                            placeholder="Fish Age"
                            min="0"
                            step="1"
                        />
                        <input
                            type="radio"
                            name="gender"
                            value="Male" // Set value for Male
                            checked={selectedFish.gender === "Male"} // Check if this is the selected value
                            onChange={(e) => setSelectedFish({ ...selectedFish, gender: e.target.value })}
                        />
                        Male
                        <input
                            type="radio"
                            name="gender"
                            value="Female" // Set value for Female
                            checked={selectedFish.gender === "Female"} // Check if this is the selected value
                            onChange={(e) => setSelectedFish({ ...selectedFish, gender: e.target.value })}
                        />
                        Female
                        <input
                            type="text"
                            name="breed"
                            value={selectedFish.breed}
                            onChange={(e) => setSelectedFish({ ...selectedFish, breed: e.target.value })}
                            placeholder="Fish Breed"
                            required
                        />
                        <input
                            type="text"
                            name="origin"
                            value={selectedFish.origin}
                            onChange={(e) => setSelectedFish({ ...selectedFish, origin: e.target.value })}
                            placeholder="Fish Origin"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            value={selectedFish.price}
                            onChange={(e) => setSelectedFish({ ...selectedFish, price: e.target.value })}
                            placeholder="Fish Price"
                            min="0"
                            required
                        />
                        <button type="submit">Update Fish</button>
                        <button onClick={() => setSelectedFish(null)}>Cancel</button>
                    </form>
                </div>
            )}

            <button onClick={() => navigate('/home')} className="back-button">Back to Home</button>
        </div>
    );
}

export default ManageFish;
=======
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
    const [ponds, setPonds] = useState([]);
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
            fetchPonds();
        }
    }, [memberID]);

    const fetchPonds = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/pond/member?memberId=${memberID}`);
            if (!response.ok) throw new Error('Failed to fetch ponds');
            const data = await response.json();
            setPonds(data);
        } catch (error) {
            console.error('Error fetching ponds:', error);
            showNotification('Error loading ponds', 'error');
        }
    };

    const loadFishes = async (id) => {
        try {
            const data = await readFishes(id);
            setFishes(data);
        } catch (error) {
            showNotification('Error loading fishes', 'error');
        }
    };

    const handleCreate = async (fishData) => {
        try {
            const createdFish = await createFish(fishData, memberID);
            setFishes(prev => [...prev, createdFish]);
            setShowAddForm(false);
            showNotification('Fish added successfully!');
        } catch (error) {
            showNotification('Error adding fish', 'error');
        }
    };

    const handleUpdate = async (fishData) => {
        try {
            const updatedFish = await updateFish(fishData);
            setFishes(prev => prev.map(fish => fish.fishID === updatedFish.fishID ? updatedFish : fish));
            setSelectedFish(null);
            showNotification('Fish updated successfully!');
        } catch (error) {
            showNotification('Error updating fish', 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteFish(id);
            setFishes(prev => prev.filter(fish => fish.fishID !== id));
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
                />
            )}
            {selectedFish && (
                <FishForm
                    fish={selectedFish}
                    onSubmit={handleUpdate}
                    onCancel={() => setSelectedFish(null)}
                    title="Edit Fish"
                    memberID={memberID}
                />
            )}
            <button onClick={() => navigate('/home')} className="back-button">
                Back to Home
            </button>
        </div>
    );
};

export default ManageFish;
>>>>>>> GrowthRecord
