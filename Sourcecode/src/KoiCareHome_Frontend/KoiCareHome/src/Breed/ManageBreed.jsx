import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaEdit, FaTrash} from 'react-icons/fa';
import { FaCircleArrowLeft } from "react-icons/fa6";
import './ManageBreed.css';
import deleteBreed from './DeleteBreed';
import fetchBreeds from './ViewAllBreeds';
import updateBreed from './UpdateBreed';
import addBreed from './AddBreed';

const BreedForm = ({ breed, onSubmit, onCancel, title }) => {
    const [formData, setFormData] = useState(breed);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['minTemperature', 'maxTemperature', 'minPH', 'maxPH', 'minWaterHardness', 'maxWaterHardness', 'minTankVolume'];
        setFormData(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? (value === '' ? '' : parseInt(value, 10)) : value
        }));
    };

    return (
        <div className="breed-modal-overlay">
            <div className="breed-modal-content">
                <h2>{title}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }} className="breed-form">
                    <input
                        type="text"
                        name="breedName"
                        value={formData.breedName}
                        onChange={handleChange}
                        placeholder="Breed Name"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description (Optional)"
                    />
                    <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        placeholder="Origin"
                        required
                    />
                    <input
                        type="number"
                        name="minTemperature"
                        value={formData.minTemperature}
                        onChange={handleChange}
                        placeholder="Min temperature - Celcius"
                        min="0"
                    />
                    <input
                        type="number"
                        name="maxTemperature"
                        value={formData.maxTemperature}
                        onChange={handleChange}
                        placeholder="Max temperature - Celcius"
                        min="0"
                    />
                    <input
                        type="number"
                        name="minPH"
                        value={formData.minPH}
                        onChange={handleChange}
                        placeholder="Min pH"
                        min="0"
                    />
                    <input
                        type="number"
                        name="maxPH"
                        value={formData.maxPH}
                        onChange={handleChange}
                        placeholder="Max pH"
                        min="0"
                    />
                    <input
                        type="number"
                        name="minWaterHardness"
                        value={formData.minWaterHardness}
                        onChange={handleChange}
                        placeholder="Min water hardness - mg/liter"
                        min="0"
                    />
                    <input
                        type="number"
                        name="maxWaterHardness"
                        value={formData.maxWaterHardness}
                        onChange={handleChange}
                        placeholder="Max water hardness - mg/liter"
                        min="0"
                    />
                    <input
                        type="text"
                        name="feedingInstructions"
                        value={formData.feedingInstructions}
                        onChange={handleChange}
                        placeholder="Feeding instructions"
                    />
                    <input
                        type="number"
                        name="minTankVolume"
                        value={formData.minTankVolume}
                        onChange={handleChange}
                        placeholder="Min tank volume - liters"
                        min="0"
                    />
                    <div className="button-group">
                        <button type="submit">{title === "Add New Breed" ? "Add" : "Update"}</button>
                        <button type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BreedCard = ({ breed, onEdit, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this breed?")) {
            onDelete(breed.breedID);
        }
    };

    return (
        <div className="breed-card">
            <h3>{breed.breedName}</h3>
            <div className="breed-details">
                <p>Description: {breed.description}</p>
                <p>Origin: {breed.origin}</p>
                <p>Min temperature: {breed.minTemperature}</p>
                <p>Max temperature: {breed.maxTemperature}</p>
                <p>Min pH: {breed.minPH}</p>
                <p>Max pH: {breed.maxPH}</p>
                <p>Min water hardness: {breed.minWaterHardness}</p>
                <p>Max water hardness: {breed.maxWaterHardness}</p>
                <p>Feeding instructions: {breed.feedingInstructions}</p>
                <p>Min tank volume: {breed.minTankVolume}</p>
            </div>
            <div className="breed-actions">
                <button onClick={() => onEdit(breed)} className="btn-edit">
                    <FaEdit size={18} />
                </button>
                <button onClick={handleDelete} className="btn-delete">
                    <FaTrash size={18} />
                </button>
            </div>
        </div>
    );
};

const ManageBreed = () => {
    const [breeds, setBreeds] = useState([]);
    const [memberID, setMemberID] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const emptyBreed = {
        breedName: '',
        description: '',
        origin: '',
        minTemperature: '',
        maxTemperature: '',
        minPH: '',
        maxPH: '',
        minWaterHardness: '',
        maxWaterHardness: '',
        feedingInstructions: '',
        minTankVolume: ''
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
            loadBreeds();
        }
    }, [memberID]);

    const loadBreeds = async () => {
        try {
            const data = await fetchBreeds();
            setBreeds(data);
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showNotification(errorMessage, 'error');
        }
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

    const handleCreate = async (breedData) => {
        try {
            const createdBreed = await addBreed(breedData, memberID);
            setBreeds(prev => [...prev, createdBreed]);
            setShowAddForm(false);
            showNotification('Breed added successfully!');
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showNotification(errorMessage, 'error');
        }
    };

    const handleUpdate = async (breedData) => {
        try {
            const updatedBreed = await updateBreed(breedData, memberID);
            setBreeds(prev => prev.map(breed => breed.breedID === updatedBreed.breedID ? updatedBreed : breed));
            setSelectedBreed(null);
            showNotification('Breed updated successfully!');
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showNotification(errorMessage, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBreed(id, memberID);
            setBreeds(prev => prev.filter(breed => breed.breedID !== id));
            showNotification('Breed deleted successfully!');
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showNotification(errorMessage, 'error');
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 5000); // Increased timeout for error messages
    };

    return (
        <div className="breed-management">
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            <div className="header">
                <h1>Breed Management</h1>
                <div className="add-breed-btn-icon">
                    <FaPlusCircle className="add-breed-btn-plus" onClick={() => setShowAddForm(true)} />
                </div>
            </div>
            <div className="breed-grid">
                {breeds.map(breed => (
                    <BreedCard
                        key={breed.breedID}
                        breed={breed}
                        onEdit={setSelectedBreed}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            {showAddForm && (
                <BreedForm
                    breed={emptyBreed}
                    onSubmit={handleCreate}
                    onCancel={() => setShowAddForm(false)}
                    title="Add New Breed"
                />
            )}
            {selectedBreed && (
                <BreedForm
                    breed={selectedBreed}
                    onSubmit={handleUpdate}
                    onCancel={() => setSelectedBreed(null)}
                    title="Edit Breed"
                />
            )}
            <div className="back-btn-icon">
                <FaCircleArrowLeft onClick={() => navigate('/home')} className="back-btn-plus" />
            </div>
        </div>
    );
};

export default ManageBreed;