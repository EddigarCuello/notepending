import React from 'react';

const Label = ({ children }) => {
    return (
        <label className="text-white block mb-2">
            {children}
        </label>
    );
};

export default Label;