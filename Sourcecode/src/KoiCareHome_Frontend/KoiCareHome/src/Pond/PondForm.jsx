// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createPond } from '../api';

const PondForm = () => {
    const [pond, setPond] = useState({
        name: '',
        depth: '',
        volume: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPond({ ...pond, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPond(pond);
        setPond({ name: '', depth: '', volume: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Name"
                value={pond.name}
                onChange={handleChange}
            />
            <input
                name="depth"
                placeholder="Depth"
                value={pond.depth}
                onChange={handleChange}
            />
            <input
                name="volume"
                placeholder="Volume"
                value={pond.volume}
                onChange={handleChange}
            />
            <button type="submit">Add Pond</button>
        </form>
    );
};

export default PondForm;
