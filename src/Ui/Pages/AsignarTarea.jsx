import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/Navbar.jsx';
import Input from '../Componentes/Input.jsx';
import { CreateTask } from '../../Logica/TareaServices.js';
import Tarea from '../../Entidades/tarea.js';
import { useUser } from '../UserContext.jsx';
import { useProject } from '../ProyectContext.jsx'; // Importar el hook del contexto del proyecto
import { GetMiembrosByField } from '../../Logica/ProyectoServices.js';

const AsignarTarea = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useUser(); // Obtener el usuario del contexto
    const { project } = useProject(); // Obtener el proyecto del contexto

    useEffect(() => {
        if (project && project.id) {
            const fetchMembers = async () => {
                try {
                    const miembros = await GetMiembrosByField('idProyecto', project.id);
                    setMembers(miembros || []);
                } catch (error) {
                    console.error('Error al obtener miembros:', error);
                }
            };
            fetchMembers();
        } else {
            console.error('El proyecto o el ID del proyecto no está definido');
        }
    }, [project]);

    const getTodayDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = getTodayDate(); // Fecha de hoy en formato YYYY-MM-DD

        if (dueDate < today) {
            setError('La fecha de vencimiento no puede ser anterior a la fecha de hoy.');
            return;
        }

        // Verificar que la cédula está disponible
        console.log('Cédula antes de crear la tarea:', user.cedula);
        if (!user.cedula) {
            setError('No se ha encontrado la cédula del usuario.');
            return;
        }

        // Crear una nueva tarea con la cédula del usuario
        const newTask = new Tarea(
            null,
            selectedMember,
            title,
            description,
            difficulty,
            today,
            dueDate,
            null,
            false,
            project.id // Asignar el ID del proyecto
        );


        try {
            await CreateTask(newTask);
            navigate('/tablero-proyecto'); // Redirigir al usuario a /tablero-proyecto después de crear la tarea
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            setError('Hubo un error al crear la tarea. Inténtelo nuevamente.');
        }
    };

    if (!project || !project.id) {
        return <div>Error: El proyecto no está definido.</div>;
    }

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
                        placeholder="Título de la tarea"
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
                        placeholder="Descripción de la tarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">
                        Dificultad
                    </label>
                    <div className="flex justify-between">
                        <label className="text-white">
                            <input
                                type="radio"
                                name="difficulty"
                                value="Fácil"
                                checked={difficulty === 'Fácil'}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="mr-2"
                            />
                            Fácil
                        </label>
                        <label className="text-white">
                            <input
                                type="radio"
                                name="difficulty"
                                value="Medio"
                                checked={difficulty === 'Medio'}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="mr-2"
                            />
                            Medio
                        </label>
                        <label className="text-white">
                            <input
                                type="radio"
                                name="difficulty"
                                value="Difícil"
                                checked={difficulty === 'Difícil'}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="mr-2"
                            />
                            Difícil
                        </label>
                        <label className="text-white">
                            <input
                                type="radio"
                                name="difficulty"
                                value="Muy Difícil"
                                checked={difficulty === 'Muy Difícil'}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="mr-2"
                            />
                            Muy Difícil
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="dueDate">
                        Fecha de Vencimiento
                    </label>
                    <Input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        min={getTodayDate()} // Deshabilita fechas anteriores a hoy
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="member">
                        Asignar a Miembro
                    </label>
                    <select
                        id="member"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Seleccionar miembro</option>
                        {members.map((member) => (
                            <option key={member.cedula} value={member.cedula}>
                                {member.nombre} {member.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Crear Tarea
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AsignarTarea;
