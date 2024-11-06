const API_BASE_URL = 'http://localhost:8080/api/fish';

const AddFish = async (fishData, memberID) => {
    const fishToAdd = {
        ...fishData,
        memberID,
        pondID: parseInt(fishData.pondID, 10),
        size: fishData.size ? parseInt(fishData.size, 10) : null,
        weight: fishData.weight ? parseInt(fishData.weight, 10) : null,
        age: fishData.age ? parseInt(fishData.age, 10) : null,
        price: parseInt(fishData.price, 10)
    };

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fishToAdd)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
};

export default AddFish;