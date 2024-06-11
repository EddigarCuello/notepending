import React, { useState, useEffect } from 'react';
import { GetPersonas } from '../../Logica/PersonaServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const PersonasPopup = ({ onClose, onAdd }) => {
    const [personas, setPersonas] = useState([]);
    const [filter, setFilter] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const result = await GetPersonas();
                setPersonas(result);
            } catch (error) {
                console.error('Error fetching personas:', error);
                setError('Error al obtener las personas');
            }
        };

        fetchPersonas();
    }, []);

    const filteredPersonas = personas.filter(persona =>
        persona && persona.nombre && persona.nombre.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-5 rounded-lg w-[20%] h-[50%] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-xl">Agregar Miembro</h2>
                    <button onClick={onClose} className="text-white">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <input 
                    type="text" 
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white"
                    placeholder="Filtrar por nombre"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
                {error ? (
                    <div className="text-red-500 mb-4">{error}</div>
                ) : (
                    <ul className="overflow-y-auto max-h-[50vh] mb-4">
                        {filteredPersonas.map(persona => (
                            <li key={persona.cedula} className="flex justify-between items-center p-2 bg-gray-700 mb-1 rounded-md">
                                <span className="text-white">{persona.nombre}</span>
                                <button onClick={() => onAdd(persona)} className="text-white">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </li>
                        ))}
                        {filteredPersonas.length === 0 && (
                            <li className="text-white p-2">No hay personas disponibles</li>
                        )}
                    </ul>
                )}
                <button onClick={onClose} className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700">
                    Volver
                </button>
            </div>
        </div>
    );
};

export default PersonasPopup;
