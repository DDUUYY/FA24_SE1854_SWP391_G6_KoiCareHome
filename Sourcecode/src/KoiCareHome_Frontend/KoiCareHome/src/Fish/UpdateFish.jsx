const API_BASE_URL = 'http://localhost:8080/api/fish';

const updateFish = async (fishData) => {
    const fishID = parseInt(fishData.fishID, 10);
    if (isNaN(fishID)) throw new Error('Invalid fish ID');

    const updatedFish = {
        ...fishData,
        fishID,
        pondID: parseInt(fishData.pondID, 10),
        size: fishData.size ? parseInt(fishData.size, 10) : null,
        weight: fishData.weight ? parseInt(fishData.weight, 10) : null,
        age: fishData.age ? parseInt(fishData.age, 10) : null,
        price: parseInt(fishData.price, 10)
    };

    const response = await fetch(`${API_BASE_URL}?fishId=${fishID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFish)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return updatedFish; // return the updated fish data
};

export default updateFish;
