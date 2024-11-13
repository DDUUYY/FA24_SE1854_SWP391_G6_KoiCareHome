const API_BASE_URL = 'http://localhost:8080/api/consumeFoodHistory';

const deleteConsumeFoodHistory = async (consumptionID) => {
    const response = await fetch(`${API_BASE_URL}?consumeFoodHistoryID=${consumptionID}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
};

export default deleteConsumeFoodHistory;