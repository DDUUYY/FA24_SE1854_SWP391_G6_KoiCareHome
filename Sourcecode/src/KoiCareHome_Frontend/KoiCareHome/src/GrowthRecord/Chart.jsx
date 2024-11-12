// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { useNavigate, useLocation } from "react-router-dom";
import './Chart.css';

/*
 * Author: Ha Huy Nghia Hiep
 * Date: October 25, 2024 
 */

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fishID = params.get('fishID');

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/GrowthRecord?fishID=${fishID}`);
            const records = await response.json();

            const labels = records.map(record => record.measurementDate);
            const sizeData = records.map(record => record.size);
            const weightData = records.map(record => record.weight);

            setData({
                labels: labels,
                datasets: [
                    {
                        label: "Size",
                        data: sizeData,
                        borderColor: "blue",
                        fill: false,
                    },
                    {
                        label: "Weight",
                        data: weightData,
                        borderColor: "green",
                        fill: false,
                    }
                ]
            });
        };

        if (fishID) fetchData();
    }, [location.search]);

    const handleBackClick = () => {
        const params = new URLSearchParams(location.search);
        const fishID = params.get('fishID');
        navigate(`/GrowthRecord?fishID=${fishID}`);
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">Growth Statistics</h2>
            <Line data={data} />
            <button onClick={handleBackClick} className="chart-back-button">Back</button>
            <button onClick={() => navigate(-1)} className="chart-back-button">Back</button>
        </div>
    );
};

export default Chart;