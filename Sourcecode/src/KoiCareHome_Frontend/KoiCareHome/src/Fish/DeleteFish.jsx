const API_BASE_URL = 'http://localhost:8080/api/fish';

const deleteFish = async (fishID) => {
    const response = await fetch(`${API_BASE_URL}?fishId=${fishID}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.text(); // Fetch the error message text
        throw new Error(errorData); // Throw an error with the specific message
    }
};

export default deleteFish;