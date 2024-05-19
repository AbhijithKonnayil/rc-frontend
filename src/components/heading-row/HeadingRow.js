import React from 'react';
import { FaCog, FaSearch } from 'react-icons/fa';
import './heading-row.css';

const HeadingRow = ({ heading }) => {
    return (
        <div className="top-row">
            <h1>{heading}</h1>
            <div className="top-row-controls">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
                <FaCog className="settings-icon" />
            </div>
        </div>
    );
};

export default HeadingRow;
