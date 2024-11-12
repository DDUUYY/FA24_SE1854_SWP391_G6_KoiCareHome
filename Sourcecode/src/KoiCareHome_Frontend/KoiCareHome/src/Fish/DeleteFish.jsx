const API_BASE_URL = 'http://localhost:8080/api/fish';

const deleteFish = async (fishID) => {
    const response = await fetch(`${API_BASE_URL}?fishId=${fishID}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
};

export default deleteFish;
