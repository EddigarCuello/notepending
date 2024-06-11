import React from 'react';

const ButtonLinklong = ({ onClick, children }) => {
    return (
        <button
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonLinklong;
