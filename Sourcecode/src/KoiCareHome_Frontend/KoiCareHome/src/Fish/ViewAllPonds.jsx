const API_BASE_URL = 'http://localhost:8080/api/pond';

const ViewAllPonds = async (memberID) => {
    const response = await fetch(`${API_BASE_URL}/member?memberId=${memberID}`);
    if (!response.ok) {
        const errorData = await response.text(); // Fetch the error message text
        throw new Error(errorData); // Throw an error with the specific message
    }
    return await response.json();
};

export default ViewAllPonds;