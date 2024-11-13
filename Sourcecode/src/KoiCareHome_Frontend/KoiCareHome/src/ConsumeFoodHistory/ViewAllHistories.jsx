const API_BASE_URL = 'http://localhost:8080/api/consumeFoodHistory';

const ViewAllHistoryies = async (fishID) => {
    const response = await fetch(`${API_BASE_URL}/fish?fishID=${fishID}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
};

export default ViewAllHistoryies;