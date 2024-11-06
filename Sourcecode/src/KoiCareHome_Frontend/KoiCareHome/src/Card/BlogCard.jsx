// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import LogoBlog from '../assets/LogoBlog.jpg';
import './GrCard.css';

const BlogCard = () => {
    return (
        <Link to="/public-blogs">
            <div className="card">
                <img className="card-image" src={LogoBlog} alt="Blog"></img>
                <h2 className="card-title">Blog</h2>
                <p className="card-description">Create and explore blogs on Koi care from enthusiasts and experts alike.</p>
            </div>
        </Link>
    );
};

export default BlogCard;
