const API_BASE_URL = 'http://localhost:8080/api/breed';

const AddBreed = async (breedData, memberID) => {
    const breedToAdd = {
        ...breedData,
        minTemperature: breedData.minTemperature ? parseInt(breedData.minTemperature, 10) : null,
        maxTemperature: breedData.maxTemperature ? parseInt(breedData.maxTemperature, 10) : null,
        minPH: breedData.minPH ? parseInt(breedData.minPH, 10) : null,
        maxPH: breedData.maxPH ? parseInt(breedData.maxPH, 10) : null,
        minWaterHardness: breedData.minWaterHardness ? parseInt(breedData.minWaterHardness, 10) : null,
        maxWaterHardness: breedData.maxWaterHardness ? parseInt(breedData.maxWaterHardness, 10) : null,
        minTankVolume: breedData.minTankVolume ? parseInt(breedData.minTankVolume, 10) : null
    };

    const response = await fetch(`${API_BASE_URL}?memberId=${memberID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(breedToAdd)
    });

    if (!response.ok) {
        const errorData = await response.text(); // Fetch the error message text
        throw new Error(errorData); // Throw an error with the specific message
    }
    
    return await response.json();
};

export default AddBreed;