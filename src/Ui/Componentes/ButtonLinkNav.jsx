// src/components/ButtonLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLink = ({ to, onClick, children }) => {
    const baseClasses = "text-white px-3 py-2 rounded-md font-medium border border-white mx-2 hover:border-indigo-400 hover:bg-gray-700 hover:text-indigo-400";

    return (
        <li>
            {to ? (
                <Link to={to} className={`${baseClasses} text-base`}>
                    {children}
                </Link>
            ) : (
                <button onClick={onClick} className={`${baseClasses} text-sm`}>
                    {children}
                </button>
            )}
        </li>
    );
};

export default ButtonLink;
