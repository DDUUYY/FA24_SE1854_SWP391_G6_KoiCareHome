const API_BASE_URL = 'http://localhost:8080/api/breed';

const deleteBreed = async (breedID, memberID) => {
    const response = await fetch(`${API_BASE_URL}?breedId=${breedID}&memberId=${memberID}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
};

export default deleteBreed;