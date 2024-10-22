// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
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
					placeholder="Weight (in grams)"
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
};

export default AddRecord;