const API_BASE_URL = 'http://localhost:8080/api/breed';

const updateBreed = async (breedData, memberID) => {
    const breedID = parseInt(breedData.breedID, 10);
    if (isNaN(breedID)) throw new Error('Invalid breed ID');

    const updatedBreed = {
        ...breedData,
        breedID,
        size: breedData.size ? parseInt(breedData.size, 10) : null,
        weight: breedData.weight ? parseInt(breedData.weight, 10) : null
    };

    const response = await fetch(`${API_BASE_URL}?breedId=${breedID}&memberId=${memberID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBreed)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return updatedBreed; // return the updated breed data
};

export default updateBreed;
