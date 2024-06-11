import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/Navbar.jsx';
import Input from '../Componentes/Input.jsx';
import { CreateProject } from '../../Logica/ProyectoServices.js';
import Proyecto from '../../Entidades/Proyecto.js';
import { useUser } from '../UserContext.jsx';

const CrearProyecto = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useUser();

    const getTodayDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = getTodayDate();

        if (!user.cedula) {
            setError('No se ha encontrado la cédula del usuario.');
            return;
        }

        const newProject = new Proyecto(
            null,
            user.cedula,
            title,
            description,
            today,
            null, // No asignar fecha de entrega
            false
        );

        try {
            await CreateProject(newProject);
            navigate('/seleccion-proyecto');
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            setError('Hubo un error al crear el proyecto. Inténtelo nuevamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center">
            <div className="w-full">
                <Navbar />
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mt-8">
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                        Título
                    </label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Título del proyecto"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        placeholder="Descripción del proyecto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Crear Proyecto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CrearProyecto;
