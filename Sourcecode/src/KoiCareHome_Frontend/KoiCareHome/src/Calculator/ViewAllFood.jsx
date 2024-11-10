const API_BASE_URL = 'http://localhost:8080/api/food';

const ViewAllFoods = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
};

export default ViewAllFoods;