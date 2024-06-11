import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/Navbar.jsx';
import TarjetaPersonal from '../Componentes/tarjeta-Personal.jsx'; // Asegúrate de importar correctamente
import Input from '../Componentes/Input.jsx';
import { GetTasksByField } from '../../Logica/TareaServices.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../UserContext.jsx';

const TableroPersonal = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { user } = useUser(); // Obtener el usuario del contexto

    const fetchTasks = async () => {
        try {
            const tasks = await GetTasksByField('cedula', user.cedula);
            setTasks(tasks);
            setFilteredTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        const filtered = tasks.filter(task =>
            task.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [searchTerm, tasks]);

    const handleAddTask = () => {
        navigate('/crear-tarea');
    };

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="w-[80%] mt-4">
                <div className="w-1/2 mx-auto mb-4">
                    <Input
                        type="text"
                        placeholder="Buscar por título"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredTasks.map(task => (
                            <div key={task.id || task.tempId} className="p-4">
                                <TarjetaPersonal
                                    id={task.id}
                                    initialTitulo={task.titulo}
                                    initialDescripcion={task.description}
                                    initialDificultad={task.dificultad}
                                    initialFechaCreacion={task.fechaCreacion}
                                    initialFechaEntrega={task.fechaEntrega}
                                    initialFechaEnvio={task.fechaEnvio}
                                    initialEntregado={task.entregado}
                                    imgSrc={task.imgSrc}
                                    idProyecto={task.idProyecto} // Pasando idProyecto
                                    onDelete={fetchTasks} // Pasando la función fetchTasks al componente TarjetaPersonal
                                    onSave={fetchTasks} // Pasando la función fetchTasks al componente TarjetaPersonal
                                    onCancel={fetchTasks} // Pasando la función fetchTasks al componente TarjetaPersonal
                                />
                            </div>
                        ))}
                        <div className="m-4 flex justify-center items-center p-4 border-2 border-dashed rounded-xl border-indigo-700">
                            <div className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%]">
                                <button
                                    onClick={handleAddTask}
                                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1 px-2 rounded-full flex items-center justify-center space-x-2"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Agregar tarea</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-[200px] mt-8 space-y-4 rounded-xl shadow-2xl bg-[#111827]">
                        <p className="text-white text-lg font-bold font-sans">No tiene ninguna tarea creada</p>
                        <button
                            onClick={handleAddTask}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Agregar tarea</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableroPersonal;
