// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { getPonds, deletePond } from '../api';

const PondList = () => {
    const [ponds, setPonds] = useState([]);

    useEffect(() => {
        fetchPonds();
    }, []);

    const fetchPonds = async () => {
        const response = await getPonds();
        setPonds(response.data);
    };

    const handleDelete = async (id) => {
        await deletePond(id);
        fetchPonds();
    };

    return (
        <div>
            <h1>Pond List</h1>
            <ul>
                {ponds.map((pond) => (
                    <li key={pond.pondId}>
                        {pond.name} - {pond.depth}m
                        <button onClick={() => handleDelete(pond.pondId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PondList;
