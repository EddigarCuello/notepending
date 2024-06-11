import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext.jsx';
import { useProject } from '../ProyectContext.jsx';
import Navbar from '../Componentes/Navbar.jsx';
import Input from '../Componentes/Input.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import personalBackground from '../../assets/seleccionarProyectoCrear.jpg';
import { GetProjectByField, DeleteProject } from '../../Logica/ProyectoServices.js';

const SeleccionProyecto = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { setProject } = useProject();
    const [filter, setFilter] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedProjects = await GetProjectByField('cedula', user.cedula);
                if (fetchedProjects) {
                    setProjects(fetchedProjects);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [user.cedula]);

    const handleCreateProjectClick = () => {
        navigate('/crear-proyecto'); // Navegar a la página de creación de proyectos
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await DeleteProject(projectId);
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleProjectClick = (project) => {
        setProject(project);
        navigate('/tablero-proyecto');
    };

    const filteredProjects = projects.filter(project =>
        project.titulo && project.titulo.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center">
            <div className="mt-4 w-full">
                <Navbar />
            </div>
            <div className="flex-grow flex items-center justify-center w-full">
                <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-4/5 max-w-3xl flex justify-around h-[500px]">
                    <button
                        onClick={handleCreateProjectClick}
                        className="relative bg-cover bg-center border-2 border-gray-700 text-white p-4 rounded-lg w-1/2 mx-2 text-center flex flex-col items-center justify-center hover:border-purple-500 hover:text-purple-500 transition"
                        style={{ backgroundImage: `url(${personalBackground})` }}
                    >
                        <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)'
                            }}
                        ></div>
                        <FontAwesomeIcon icon={faPlus} size="2x" className="z-10 hover:text-purple-500 transition duration-25" />
                        <span className="mt-2 z-10 font-bold">Crear Proyecto</span>
                    </button>
                    <div className="relative bg-cover bg-left border-2 border-gray-700 text-white p-4 rounded-lg w-1/2 mx-2 text-center flex flex-col items-center justify-start hover:border-purple-500 hover:text-purple-500 transition">
                        <Input
                            type="text"
                            placeholder="Filtrar proyectos..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <div className="w-full flex flex-col items-center gap-4 mt-4 overflow-y-auto">
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 p-4 rounded-lg w-full text-center cursor-pointer hover:bg-gray-700 transition flex justify-between items-center"
                                    onClick={() => handleProjectClick(project)}
                                >
                                    <span>
                                        {project.titulo}
                                    </span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                                        className="ml-4 text-red-500 hover:text-red-700 transition"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeleccionProyecto;
