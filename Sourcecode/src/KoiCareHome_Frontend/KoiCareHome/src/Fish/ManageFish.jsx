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
        }
    };

    return (
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
