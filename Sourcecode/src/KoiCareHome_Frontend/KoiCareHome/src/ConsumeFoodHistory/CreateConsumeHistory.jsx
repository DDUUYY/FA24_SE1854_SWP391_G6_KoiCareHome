const API_BASE_URL = 'http://localhost:8080/api/consumeFoodHistory';

const CreateConsumeHistory = async (consumeHistoryData) => {
    const consumeHistoryToAdd = {
        ...consumeHistoryData,
        fishID: parseInt(consumeHistoryData.fishID, 10),
        foodID: parseInt(consumeHistoryData.foodID, 10),
        quantity: consumeHistoryData.quantity ? parseInt(consumeHistoryData.quantity, 10) : null
    };
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consumeHistoryToAdd)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
};

export default CreateConsumeHistory;