// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { FaEye, FaTrashAlt, FaPlusCircle, FaChartBar } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
=======
import { FaEye, FaTrashAlt, FaPlusCircle ,FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
>>>>>>> ToAnh_Fish
import "./GrowthRecord.css";
import ViewRecord from './ViewRecord';

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 22, 2024 
 */

const GrowthRecord = () => {
    const [growthRecords, setGrowthRecords] = useState([]);
    const [fishes, setFishes] = useState([]);
    const [selectedFish, setSelectedFish] = useState(null);
<<<<<<< HEAD
    const [ViewOpen, setViewOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const fishID = queryParams.get("fishID");
        if (fishID) {
            setSelectedFish(fishID);
        }
    }, [location]);
=======
    const [ViewOpen, setViewOpen] = useState(false); 
    const [selectedRecord, setSelectedRecord] = useState(null); 
    const navigate = useNavigate();
>>>>>>> ToAnh_Fish

    useEffect(() => {
        if (selectedFish) {
            loadGrowthRecords(selectedFish);
        } else {
<<<<<<< HEAD
            setGrowthRecords([]);
        }
    }, [selectedFish]);

=======
            setGrowthRecords([]); // Clear records if no fish is selected
        }
    }, [selectedFish]);

    // Fetch available fishes on component load
>>>>>>> ToAnh_Fish
    useEffect(() => {
        loadFishes();
    }, []);

    const loadGrowthRecords = async (fishID) => {
        try {
            const response = await fetch(`http://localhost:8080/api/GrowthRecord?fishID=${fishID}`);
            if (response.ok) {
                const data = await response.json();
                setGrowthRecords(data);
            } else {
                console.error("Failed to fetch growth records");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const loadFishes = async () => {
        try {
            const userId = localStorage.getItem("userID");
            const response = await fetch(`http://localhost:8080/api/fish/member?memberId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setFishes(data);
            } else {
                console.error("Failed to fetch fish");
            }
        } catch (error) {
            console.error("Error fetching fish:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/GrowthRecord/${id}`, {
                method: "DELETE",
            });
            if (selectedFish) {
<<<<<<< HEAD
                loadGrowthRecords(selectedFish);
=======
                loadGrowthRecords(selectedFish); 
>>>>>>> ToAnh_Fish
            }
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const renderArrow = (currentValue, previousValue) => {
        if (currentValue > previousValue) {
            return <span style={{ color: 'green', fontSize: '1.5em', marginLeft: '10px' }}>↑</span>;
        } else if (currentValue < previousValue) {
            return <span style={{ color: 'red', fontSize: '1.5em', marginLeft: '10px' }}>↓</span>;
        }
        return null;
    };

    const handleFishSelect = (e) => {
        const fishID = e.target.value;
        setSelectedFish(fishID || null);
    };

    const openView = (record) => {
        setSelectedRecord(record);
        setViewOpen(true);
    };

    const closeView = () => {
        setViewOpen(false);
        setSelectedRecord(null);
    };

    return (
        <section className="record-section">
<<<<<<< HEAD
            <div className="fish-select-container">
                <div className="fish-select">
                    <label htmlFor="fish">Select Fish:</label>
                    <select
                        id="fish"
                        value={selectedFish || ''}
                        onChange={handleFishSelect}
                        disabled={fishes.length === 0}
                    >
                        <option value="" disabled>Select a fish</option>
                        {fishes.map((fish) => (
                            <option key={fish.fishID} value={fish.fishID}>
                                {fish.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="add-record-icon">
                    <FaPlusCircle
                        className="add-record-plus"
                        onClick={() => selectedFish && navigate(`/addRecord/${selectedFish}`)}
                        style={{ cursor: selectedFish ? 'pointer' : 'not-allowed', color: selectedFish ? '#2cc650' : 'gray' }}
                    />
                </div>
            </div>
            <table className="records-table">
                <thead>
                    <tr>
                        <th>No.</th>
=======
            <div className="fish-select">
                <label htmlFor="fish">Select Fish:</label>
                <select
                   id="fish"
                   value={selectedFish || ''}
                   onChange={handleFishSelect}
                   disabled={fishes.length === 0}
                >
                <option value="" disabled>Select a fish</option>
                {fishes.map((fish) => (
                    <option key={fish.fishID} value={fish.fishID}>
                        {fish.name}
                    </option>
                ))}
                </select>
            </div>

            <div className="add-record-icon">
                <FaPlusCircle
                    className="add-record-plus"
                    onClick={() => selectedFish && navigate(`/addRecord/${selectedFish}`)}
                    style={{ cursor: selectedFish ? 'pointer' : 'not-allowed', color: selectedFish ? '#2cc650' : 'gray' }}
                />
            </div>

            <table className="records-table">
                <thead>
                    <tr>
                        <th>ID</th>
>>>>>>> ToAnh_Fish
                        <th>Measurement Date</th>
                        <th>Size</th>
                        <th>Weight</th>
                        <th>Description</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {growthRecords
                        .map((record, index) => {
                            const previousRecord = index > 0 ? growthRecords[index - 1] : null;
                            return (
                                <tr key={record.recordID}>
                                    <td>{index + 1}</td>
                                    <td>{record.measurementDate}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {record.size}
                                            {previousRecord && renderArrow(record.size, previousRecord.size)}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {record.weight}
                                            {previousRecord && renderArrow(record.weight, previousRecord.weight)}
                                        </div>
                                    </td>
                                    <td>{record.description}</td>
                                    <td>
<<<<<<< HEAD
                                        <button
                                            className="action-button view"
                                            onClick={() => openView(record)}
=======
                                        <button 
                                            className="action-button view" 
                                            onClick={() => openView(record)} 
>>>>>>> ToAnh_Fish
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="action-button delete"
                                            onClick={() => handleDelete(record.recordID)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <button
<<<<<<< HEAD
                    type="button"
                    className="profile-button statistics-button"
                    onClick={() => navigate(`/chart?fishID=${selectedFish}`)}
                    disabled={!selectedFish}
                >
                    <FaChartBar />
                </button>
=======
                type="button"
                className="profile-button statistics-button"
                onClick={() => navigate(`/chart?fishID=${selectedFish}`)}
                disabled={!selectedFish}
            >
                <FaChartBar /> 
            </button>
>>>>>>> ToAnh_Fish
                <button
                    type="button"
                    className="profile-button back-button"
                    onClick={() => navigate(`/home`)}
<<<<<<< HEAD
                >
                    Back
=======
                > 
                    Back 
>>>>>>> ToAnh_Fish
                </button>
            </table>

            <ViewRecord isOpen={ViewOpen} onClose={closeView} record={selectedRecord} />
        </section>
    );
};

export default GrowthRecord;