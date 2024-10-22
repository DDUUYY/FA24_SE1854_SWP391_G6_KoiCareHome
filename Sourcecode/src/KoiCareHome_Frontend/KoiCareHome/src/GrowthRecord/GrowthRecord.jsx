// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrashAlt, FaPlusCircle } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";
import "./GrowthRecord.css";
/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 22, 2024
 */

const GrowthRecord = () => {
	const [growthRecords, setGrowthRecords] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		loadGrowthRecords();
	}, []);

	const loadGrowthRecords = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/GrowthRecord");
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

	const handleDelete = async (id) => {
		try {
			await fetch(`http://localhost:8080/api/GrowthRecord/${id}`, {
				method: "DELETE",
			});
			loadGrowthRecords();
		} catch (error) {
			console.error("Error deleting record:", error);
		}
	};

	const renderArrow = (currentValue, previousValue) => {
        if (currentValue > previousValue) {
            return <span style={{ color: 'green', fontSize: '1.5em' }}>↑</span>; 
        } else if (currentValue < previousValue) {
            return <span style={{ color: 'red', fontSize: '1.5em' }}>↓</span>; 
        }
        return null; 
    };

	return (
		<section className="record-section">
			<div className="add-record-icon" onClick={() => navigate("/addRecord")}>
				<FaPlusCircle className="add-record-plus" />
			</div>

			<table className="records-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Measurement Date</th>
						<th>Size</th>
						<th>Weight</th>
						<th>Description</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>
				<tbody>
					{growthRecords.map((record, index) => {
						const previousRecord = index > 0 ? growthRecords[index - 1] : null;
						return (
							<tr key={record.recordID}>
								<td>{index + 1}</td>
								<td>{record.measurementDate}</td>
								<td>
									{record.size} {previousRecord && renderArrow(record.size, previousRecord.size)}
								</td>
								<td>
									{record.weight} {previousRecord && renderArrow(record.weight, previousRecord.weight)}
								</td>
								<td>{record.description}</td>
								<td>
									<Link to={`/ViewGrowthRecord/${record.recordID}`} className="action-button view">
										<FaEye />
									</Link>
								</td>
								<td>
									<Link to={`/UpdateRecord/${record.recordID}`} className="action-button edit">
										<FaEdit />
									</Link>
								</td>
								<td>
									<button
										className="action-button delete"
										onClick={() => handleDelete(record.recordID)}>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
};

export default GrowthRecord;