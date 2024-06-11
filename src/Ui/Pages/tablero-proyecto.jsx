import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componentes/Navbar.jsx';
import LabelTitulo from '../Componentes/LabelTitulo.jsx';
import Label from '../Componentes/Label.jsx';
import { useProject } from '../ProyectContext.jsx';
import Spam from '../Componentes/Spam.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PersonasPopup from '../Componentes/PersonaPopUp.jsx';
import { CreateMiembros, GetMiembrosByField, UpdateProject } from '../../Logica/ProyectoServices.js';
import { GetTasksByField } from '../../Logica/TareaServices.js';
import TarjetaAdmin from '../Componentes/tarjeta-admin.jsx';

const Tableroproyecto = () => {
    const { project, setProject } = useProject();
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [miembros, setMiembros] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isProjectFinalized, setIsProjectFinalized] = useState(project.entregado);

    useEffect(() => {
        const fetchMiembros = async () => {
            try {
                const miembrosData = await GetMiembrosByField('idProyecto', project.id);
                if (miembrosData) {
                    setMiembros(miembrosData);
                }
            } catch (error) {
                console.error('Error al obtener miembros:', error);
            }
        };

        fetchMiembros();
    }, [project.id]);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const tareasData = await GetTasksByField('idProyecto', project.id);
                if (tareasData) {
                    setTareas(tareasData);
                }
            } catch (error) {
                console.error('Error al obtener tareas:', error);
            }
        };

        fetchTareas();
    }, [project.id]);

    const handleAddMember = async (persona) => {
        console.log('Intentando agregar persona:', persona);

        try {
            const miembro = {
                cedula: persona.cedula,
                idProyecto: project.id
            };

            await CreateMiembros(miembro);
            console.log('Miembro almacenado correctamente.');
            setMiembros([...miembros, persona]);
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error al agregar miembro:', error);
        }
    };

    const handleTaskSaved = () => {
        // Refetch tasks when a task is saved
        fetchTareas();
    };

    const fetchTareas = async () => {
        try {
            const tareasData = await GetTasksByField('idProyecto', project.id);
            if (tareasData) {
                setTareas(tareasData);
            }
        } catch (error) {
            console.error('Error al obtener tareas:', error);
        }
    };

    const handleFinalizeProject = async () => {
        // Logic to finalize the project
        console.log('Proyecto finalizado');

        // Obtener la fecha actual en formato YYYY-MM-DD
        const fechaEntrega = new Date().toISOString().split('T')[0];

        const updatedProject = {
            ...project,
            fechaEntrega: fechaEntrega, // Guardar solo la fecha sin la parte de la hora
            entregado: true
        };

        try {
            await UpdateProject(project.id, updatedProject);
            setProject(updatedProject);
            setIsProjectFinalized(true);
            console.log('Proyecto actualizado:', updatedProject);
        } catch (error) {
            console.error('Error al finalizar proyecto:', error);
        }
    };


    const filteredTareas = tareas.filter((tarea) =>
        tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const estadoProyecto = project.entregado ? "Completado" : "En proceso";
    const fechaEntrega = project.entregado ? `Fecha de entrega: ${project.fechaEntrega}` : '';

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center">
            <div className="mt-4 w-full">
                <Navbar />
            </div>
            <div className='flex w-[80%] pt-8 h-[100%] justify-center items-center'>
                <div className='flex flex-col bg-gray-700 w-[75%] h-[760px] py-7 px-5 rounded-l-lg gap-3'>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                className={`mt-2 flex items-center px-4 py-2 rounded-md focus:outline-none ${isProjectFinalized ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700'
                                    }`}
                                onClick={() => !isProjectFinalized && navigate('/asignarTarea')}
                                disabled={isProjectFinalized}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Agregar tarea
                            </button>
                            <input
                                type="text"
                                placeholder="Buscar tareas..."
                                className="mt-2 ml-4 p-2 rounded-md bg-gray-600 text-white focus:outline-none focus:bg-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleFinalizeProject}
                            className="mt-2 flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                            disabled={isProjectFinalized}
                        >
                            Finalizar Proyecto
                        </button>
                    </div>
                    <div className='mt-4 flex flex-wrap gap-3 overflow-y-auto' style={{ maxHeight: '600px' }}>
                        {filteredTareas.length > 0 ? (
                            filteredTareas.map((tarea, index) => (
                                <TarjetaAdmin
                                    key={index}
                                    id={tarea.id}
                                    initialTitulo={tarea.titulo}
                                    initialDescripcion={tarea.description}
                                    initialDificultad={tarea.dificultad}
                                    initialFechaCreacion={tarea.fechaCreacion}
                                    initialFechaEntrega={tarea.fechaEntrega}
                                    initialFechaEnvio={tarea.fechaEnvio}
                                    initialEntregado={tarea.entregado}
                                    onDelete={fetchTareas} // Refresh tasks when a task is deleted
                                    onSave={handleTaskSaved} // Refresh tasks when a task is saved
                                />
                            ))
                        ) : (
                            <p className='text-white'>No hay tareas asignadas.</p>
                        )}
                    </div>
                </div>
                <div className='flex bg-gray-900 w-[25%] h-[760px] p-7 rounded-r-lg flex-col'>
                    <LabelTitulo>{project.titulo}</LabelTitulo>
                    <Label>{project.description}</Label>
                    <Label><Spam>{estadoProyecto}</Spam></Label>
                    <Label>{fechaEntrega}</Label>
                    <Label><Spam>Fecha de creación:</Spam> {project.fechaCreacion}</Label>
                    <div className='flex'>
                        <select className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" disabled={isProjectFinalized}>
                            <option value="" disabled selected>Miembros</option>
                            {miembros.map((miembro, index) => (
                                <option key={index} value={miembro.cedula}>{miembro.nombre}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className={`mt-1 ml-2 flex items-center px-4 py-2 rounded-md focus:outline-none ${isProjectFinalized ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 focus:bg-purple-700'
                                }`}
                            disabled={isProjectFinalized}
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            {isPopupOpen && <PersonasPopup onClose={() => setIsPopupOpen(false)} onAdd={handleAddMember} />}
        </div>
    );
};

export default Tableroproyecto;
