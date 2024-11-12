// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import "./AddRecord.css";
/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 22, 2024
 */
const AddRecord = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		MeasurementDate: "",
		size: "",        
		weight: "",     
		description: ""  
	});

	const [error, setError] = useState("");

	useEffect(() => {
		const today = new Date();
		const formattedDate = today.toISOString().split("T")[0];
		setFormData((prevData) => ({
			...prevData,
			MeasurementDate: formattedDate
		}));
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate
		if (!formData.MeasurementDate || !formData.size || !formData.weight) {
			setError("Please fill in all required fields.");
			return;
		}

		try {
			const response = await fetch("http://localhost:8080/api/GrowthRecord", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				navigate("/GrowthRecord");
			} else {
				setError("Error adding the growth record.");
			}
		} catch (error) {
			setError("Error adding the growth record: " + error.message);
		}
	};

	return (
		<div className="add-record-container">
			<h1 className="add-record-title">Add New Growth Record</h1>
			{error && <p className="add-record-error">{error}</p>}
			<form onSubmit={handleSubmit} className="add-record-form">
				<input
					type="date"
					name="MeasurementDate"
					value={formData.MeasurementDate}
					onChange={handleInputChange}
					className="add-record-input"
					required
				/>
				<input
					type="number"
					name="size"  
					placeholder="Size (in cm)"
					value={formData.size}
					onChange={handleInputChange}
					className="add-record-input"
					required
				/>
				<input
					type="number"
					name="weight"  
					placeholder="Weight (in kilograms)"
					value={formData.weight}
					onChange={handleInputChange}
					className="add-record-input"
					required
				/>
				<input
					type="text"
					name="description"  
					placeholder="Description"
					value={formData.description}
					onChange={handleInputChange}
					className="add-record-input"
				/>
				<button type="submit" className="add-record-submit-btn">
					Add Record
				</button>
			</form>
		</div>
	);
=======
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
        measurementDate: '',
        size: '',
        weight: '',
        description: '',
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
  
	
	const handleSubmit = async (e) => {
        e.preventDefault();

        const { size, weight } = growthRecord;

        // Validate size and weight
        if (size <= 0 || size > 121.92) {
            setError("Size must be more than 0 and less than or equal to 121.92 cm.");
            return;
        }
        if (weight <= 0 || weight > 41) {
            setError("Weight must be more than 0 and less than or equal to 41 kg.");
            return;
        }

        if (!growthRecord.measurementDate || !growthRecord.size || !growthRecord.weight || !fishID) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/GrowthRecord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
                setError("Error adding the growth record.");
            }
        } catch (error) {
            setError("Error adding the growth record: " + error.message);
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
                    min="0.01" 
                    max="121.92" 
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (in kilograms)"
                    value={growthRecord.weight}
                    onChange={handleInputChange}
                    className="add-record-input"
                    required
                    min="0.01" 
                    max="41"
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
>>>>>>> GrowthRecord
};

export default AddRecord;