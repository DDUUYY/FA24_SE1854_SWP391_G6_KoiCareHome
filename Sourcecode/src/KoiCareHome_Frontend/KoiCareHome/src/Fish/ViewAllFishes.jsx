const API_BASE_URL = 'http://localhost:8080/api/fish';

const ViewAllFishes = async (memberID) => {
    const response = await fetch(`${API_BASE_URL}/member?memberId=${memberID}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
};

export default ViewAllFishes;
