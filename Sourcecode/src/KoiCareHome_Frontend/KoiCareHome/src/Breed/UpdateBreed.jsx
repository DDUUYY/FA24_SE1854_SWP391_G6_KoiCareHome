const API_BASE_URL = 'http://localhost:8080/api/breed';

const updateBreed = async (breedData) => {
    const breedID = parseInt(breedData.breedID, 10);
    if (isNaN(breedID)) throw new Error('Invalid breed ID');

    const updatedBreed = {
        ...breedData,
        breedID,
        size: breedData.size ? parseInt(breedData.size, 10) : null,
        weight: breedData.weight ? parseInt(breedData.weight, 10) : null
    };

    const response = await fetch(`${API_BASE_URL}?breedId=${breedID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBreed)
    });

    if (!response.ok) {
        const errorData = await response.text(); // Fetch the error message text
        throw new Error(errorData); // Throw an error with the specific message
    }

    return updatedBreed; // return the updated breed data
};

export default updateBreed;
