// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ManageFish.css';
import { FaPlus } from 'react-icons/fa';

/*
 * Author: Quach To Anh
 * Date: October 20, 2024
 */
const API_BASE_URL = 'http://localhost:8080/api/fish';


const ManageFish = () => {
    const [fishes, setFishes] = useState([]);
    const [newFish, setNewFish] = useState({ name: '', species: '', pondId: '' });
    const [selectedFish, setSelectedFish] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadFishes();
    }, []);

    const loadFishes = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            if (response.ok) {
                const data = await response.json();
                setFishes(data);
            } else {
                console.error('Error fetching fishes:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching fishes:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewFish({ ...newFish, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFish),
            });
            if (response.ok) {
                setNewFish({ name: '', species: '', pondId: '' });
                loadFishes();
            } else {
                console.error('Error creating fish:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating fish:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this fish?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    loadFishes();
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
            const response = await fetch(`${API_BASE_URL}/${selectedFish.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedFish),
            });
            if (response.ok) {
                setSelectedFish(null);
                loadFishes();
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
                        {fish.name} - (Pond ID: {fish.pondId})
                        <button onClick={() => setSelectedFish(fish)}>Edit</button>
                        <button onClick={() => handleDelete(fish.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Add New Fish</h2>
            <form onSubmit={handleSubmit} className="fish-form">
                <input
                    type="number"
                    name="pondId"
                    value={newFish.pondId}
                    onChange={handleInputChange}
                    placeholder="Pond ID"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={newFish.name}
                    onChange={handleInputChange}
                    placeholder="Fish Name"
                    required
                />
                <input
                    type="number"
                    name="size"
                    value={newFish.size}
                    onChange={handleInputChange}
                    placeholder="Fish Size"
                />
                <input
                    type="number"
                    name="weight"
                    value={newFish.weight}
                    onChange={handleInputChange}
                    placeholder="Fish Weight"
                />
                <input
                    type="number"
                    name="age"
                    value={newFish.species}
                    onChange={handleInputChange}
                    placeholder="Fish Age"
                />
                <input
                    type="text"
                    name="gender"
                    value={newFish.gender}
                    onChange={handleInputChange}
                    placeholder="Fish Gender"
                />
                <input
                    type="text"
                    name="breed"
                    value={newFish.breed}
                    onChange={handleInputChange}
                    placeholder="Fish Breed"
                    required
                />
                <input
                    type="text"
                    name="origin"
                    value={newFish.origin}
                    onChange={handleInputChange}
                    placeholder="Fish Origin"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newFish.price}
                    onChange={handleInputChange}
                    placeholder="Fish Price"
                    required
                />
                <button type="submit">Add Fish</button>
            </form>

            {selectedFish && (
                <div className="edit-fish">
                    <h2>Edit Fish</h2>
                    <form onSubmit={handleUpdate} className="fish-form">
                        <input
                        type="number"
                        name="pondId"
                        value={selectedFish.pondId}
                        onChange={(e) => setSelectedFish({ ...selectedFish, pondId: e.target.value })}
                        placeholder="Pond ID"
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
                    />
                    <input
                        type="number"
                        name="weight"
                        value={selectedFish.weight}
                        onChange={(e) => setSelectedFish({ ...selectedFish, weight: e.target.value })}
                        placeholder="Fish Weight"
                    />
                    <input
                        type="number"
                        name="age"
                        value={selectedFish.age}
                        onChange={(e) => setSelectedFish({ ...selectedFish, age: e.target.value })}
                        placeholder="Fish Age"
                    />
                    <input
                        type="text"
                        name="gender"
                        value={selectedFish.gender}
                        onChange={(e) => setSelectedFish({ ...selectedFish, gender: e.target.value })}
                        placeholder="Fish Gender"
                    />
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
