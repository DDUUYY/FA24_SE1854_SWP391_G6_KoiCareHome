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
    const [previousRecords, setPreviousRecords] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setGrowthRecord((prev) => ({ ...prev, measurementDate: today }));
    }, []);

    useEffect(() => {
        const fetchPreviousRecords = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/GrowthRecord?fishID=${fishID}`);
                if (response.ok) {
                    const data = await response.json();
                    setPreviousRecords(data);
                }
            } catch (err) {
                console.error("Error fetching records:", err);
            }
        };
        fetchPreviousRecords();
    }, [fishID]);

    const validateInputs = (records) => {
        const { size, weight, measurementDate } = growthRecord;
        const today = new Date().toISOString().split("T")[0];

        if (measurementDate > today) {
            return "Measurement date cannot be in the future.";
        }

        if (records.some((record) => record.measurementDate === measurementDate)) {
            return "A GrowthRecord for this fish on this date already exists.";
        }

        if (size <= 1 || size > 126) {
            return "Size must be between 1 cm and 126 cm.";
        }

        if (weight <= 1 || weight > 38) {
            return "Weight must be between 1 kg and 38 kg.";
        }

        const sizeWeightRatio = weight / size;
        if (sizeWeightRatio < 0.055 || sizeWeightRatio > 0.12) {
            return "Weight-to-size ratio is unrealistic.";
        }

        if (records.length > 0) {
            const latestRecord = records[records.length - 1];
            const daysBetween =
                (new Date(measurementDate) - new Date(latestRecord.measurementDate)) / (1000 * 60 * 60 * 24);

            if (daysBetween <= 0) {
                return "Measurement date must be after the latest record date.";
            }

            const sizeIncrease = size - latestRecord.size;
            const weightIncrease = weight - latestRecord.weight;
            const maxSizeIncrease = daysBetween * 1.0;
            const maxWeightIncrease = latestRecord.weight * 0.05 * daysBetween;

            if (sizeIncrease > maxSizeIncrease) {
                return `Size increase exceeds allowable growth of ${maxSizeIncrease.toFixed(2)} cm over ${daysBetween} days.`;
            }

            if (weightIncrease > maxWeightIncrease) {
                return `Weight increase exceeds allowable growth of ${maxWeightIncrease.toFixed(2)} kg over ${daysBetween} days.`;
            }
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateInputs(previousRecords);
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
                await updateFish({ fishID: fishID, size: growthRecord.size, weight: growthRecord.weight });
                navigate(`/GrowthRecord?fishID=${fishID}`);
            } else {
                setError("Error adding the growth record.");
            }
        } catch (err) {
            setError("Error adding the growth record: " + err.message);
        }
    };

    return (
        <div className="add-record-container">
            <h1 className="add-record-title">Add New Growth Record</h1>
            {error && <div className="add-record-error">{error}</div>}
            <form onSubmit={handleSubmit} className="add-record-form">
                <input
                    type="date"
                    name="measurementDate"
                    className="add-record-input"
                    value={growthRecord.measurementDate}
                    onChange={(e) => setGrowthRecord({ ...growthRecord, measurementDate: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="size"
                    className="add-record-input"
                    placeholder="Size (cm)"
                    value={growthRecord.size}
                    onChange={(e) => setGrowthRecord({ ...growthRecord, size: parseFloat(e.target.value) })}
                    required
                />
                <input
                    type="number"
                    name="weight"
                    className="add-record-input"
                    placeholder="Weight (kg)"
                    value={growthRecord.weight}
                    onChange={(e) => setGrowthRecord({ ...growthRecord, weight: parseFloat(e.target.value) })}
                    required
                />
                <input
                    type="text"
                    name="description"
                    className="add-record-input"
                    placeholder="Description"
                    value={growthRecord.description}
                    onChange={(e) => setGrowthRecord({ ...growthRecord, description: e.target.value })}
                />
                <button type="submit" className="add-record-submit-btn">Add Record</button>
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