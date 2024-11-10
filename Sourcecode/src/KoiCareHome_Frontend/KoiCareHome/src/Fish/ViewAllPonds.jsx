const API_BASE_URL = 'http://localhost:8080/api/pond';

const ViewAllPonds = async (memberID) => {
    const response = await fetch(`${API_BASE_URL}/member?memberId=${memberID}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
};

export default ViewAllPonds;