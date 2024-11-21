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
    const [suggestions, setSuggestions] = useState([]);
    const [fishDetails, setFishDetails] = useState({ name: '', pond: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fishID = params.get('fishID');

        const fetchData = async () => {
            const growthResponse = await fetch(`http://localhost:8080/api/GrowthRecord?fishID=${fishID}`);
            const growthRecords = await growthResponse.json();

            const fishResponse = await fetch(`http://localhost:8080/api/fish/${fishID}`);
            const fish = await fishResponse.json();

            setFishDetails({
                name: fish.name,
                pond: fish.pondID ? `Pond ${fish.pondID}` : 'No pond assigned',
            });

            const sortedRecords = growthRecords.sort((a, b) => new Date(a.measurementDate) - new Date(b.measurementDate));

            const labels = sortedRecords.map(record => record.measurementDate);
            const sizeData = sortedRecords.map(record => record.size);
            const weightData = sortedRecords.map(record => record.weight);

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

            if (sortedRecords.length > 4) {
                analyzeGrowthTrends(sortedRecords);
            } else {
                setSuggestions(["Add more growth records to see tailored suggestions."]);
            }
        };

        if (fishID) fetchData();
    }, [location.search]);

    const analyzeGrowthTrends = (records) => {
        const suggestions = [];
        let isConsistentDecline = true; // Flag to track consistent decline in growth
    
        const growthRates = records.map((record, index) => {
            if (index === 0) return null;
            const prevRecord = records[index - 1];
            const daysBetween =
                (new Date(record.measurementDate) - new Date(prevRecord.measurementDate)) / (1000 * 60 * 60 * 24);
    
            return {
                sizeGrowthPerDay: (record.size - prevRecord.size) / daysBetween,
                weightGrowthPerDay: (record.weight - prevRecord.weight) / daysBetween,
                size: record.size,
                weight: record.weight,
            };
        }).filter(Boolean);
    
        const latestGrowth = growthRates[growthRates.length - 1];
    
        // Check if there is a consistent decline in size and weight
        for (let i = 1; i < growthRates.length; i++) {
            const prev = growthRates[i - 1];
            const current = growthRates[i];
    
            if (current.size >= prev.size || current.weight >= prev.weight) {
                isConsistentDecline = false; // Not a consistent decline
                break;
            }
        }
    
        if (latestGrowth.sizeGrowthPerDay > 0 && latestGrowth.sizeGrowthPerDay < 0.1 || latestGrowth.weightGrowthPerDay > 0 && latestGrowth.weightGrowthPerDay < 0.02) {
            suggestions.push("Fish growth is slow. Consider adjusting feeding habits or water parameters.");
        }
    
        if (latestGrowth.sizeGrowthPerDay > 0.9 || latestGrowth.weightGrowthPerDay > 0.4) {
            suggestions.push("Fish growth is too fast. Check for overfeeding and potential health risks.");
        }
    
        if (isConsistentDecline) {
            suggestions.push("Fish growth is down. Investigate potential health or environmental issues.");
        }
    
        setSuggestions(suggestions.length > 0 ? suggestions : ["Growth is on track. Keep monitoring."]);
    };

    const handleNavigateToFoodHistory = () => {
        navigate(`/consume-food-history`);
    };

    const handleNavigateToPond = () => {
        navigate(`/Pond`);
    };

    const handleNavigateToFoodCalculator = () => {
        navigate(`/calulator/food`);
    };

    const handleBackClick = () => {
        const params = new URLSearchParams(location.search);
        const fishID = params.get('fishID');
        navigate(`/GrowthRecord?fishID=${fishID}`);
    };
    const handleNavigateToManageFish = () => {
        navigate(`/manage-fish`);
    };

    
    return (
        <div className="chart-container">
            <h2 className="chart-title">Growth Statistics</h2>
            <h4>{fishDetails.name} - {fishDetails.pond}</h4>
            <Line data={data} />
            <div className="suggestions-container">
                <h3>Growth Suggestions</h3>
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            {suggestion}
                            {suggestion.includes("Fish growth is slow") && (
                                <div className="suggestion-buttons">
                                    <button onClick={handleNavigateToFoodHistory} className="chart-back-button">
                                        View Food History
                                    </button>
                                    <button onClick={handleNavigateToFoodCalculator} className="chart-back-button">
                                        Food Calculator
                                    </button>
                                </div>
                            )}
                            {suggestion.includes("Fish growth is too fast") && (
                                <div className="suggestion-buttons">
                                    <button onClick={handleNavigateToFoodHistory} className="chart-back-button">
                                        View Food History
                                    </button>
                                    <button onClick={handleNavigateToFoodCalculator} className="chart-back-button">
                                        Food Calculator
                                    </button>
                                </div>
                            )}
                            {suggestion.includes("Fish growth is down") && (
                                <div className="suggestion-buttons">
                                    <button onClick={handleNavigateToFoodHistory} className="chart-back-button">
                                        View Food History
                                    </button>
                                    <button onClick={handleNavigateToPond} className="chart-back-button">
                                        View Pond
                                    </button>
                                    <button onClick={handleNavigateToManageFish} className="chart-back-button">
                                        Manage Fish
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleBackClick} className="chart-back-button">Back</button>
        </div>
    );
};

export default Chart;