import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <Link to="/salt-calculation">Go to Salt Calculation</Link>
            </nav>
        </div>
    );
}

export default Home;
