// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import updateFish from '../Fish/UpdateFish';
import "./AddRecord.css";

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 22, 2024 
 */

const AddRecord = () => {
    const navigate = useNavigate();
    const { fishID } = useParams();
    const [growthRecord, setGrowthRecord] = useState({
        measurementDate: "",
        size: "",
        weight: "",
        description: "",
        fishID: parseInt(fishID, 10),
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setGrowthRecord((prevData) => ({
            ...prevData,
            measurementDate: formattedDate,
        }));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGrowthRecord((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateInputs = () => {
		const { size, weight, measurementDate } = growthRecord;
		const today = new Date().toISOString().split("T")[0];
	
		if (measurementDate > today) {
			return "Measurement date cannot be in the future.";
		}
	
		if (size <= 0 || size > 125.92) {
			return "Size must be between 1 cm and 125.92 cm.";
		}
	
		if (weight <= 0 || weight > 16) {
			return "Weight must be between 1 kg and 16 kg.";
		}
	
		const sizeWeightRatio = weight / size; 
		if (sizeWeightRatio < 0.055 || sizeWeightRatio > 0.12) {
			return `Weight-to-size ratio is unrealistic. Please check your input.`;
		}
	
		return null;
	};


    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateInputs();
        if (error) {
            setError(error);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/GrowthRecord", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(growthRecord),
            });

            if (response.ok) {
                await updateFish({
                    fishID: fishID,
                    size: growthRecord.size,
                    weight: growthRecord.weight,
                });
                navigate(`/GrowthRecord?fishID=${fishID}`);
            } else {
                const errorData = await response.json();
                if (errorData.message.includes("already exists")) {
                    setError("A GrowthRecord for this fish on this date already exists.");
                } else {
                    setError("Error adding the growth record.");
                }
            }
        } catch (err) {
            setError("Error adding the growth record: " + err.message);
        }
    };

    return (
        <div className="add-record-container">
            <h1 className="add-record-title">Add New Growth Record</h1>
            {error && <p className="add-record-error">{error}</p>}
            <form onSubmit={handleSubmit} className="add-record-form">
                <input
                    type="date"
                    name="measurementDate"
                    value={growthRecord.measurementDate}
                    onChange={handleInputChange}
                    className="add-record-input"
                    required
                />
                <input
                    type="number"
                    name="size"
                    placeholder="Size (in cm)"
                    value={growthRecord.size}
                    onChange={handleInputChange}
                    className="add-record-input"
                    required
                    min="1"
                    max="122"
                    step="0.01"
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (in kilograms)"
                    value={growthRecord.weight}
                    onChange={handleInputChange}
                    className="add-record-input"
                    required
                    min="0"
                    max="41"
                    step="0.01"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={growthRecord.description}
                    onChange={handleInputChange}
                    className="add-record-input"
                />
                <button type="submit" className="add-record-submit-btn">
                    Add Record
                </button>
                <button
                    type="button"
                    className="profile-button back-button"
                    onClick={() => navigate(`/GrowthRecord?fishID=${fishID}`)}
                >
                    Back
                </button>
            </form>
        </div>
    );
};

export default AddRecord;