import React from 'react';

const LabelTitulo = ({ children }) => {
    return (
        <label className="text-red-500 block mb-2 text-4xl font-bold">
            {children}
        </label>
    );
};

export default LabelTitulo;