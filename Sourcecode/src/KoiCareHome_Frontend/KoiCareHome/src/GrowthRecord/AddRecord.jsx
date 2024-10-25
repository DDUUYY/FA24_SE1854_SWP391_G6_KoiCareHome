// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
		  navigate(`/GrowthRecord`);
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
		  />
		  <input
			type="number"
			name="weight"
			placeholder="Weight (in kilograms)"
			value={growthRecord.weight}
			onChange={handleInputChange}
			className="add-record-input"
			required
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
			onClick={() => navigate(`/growthRecord`)}
		  >
			Back
		  </button>
		</form>
	  </div>
	);
  };
  
  export default AddRecord;